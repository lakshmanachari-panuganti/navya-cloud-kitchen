"use strict";

const crypto = require("crypto");

/**
 * PhonePe Standard Checkout payment provider.
 * Implements a swappable interface: createPayment, verifyWebhook, getPaymentStatus.
 *
 * Env vars required:
 *   PHONEPE_CLIENT_ID
 *   PHONEPE_CLIENT_SECRET
 *   PHONEPE_MERCHANT_ID
 *   PHONEPE_API_BASE (defaults to sandbox)
 */

const API_BASE =
  process.env.PHONEPE_API_BASE ||
  "https://api-preprod.phonepe.com/apis/pg-sandbox";

function getHeaders() {
  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("PhonePe credentials not configured");
  }
  return {
    "Content-Type": "application/json",
    "X-Client-Id": clientId,
    "X-Client-Secret": clientSecret,
  };
}

/**
 * Initiate a PhonePe Standard Checkout payment.
 * @param {{ merchantOrderId: string, amountPaise: number, redirectUrl: string, callbackUrl: string }} opts
 * @returns {Promise<{ redirectUrl: string, transactionId: string }>}
 */
async function createPayment({ merchantOrderId, amountPaise, redirectUrl, callbackUrl }) {
  const merchantId = process.env.PHONEPE_MERCHANT_ID;
  if (!merchantId) throw new Error("PHONEPE_MERCHANT_ID not configured");

  const payload = {
    merchantOrderId,
    amount: amountPaise,
    expireAfter: 1200, // 20 min
    metaInfo: {
      udf1: "navyas-kitchen",
    },
    paymentFlow: {
      type: "PG_CHECKOUT",
      message: "Payment for Navya's Kitchen order",
      merchantUrls: {
        redirectUrl,
        callbackUrl,
      },
    },
  };

  const url = `${API_BASE}/checkout/v2/pay/${merchantId}`;
  const res = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`PhonePe createPayment failed (${res.status}): ${errBody}`);
  }

  const data = await res.json();
  return {
    redirectUrl: data.redirectUrl || data.data?.redirectUrl,
    transactionId: data.orderId || data.data?.orderId || merchantOrderId,
  };
}

/**
 * Verify PhonePe webhook signature.
 * PhonePe sends X-Phonepe-Signature header = HMAC-SHA256(response_body, client_secret).
 * @param {string} rawBody — raw request body string
 * @param {string} signature — value from X-Phonepe-Signature header
 * @returns {boolean}
 */
function verifyWebhook(rawBody, signature) {
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  if (!clientSecret) throw new Error("PHONEPE_CLIENT_SECRET not configured");

  const expected = crypto
    .createHmac("sha256", clientSecret)
    .update(rawBody)
    .digest("base64");

  return crypto.timingSafeEqual(
    Buffer.from(expected, "utf8"),
    Buffer.from(signature || "", "utf8")
  );
}

/**
 * Server-to-server order status check with PhonePe.
 * @param {string} merchantOrderId
 * @returns {Promise<{ state: string, transactionId: string, amount: number }>}
 */
async function getPaymentStatus(merchantOrderId) {
  const merchantId = process.env.PHONEPE_MERCHANT_ID;
  if (!merchantId) throw new Error("PHONEPE_MERCHANT_ID not configured");

  const url = `${API_BASE}/checkout/v2/order/${merchantId}/${merchantOrderId}/status`;
  const res = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`PhonePe getPaymentStatus failed (${res.status}): ${errBody}`);
  }

  const data = await res.json();
  return {
    state: data.state || data.data?.state, // COMPLETED, FAILED, PENDING
    transactionId: data.orderId || data.data?.orderId,
    amount: data.amount || data.data?.amount,
  };
}

module.exports = { createPayment, verifyWebhook, getPaymentStatus };
