"use strict";

const { TableClient } = require("@azure/data-tables");
const { verifyWebhook, getPaymentStatus } = require("../shared/paymentProvider");

const CONN_STR = process.env.AZURE_STORAGE_CONNECTION_STRING;
const TABLE_NAME = "Orders";

module.exports = async function (context, req) {
  if (!CONN_STR) {
    context.log.error("AZURE_STORAGE_CONNECTION_STRING is not configured");
    context.res = { status: 500, body: { error: "Server configuration error" } };
    return;
  }

  try {
    // GET = user redirect from PhonePe after payment (check status, redirect to frontend)
    if (req.method === "GET") {
      const merchantOrderId = req.query.merchantOrderId || req.query.orderId;
      if (!merchantOrderId) {
        context.res = { status: 302, headers: { Location: "/" } };
        return;
      }

      // Server-to-server verification
      const statusResult = await getPaymentStatus(merchantOrderId);
      const paid = statusResult.state === "COMPLETED";

      // Update table if needed
      await updateOrderStatus(context, merchantOrderId, statusResult);

      // Redirect user to frontend with status
      const redirect = paid
        ? `/?payment=success&order=${merchantOrderId}`
        : `/?payment=failed&order=${merchantOrderId}`;
      context.res = { status: 302, headers: { Location: redirect } };
      return;
    }

    // POST = PhonePe webhook callback
    const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    const signature = req.headers["x-phonepe-signature"];

    // Step 1: Verify webhook signature
    if (!signature || !verifyWebhook(rawBody, signature)) {
      context.log.warn("Webhook signature verification failed");
      context.res = { status: 401, body: { error: "Invalid signature" } };
      return;
    }

    // Parse payload
    const payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const merchantOrderId = payload.merchantOrderId || payload.data?.merchantOrderId;

    if (!merchantOrderId) {
      context.res = { status: 400, body: { error: "Missing merchantOrderId" } };
      return;
    }

    // Step 2: Server-to-server verification — never trust webhook/redirect alone
    const statusResult = await getPaymentStatus(merchantOrderId);

    // Step 3: Idempotent update in Azure Table
    await updateOrderStatus(context, merchantOrderId, statusResult);

    const newStatus = statusResult.state === "COMPLETED" ? "PAID" : "FAILED";
    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { status: newStatus, orderId: merchantOrderId },
    };
  } catch (err) {
    context.log.error("verify-payment error:", err);
    context.res = {
      status: 500,
      body: { error: "Payment verification failed" },
    };
  }
};

/**
 * Idempotent order status update in Azure Table Storage.
 */
async function updateOrderStatus(context, merchantOrderId, statusResult) {
  const newStatus = statusResult.state === "COMPLETED" ? "PAID" : "FAILED";
  const tableClient = TableClient.fromConnectionString(CONN_STR, TABLE_NAME);

  // Derive partition key from order ID timestamp
  const timestampStr = merchantOrderId.split("-")[1];
  const orderDate = new Date(parseInt(timestampStr, 10));
  const partitionKey = `${orderDate.getFullYear()}${String(orderDate.getMonth() + 1).padStart(2, "0")}`;

  let entity;
  try {
    entity = await tableClient.getEntity(partitionKey, merchantOrderId);
  } catch (err) {
    context.log.warn(`Order not found for status update: ${merchantOrderId}`);
    return;
  }

  // Idempotent: if already PAID, don't reprocess
  if (entity.status === "PAID") return;

  await tableClient.updateEntity(
    {
      partitionKey,
      rowKey: merchantOrderId,
      status: newStatus,
      paidAt: newStatus === "PAID" ? new Date().toISOString() : undefined,
      phonepeState: statusResult.state,
      phonepeTransactionId: statusResult.transactionId || "",
    },
    "Merge"
  );
}
