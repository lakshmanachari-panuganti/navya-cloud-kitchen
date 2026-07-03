"use strict";

/**
 * Server-side product catalogue — single source of truth for pricing.
 * NEVER trust client-supplied totals; always compute from this map.
 */
const PRODUCTS = {
  moringa_leaves_podi: { type: "podi", prices: { 100: 199, 250: 399, 500: 699 } },
  curry_leaves_podi: { type: "podi", prices: { 100: 199, 250: 399, 500: 699 } },
  flaxseed_garlic_podi: { type: "podi", prices: { 100: 129, 250: 259, 500: 449 } },
  kandi_podi: { type: "podi", prices: { 100: 129, 250: 259, 500: 449 } },
  vellulli_karampodi: { type: "podi", prices: { 100: 159, 250: 319, 500: 549 } },
  nuvvula_podi: { type: "podi", prices: { 100: 159, 250: 319, 500: 549 } },
  minapa_sunnundalu: { type: "sweet", price: 260 },
  nuvvula_undalu: { type: "sweet", price: 199 },
  bellam_palli_undalu: { type: "sweet", price: 120 },
};

/**
 * Compute line-item price in rupees.
 * @param {{ id: string, grams?: number, qty: number }} item
 * @returns {number} price in INR for that line
 */
function getLinePrice(item) {
  const product = PRODUCTS[item.id];
  if (!product) throw new Error(`Unknown product: ${item.id}`);

  if (product.type === "podi") {
    const unitPrice = product.prices[item.grams];
    if (!unitPrice) throw new Error(`Invalid grams ${item.grams} for ${item.id}`);
    return unitPrice * (item.qty || 1);
  }

  // sweet — flat price
  return product.price * (item.qty || 1);
}

/**
 * Compute total for a cart (array of items) in paise.
 * @param {Array} cart
 * @returns {number} total amount in paise
 */
function computeAmountPaise(cart) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error("Cart is empty");
  }
  let totalRupees = 0;
  for (const item of cart) {
    totalRupees += getLinePrice(item);
  }
  return totalRupees * 100; // convert to paise
}

module.exports = { PRODUCTS, getLinePrice, computeAmountPaise };
