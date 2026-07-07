# Navya Cloud Kitchen — Audit Baseline

**Date:** 2026-07-04
**Branch:** `ai-driven1` (off `develop`)

---

## Stack Recon

| Aspect | Finding |
|--------|---------|
| Framework | Vanilla HTML/CSS/JS (no React/Next.js) |
| Entry point | `index.html` (single-page) |
| Styles | `style.css` (custom properties / design tokens in `:root`) |
| App logic | `app.js` (menu rendering, cart, checkout) |
| Config | `config.js` (WhatsApp number, courier note, image paths) |
| Fonts | Playfair Display + DM Sans (Google Fonts, preconnected) |
| Images | Real product photos in `images/` (webp + png fallbacks) |
| API | Azure Functions in `api/` (create-order, verify-payment) — currently wired to **Razorpay** |
| Hosting | Azure Static Web Apps |
| Package deps | `sharp` only (image conversion utility) |
| Build scripts | **None** (no build, lint, or test scripts) |
| Products | `MENU_ITEMS` array in `app.js` — 9 items (6 podulu + 3 sweets), client-rendered |
| Checkout | WhatsApp-first (sends pre-filled message); Razorpay gateway code exists but not active in UI |

---

## Confirmed Audit Findings

| Finding | Status | Detail |
|---------|--------|--------|
| Viewport blocks pinch-zoom | **CONFIRMED** | `maximum-scale=1.0, user-scalable=no` in index.html |
| Theme-color mismatch | **CONFIRMED** | `#1a0a00` — very dark, not matching brand green/terracotta |
| Testimonials are hard-coded | **CONFIRMED** | 3 reviews in index.html with initial-avatar divs (P, R, S) |
| Products are client-only rendered | **CONFIRMED** | JS renders all menu cards; no SSR/SSG; not crawlable |
| Product images are real photos | **CONFIRMED** | webp/png files for all 9 products in `images/` |
| "500+ Happy Families" unverifiable | **CONFIRMED** | Static text in story section — no data source |
| "9 Handcrafted Items" stat | **CONFIRMED** | Matches actual MENU_ITEMS count (9) |
| Marquee item count | **NOTE** | 8 items in marquee (missing Avise Ginjala Podi / Flaxseed Garlic) |
| No OpenGraph meta | **CONFIRMED** | No og:title, og:image, og:description in head |
| No structured data (JSON-LD) | **CONFIRMED** | No schema.org markup anywhere |
| No GA4 / analytics | **CONFIRMED** | No gtag.js or analytics script |
| No sitemap.xml | **CONFIRMED** | Not present |
| No robots.txt | **CONFIRMED** | Not present |

---

## Lighthouse Baseline

> **TODO:** Run PageSpeed Insights on https://www.navyacloudkitchen.com and paste scores here.

| Metric | Score |
|--------|-------|
| Performance | — |
| SEO | — |
| Accessibility | — |
| Best Practices | — |
| LCP | — |
| CLS | — |
| TBT | — |

---

## KPI Snapshot

| KPI | Current | Source |
|-----|---------|--------|
| Orders/week | Unknown | No analytics installed |
| Conversion rate | Unknown | No analytics installed |
| Repeat rate | Unknown | No tracking |

> KPIs will be measurable once GA4 is installed (Phase 0) and begins collecting data.

---

## Product Catalogue (from `app.js`)

| # | ID | Name (Telugu) | English | Category | Sizes/Price |
|---|---|---|---|---|---|
| 1 | moringa_leaves_podi | Munagaku Podi | Moringa Leaves Powder | Everyday Podulu | 100g ₹199 / 250g ₹399 / 500g ₹699 |
| 2 | curry_leaves_podi | Karivepaku Podi | Curry Leaves Powder | Everyday Podulu | 100g ₹199 / 250g ₹399 / 500g ₹699 |
| 3 | flaxseed_garlic_podi | Avise Ginjala Podi | Flaxseed Garlic Powder | Everyday Podulu | 100g ₹129 / 250g ₹259 / 500g ₹449 |
| 4 | kandi_podi | Kandi Podi | Classic Lentil Powder | Traditional Comfort | 100g ₹129 / 250g ₹259 / 500g ₹449 |
| 5 | vellulli_karampodi | Vellulli Karampodi | Spicy Garlic Powder | Traditional Comfort | 100g ₹159 / 250g ₹319 / 500g ₹549 |
| 6 | nuvvula_podi | Nuvvula Podi | Sesame Seeds Powder | Traditional Comfort | 100g ₹159 / 250g ₹319 / 500g ₹549 |
| 7 | minapa_sunnundalu | Minapa Sunni Undalu | Urad Dal Laddoos | Sweets | ₹260 / Box of 6 |
| 8 | nuvvula_undalu | Nuvvula Undalu | Sesame Jaggery Laddoos | Sweets | ₹199 / Box of 10 |
| 9 | bellam_palli_undalu | Bellam Palli Undalu | Peanut Jaggery Bites | Sweets | ₹120 / 200g pack |
