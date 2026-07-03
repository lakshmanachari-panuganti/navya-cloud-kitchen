"use strict";

const { TableClient } = require("@azure/data-tables");
const { computeAmountPaise } = require("../shared/products");
const { createPayment } = require("../shared/paymentProvider");
const crypto = require("crypto");

const CONN_STR = process.env.AZURE_STORAGE_CONNECTION_STRING;
const TABLE_NAME = "Orders";

module.exports = async function (context, req) {
  try {
    const { cart, redirectUrl } = req.body || {};

    if (!Array.isArray(cart) || cart.length === 0) {
      context.res = { status: 400, body: { error: "Cart is empty" } };
      return;
    }

    // Server-side price computation — never trust client totals
    let amountPaise;
    try {
      amountPaise = computeAmountPaise(cart);
    } catch (err) {
      context.res = { status: 400, body: { error: err.message } };
      return;
    }

    // Generate unique order ID
    const merchantOrderId = `NK-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const now = new Date();
    const partitionKey = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;

    // Write order to Azure Table Storage
    const tableClient = TableClient.fromConnectionString(CONN_STR, TABLE_NAME);
    await tableClient.createTable().catch(() => {}); // ignore if exists

    await tableClient.createEntity({
      partitionKey,
      rowKey: merchantOrderId,
      amountPaise,
      cart: JSON.stringify(cart),
      status: "PENDING",
      createdAt: now.toISOString(),
    });

    // Build callback URL (same function app base)
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const callbackUrl = `${protocol}://${host}/api/verify-payment`;

    // Client redirect after payment (default to site root)
    const clientRedirect = redirectUrl || `${protocol}://${host}/`;

    // Initiate PhonePe payment
    const result = await createPayment({
      merchantOrderId,
      amountPaise,
      redirectUrl: clientRedirect,
      callbackUrl,
    });

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        orderId: merchantOrderId,
        amountPaise,
        redirectUrl: result.redirectUrl,
      },
    };
  } catch (err) {
    context.log.error("create-order error:", err);
    context.res = {
      status: 500,
      body: { error: "Failed to create order. Please try again." },
    };
  }
};
