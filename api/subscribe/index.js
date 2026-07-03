"use strict";

const { TableClient } = require("@azure/data-tables");

const CONN_STR = process.env.AZURE_STORAGE_CONNECTION_STRING;
const TABLE_NAME = "Subscribers";

// E.164: + followed by 1-15 digits
const E164_REGEX = /^\+[1-9]\d{1,14}$/;

module.exports = async function (context, req) {
  try {
    const { name, whatsapp, consent } = req.body || {};

    if (!consent) {
      context.res = { status: 400, body: { error: "Consent is required" } };
      return;
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      context.res = { status: 400, body: { error: "Name is required" } };
      return;
    }

    if (!whatsapp || !E164_REGEX.test(whatsapp)) {
      context.res = {
        status: 400,
        body: { error: "Valid WhatsApp number in E.164 format required (e.g. +919876543210)" },
      };
      return;
    }

    const tableClient = TableClient.fromConnectionString(CONN_STR, TABLE_NAME);
    await tableClient.createTable().catch(() => {}); // ignore if exists

    // Upsert — idempotent, won't duplicate
    await tableClient.upsertEntity(
      {
        partitionKey: "wa",
        rowKey: whatsapp,
        name: name.trim(),
        subscribedAt: new Date().toISOString(),
      },
      "Merge"
    );

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: { success: true },
    };
  } catch (err) {
    context.log.error("subscribe error:", err);
    context.res = {
      status: 500,
      body: { error: "Subscription failed. Please try again." },
    };
  }
};
