# Navya Cloud Kitchen — Automated Audit Report

- **Generated:** 2026-07-05T11:48:53.696Z
- **Status:** PASS
- **Quality score:** 0 / 100
- **Total findings:** 274

## Severity breakdown

| Severity | Count |
| --- | ---: |
| critical | 0 |
| high | 66 |
| medium | 70 |
| low | 137 |
| info | 1 |

## Findings by category

| Category | Count |
| --- | ---: |
| security | 86 |
| seo | 79 |
| accessibility | 76 |
| performance | 16 |
| link-integrity | 12 |
| content | 3 |
| functional | 1 |
| network | 1 |

## Findings by page

| Page | Count |
| --- | ---: |
| home | 102 |
| policies | 23 |
| blog/karivepaku-podi-curry-leaves-powder | 14 |
| blog/kandi-podi-benefits-uses | 13 |
| blog/homemade-vs-store-bought-podi | 13 |
| products/karivepaku-podi | 12 |
| products/munagaku-podi | 12 |
| products/minapa-sunni-undalu | 12 |
| products/vellulli-karampodi | 12 |
| products/nuvvula-undalu | 12 |
| products/avise-ginjala-podi | 11 |
| products/bellam-palli-undalu | 11 |
| products/nuvvula-podi | 11 |
| products/kandi-podi | 10 |
| home:drawer | 1 |

## Detailed findings

### [HIGH] [a11y color-contrast] (cart drawer) Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home:drawer  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="moringa_leaves_podi"] > .pcard-heading > .pcard-sub | article[data-product-id="moringa_leaves_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[`
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="vellulli_karampodi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .is-selected.pcard-size[data-idx="1"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4.28 (foreground color: #5a7756, background color: #e8f0e6, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `p:nth-child(11)`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.38 (foreground color: #b0a08a, background color: #faf7f2, font size: 10.2pt (13.6px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="minapa_sunnundalu"] > .pcard-allergens[aria-label="Allergen information"] > strong`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.73 (foreground color: #c4652a, background color: #fbf6f2, font size: 8.6pt (11.52px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="moringa_leaves_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="2"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `#shipping > .policies-updated`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.38 (foreground color: #b0a08a, background color: #faf7f2, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="curry_leaves_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="2"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="kandi_podi"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="curry_leaves_podi"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="minapa_sunnundalu"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="nuvvula_podi"] > .pcard-allergens[aria-label="Allergen information"] > strong`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.73 (foreground color: #c4652a, background color: #fbf6f2, font size: 8.6pt (11.52px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.footer-links:nth-child(2) > h4`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.13 (foreground color: #635f5d, background color: #0f0906, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="kandi_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="2"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="moringa_leaves_podi"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="nuvvula_undalu"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.footer-fssai`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.6 (foreground color: #575351, background color: #0f0906, font size: 8.2pt (10.88px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.footer-contact > h4`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.13 (foreground color: #635f5d, background color: #0f0906, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="vellulli_karampodi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="0"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `#privacy > .policies-updated`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.38 (foreground color: #b0a08a, background color: #faf7f2, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="curry_leaves_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="0"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="nuvvula_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .is-selected.pcard-size[data-idx="1"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4.28 (foreground color: #5a7756, background color: #e8f0e6, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="flaxseed_garlic_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="0"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="vellulli_karampodi"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `#refund > .policies-updated`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.38 (foreground color: #b0a08a, background color: #faf7f2, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `#return > .policies-updated`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.38 (foreground color: #b0a08a, background color: #faf7f2, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="kandi_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="0"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="nuvvula_podi"] > .pcard-allergens[aria-label="Allergen information"]`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.73 (foreground color: #c4652a, background color: #fbf6f2, font size: 8.6pt (11.52px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="bellam_palli_undalu"] > .pcard-allergens[aria-label="Allergen information"]`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.73 (foreground color: #c4652a, background color: #fbf6f2, font size: 8.6pt (11.52px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="bellam_palli_undalu"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="kandi_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .is-selected.pcard-size[data-idx="1"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4.28 (foreground color: #5a7756, background color: #e8f0e6, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `#terms > .policies-updated`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.38 (foreground color: #b0a08a, background color: #faf7f2, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="minapa_sunnundalu"] > .pcard-allergens[aria-label="Allergen information"]`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.73 (foreground color: #c4652a, background color: #fbf6f2, font size: 8.6pt (11.52px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.footer-links:nth-child(3) > h4`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.13 (foreground color: #635f5d, background color: #0f0906, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="moringa_leaves_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .is-selected.pcard-size[data-idx="1"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4.28 (foreground color: #5a7756, background color: #e8f0e6, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="vellulli_karampodi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="2"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="flaxseed_garlic_podi"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="nuvvula_undalu"] > .pcard-allergens[aria-label="Allergen information"] > strong`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.73 (foreground color: #c4652a, background color: #fbf6f2, font size: 8.6pt (11.52px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="flaxseed_garlic_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .is-selected.pcard-size[data-idx="1"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4.28 (foreground color: #5a7756, background color: #e8f0e6, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.footer-bottom > span:nth-child(1)`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.6 (foreground color: #575351, background color: #0f0906, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="nuvvula_undalu"] > .pcard-allergens[aria-label="Allergen information"]`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.73 (foreground color: #c4652a, background color: #fbf6f2, font size: 8.6pt (11.52px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="bellam_palli_undalu"] > .pcard-allergens[aria-label="Allergen information"] > strong`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 3.73 (foreground color: #c4652a, background color: #fbf6f2, font size: 8.6pt (11.52px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="nuvvula_podi"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="flaxseed_garlic_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="2"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="podi_starter_box"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="nuvvula_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="2"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="nuvvula_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="0"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="moringa_leaves_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .pcard-size[data-idx="0"][type="button"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 2.54 (foreground color: #b0a08a, background color: #ffffff, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="festival_sweet_box"] > .pcard-heading > .pcard-sub`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4 (foreground color: #c4652a, background color: #ffffff, font size: 8.4pt (11.2px), font weight: bold). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] [a11y color-contrast] Elements must meet minimum color contrast ratio thresholds

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article[data-product-id="curry_leaves_podi"] > .pcard-sizes[role="group"][aria-label="Choose pack size"] > .is-selected.pcard-size[data-idx="1"] > .pcard-size-unit`

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
- **Actual:** Fix any of the following:
  Element has insufficient color contrast of 4.28 (foreground color: #5a7756, background color: #e8f0e6, font size: 7.8pt (10.4px), font weight: normal). Expected contrast ratio of 4.5:1
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright

---

### [HIGH] Google Analytics placeholder measurement ID

**Category:** content  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** G-XXXXXXXXXX

---

### [HIGH] Request failed: net::ERR_ABORTED

**Category:** network  
**Page:** home  
**URL:** https://www.google-analytics.com/g/collect?v=2&tid=G-XXXXXXXXXX&gtm=45je66u1za200&_p=1783251990003&gcd=13l3l3l3l1l1&npa=0&dma=0&are=1&cid=1378042466.1783251991&frm=0&pscdl=noapi&rcb=18&sr=1440x900&uaa=x86&uab=64&uafvl=HeadlessChrome%3B149.0.7827.55%7CChromium%3B149.0.7827.55%7CNot)A%253BBrand%3B24.0.0.0&uam=&uamb=0&uap=Windows&uapv=10.0&uaw=0&ul=en-in&_s=1&tag_exp=115938466~115938468~119027224~119381663~119576881~119576885~119576891~119576895&sid=1783251991&sct=1&seg=0&dl=http%3A%2F%2Flocalhost%2Findex.html&dt=Navya%20Cloud%20Kitchen%20%E2%80%94%20Homemade%20Andhra%20Podulu%20%26%20Sweets%2C%20Hyderabad&en=page_view&_fv=1&_nsi=1&_ss=1&_ee=1&tfd=1534  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** POST ERR fetch

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** products/kandi-podi  
**URL:** /products/kandi-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Missing response header: content-security-policy

**Category:** security  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No CSP declared — script/style injection risk is unmitigated.

---

### [HIGH] Google Analytics measurement ID is a placeholder (G-XXXXXXXXXX)

**Category:** seo  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Remediation:** Replace the placeholder with the real GA4 measurement ID before launch.

---

### [MEDIUM] [a11y heading-order] Heading levels should only increase by one

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.footer-links:nth-child(2) > h4`

> Ensure the order of headings is semantically correct
- **Actual:** Fix any of the following:
  Heading order invalid
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/heading-order?application=playwright

---

### [MEDIUM] [a11y heading-order] Heading levels should only increase by one

**Category:** accessibility  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.business-details > h3`

> Ensure the order of headings is semantically correct
- **Actual:** Fix any of the following:
  Heading order invalid
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/heading-order?application=playwright

---

### [MEDIUM] [a11y landmark-one-main] Document should have one main landmark

**Category:** accessibility  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `html`

> Ensure the document has a main landmark
- **Actual:** Fix all of the following:
  Document does not have a main landmark
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/landmark-one-main?application=playwright

---

### [MEDIUM] [a11y landmark-one-main] Document should have one main landmark

**Category:** accessibility  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `html`

> Ensure the document has a main landmark
- **Actual:** Fix all of the following:
  Document does not have a main landmark
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/landmark-one-main?application=playwright

---

### [MEDIUM] [a11y landmark-one-main] Document should have one main landmark

**Category:** accessibility  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `html`

> Ensure the document has a main landmark
- **Actual:** Fix all of the following:
  Document does not have a main landmark
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/landmark-one-main?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `#reviews`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.step-card.scroll-reveal:nth-child(3)`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.form-row-2`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.bill-box`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `#story`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.step-card.scroll-reveal:nth-child(1)`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.form-group:nth-child(3)`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.drawer-title`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `#checkoutForm > .form-group:nth-child(1)`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.form-section-title`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.marquee-strip`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.timing-banner`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `#howItWorks > .section-container > .section-header.scroll-reveal`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.pay-note`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.final-cta-desc`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `article`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.final-cta-heading`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] [a11y region] All page content should be contained by landmarks

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium  
**Selector:** `.step-card.scroll-reveal:nth-child(5)`

> Ensure all page content is contained by landmarks
- **Actual:** Fix any of the following:
  Some page content is not contained by landmarks
- **Remediation:** https://dequeuniversity.com/rules/axe/4.12/region?application=playwright

---

### [MEDIUM] Heading level skipped: h1 → h3

**Category:** accessibility  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [MEDIUM] Heading level skipped: h2 → h4

**Category:** accessibility  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [MEDIUM] Cart did not reset after successful order close

**Category:** functional  
**Page:** home  
**Device:** chromium-desktop  
**Browser:** chromium

- **Expected:** 0
- **Actual:** 1

---

### [MEDIUM] Fragment link "#account" points to nonexistent id

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** text="Sign In / My Account"

---

### [MEDIUM] Fragment link "#account" points to nonexistent id

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** text="Sign In"

---

### [MEDIUM] Fragment link "#contact" points to nonexistent id

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** text="Contact Us"

---

### [MEDIUM] Fragment link "#contact" points to nonexistent id

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** text="Contact Us"

---

### [MEDIUM] Fragment link "#facebook" points to nonexistent id

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** text=""

---

### [MEDIUM] Fragment link "#faqs" points to nonexistent id

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** text="FAQs"

---

### [MEDIUM] Fragment link "#location" points to nonexistent id

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** text="Location"

---

### [MEDIUM] Fragment link "#track" points to nonexistent id

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** text="Track Order"

---

### [MEDIUM] Oversized image: 2079 KB (limit 781.25 KB)

**Category:** performance  
**Page:** home  
**URL:** http://localhost:8123/images/hero_bg.png  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [MEDIUM] Oversized script: 403 KB (limit 195.3125 KB)

**Category:** performance  
**Page:** home  
**URL:** https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-content-type-options

**Category:** security  
**Page:** products/kandi-podi  
**URL:** /products/kandi-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Content-Type-Options: nosniff.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** products/kandi-podi  
**URL:** /products/kandi-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] Missing response header: x-frame-options

**Category:** security  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium

> Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.

---

### [MEDIUM] staticwebapp.config.json globalHeaders missing content-security-policy

**Category:** security  
**Device:** chromium-desktop  
**Browser:** chromium
- **Remediation:** Add "content-security-policy" to globalHeaders for production hardening.

---

### [MEDIUM] staticwebapp.config.json globalHeaders missing strict-transport-security

**Category:** security  
**Device:** chromium-desktop  
**Browser:** chromium
- **Remediation:** Add "strict-transport-security" to globalHeaders for production hardening.

---

### [MEDIUM] Missing <link rel="canonical">

**Category:** seo  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [MEDIUM] Missing <link rel="canonical">

**Category:** seo  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] License marked "Applied for" in customer-visible copy

**Category:** content  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Applied for

---

### [LOW] The word "placeholder" appears in visible copy

**Category:** content  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** placeholder

---

### [LOW] Anchor with empty/hash-only href: "#"

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Home

---

### [LOW] Anchor with empty/hash-only href: "#"

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Navya Cloud Kitchen
                    Fresh, healthy & Traditional

---

### [LOW] Anchor with empty/hash-only href: "#"

**Category:** link-integrity  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Cart
                0

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/palli_undalu.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/vellulli_karampodi.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/flaxseed_garlic_podi.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/moringa_podi.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/nuvvula_podi.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/sunni_undalu.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/nuvvula_undalu.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/curry_leaves_podi.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/kandi_podi.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/curry_leaves_podi.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 1024px wide but rendered at 294px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/sunni_undalu.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 512px wide but rendered at 32px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/logo.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 512px wide but rendered at 40px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/logo.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Image 512px wide but rendered at 42px

**Category:** performance  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** http://localhost:8123/images/logo.webp
- **Remediation:** Serve smaller variants via <picture> or srcset for the actual displayed size.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** products/kandi-podi  
**URL:** /products/kandi-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: permissions-policy

**Category:** security  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Permissions-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** products/kandi-podi  
**URL:** /products/kandi-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: referrer-policy

**Category:** security  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No Referrer-Policy declared.

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** products/kandi-podi  
**URL:** /products/kandi-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] Missing response header: strict-transport-security

**Category:** security  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

> No HSTS. (In dev http-server this is expected; production must set it.)

---

### [LOW] <title> is 67 characters (recommended ≤65)

**Category:** seo  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Karivepaku Podi (Curry Leaves Powder): The Andhra Kitchen Essential

---

### [LOW] <title> is 67 characters (recommended ≤65)

**Category:** seo  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Buy Nuvvula Podi Online — Homemade, Hyderabad | Navya Cloud Kitchen

---

### [LOW] <title> is 68 characters (recommended ≤65)

**Category:** seo  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Buy Munagaku Podi Online — Homemade, Hyderabad | Navya Cloud Kitchen

---

### [LOW] <title> is 69 characters (recommended ≤65)

**Category:** seo  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Buy Nuvvula Undalu Online — Homemade, Hyderabad | Navya Cloud Kitchen

---

### [LOW] <title> is 70 characters (recommended ≤65)

**Category:** seo  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Buy Karivepaku Podi Online — Homemade, Hyderabad | Navya Cloud Kitchen

---

### [LOW] <title> is 71 characters (recommended ≤65)

**Category:** seo  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Kandi Podi: Health Benefits, Traditional Recipe & Best Ways to Enjoy It

---

### [LOW] <title> is 73 characters (recommended ≤65)

**Category:** seo  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Buy Vellulli Karampodi Online — Homemade, Hyderabad | Navya Cloud Kitchen

---

### [LOW] <title> is 73 characters (recommended ≤65)

**Category:** seo  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Buy Avise Ginjala Podi Online — Homemade, Hyderabad | Navya Cloud Kitchen

---

### [LOW] <title> is 74 characters (recommended ≤65)

**Category:** seo  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Buy Bellam Palli Undalu Online — Homemade, Hyderabad | Navya Cloud Kitchen

---

### [LOW] <title> is 74 characters (recommended ≤65)

**Category:** seo  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Buy Minapa Sunni Undalu Online — Homemade, Hyderabad | Navya Cloud Kitchen

---

### [LOW] Meta description length 163 outside recommended 50–160

**Category:** seo  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Order Nuvvula Undalu (Sesame Jaggery Laddoos) online. Roasted sesame seeds bound with cardamom-infused jaggery syrup. Homemade in Hyderabad by Navya Cloud Kitchen.

---

### [LOW] Meta description length 163 outside recommended 50–160

**Category:** seo  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Order Vellulli Karampodi (Spicy Garlic Powder) online. Fiery red chilies ground with whole roasted garlic & tamarind. Homemade in Hyderabad by Navya Cloud Kitchen.

---

### [LOW] Meta description length 164 outside recommended 50–160

**Category:** seo  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Order Minapa Sunni Undalu (Urad Dal Laddoos) online. Slow-roasted urad dal rolled with pure cow ghee & bellam jaggery. Homemade in Hyderabad by Navya Cloud Kitchen.

---

### [LOW] Meta description length 164 outside recommended 50–160

**Category:** seo  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Order Munagaku Podi (Moringa Leaves Powder) online. Drumstick leaves slow-roasted with urad dal, red chilies & garlic. Homemade in Hyderabad by Navya Cloud Kitchen.

---

### [LOW] Meta description length 165 outside recommended 50–160

**Category:** seo  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Order Karivepaku Podi (Curry Leaves Powder) online. Fresh curry leaves hand-roasted with coriander seeds & dry chilies. Homemade in Hyderabad by Navya Cloud Kitchen.

---

### [LOW] Meta description length 166 outside recommended 50–160

**Category:** seo  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Traditional Andhra podulu & sweets, cooked fresh the night you order in Kukatpally, Hyderabad. Zero preservatives, made to order. Next-day delivery via Rapido/Porter.

---

### [LOW] Meta description length 173 outside recommended 50–160

**Category:** seo  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** A detailed comparison of homemade vs store-bought podi powders — freshness, preservatives, taste, and shelf life. Learn how to tell quality podi and why small-batch matters.

---

### [LOW] Meta description length 176 outside recommended 50–160

**Category:** seo  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** Learn why Karivepaku Podi (curry leaves powder) is an essential part of Andhra cuisine, its nutritional benefits, traditional preparation method, and how to pair it with meals.

---

### [LOW] Missing og:description meta tag

**Category:** seo  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing og:image meta tag

**Category:** seo  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing og:image meta tag

**Category:** seo  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing og:image meta tag

**Category:** seo  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing og:image meta tag

**Category:** seo  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing og:title meta tag

**Category:** seo  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing og:type meta tag

**Category:** seo  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing og:url meta tag

**Category:** seo  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:card meta tag

**Category:** seo  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:card meta tag

**Category:** seo  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:card meta tag

**Category:** seo  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:card meta tag

**Category:** seo  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:card meta tag

**Category:** seo  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:card meta tag

**Category:** seo  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:card meta tag

**Category:** seo  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:card meta tag

**Category:** seo  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:card meta tag

**Category:** seo  
**Page:** products/kandi-podi  
**URL:** /products/kandi-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:card meta tag

**Category:** seo  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** products/kandi-podi  
**URL:** /products/kandi-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:image meta tag

**Category:** seo  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** policies  
**URL:** /policies.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** products/kandi-podi  
**URL:** /products/kandi-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] Missing twitter:title meta tag

**Category:** seo  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** blog/homemade-vs-store-bought-podi  
**URL:** /blog/homemade-vs-store-bought-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** products/vellulli-karampodi  
**URL:** /products/vellulli-karampodi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** products/nuvvula-podi  
**URL:** /products/nuvvula-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** products/karivepaku-podi  
**URL:** /products/karivepaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** products/avise-ginjala-podi  
**URL:** /products/avise-ginjala-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** products/kandi-podi  
**URL:** /products/kandi-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** blog/kandi-podi-benefits-uses  
**URL:** /blog/kandi-podi-benefits-uses.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** products/munagaku-podi  
**URL:** /products/munagaku-podi.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** home  
**URL:** /index.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** blog/karivepaku-podi-curry-leaves-powder  
**URL:** /blog/karivepaku-podi-curry-leaves-powder.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** products/minapa-sunni-undalu  
**URL:** /products/minapa-sunni-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** products/bellam-palli-undalu  
**URL:** /products/bellam-palli-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] No <link rel="icon"> declared

**Category:** seo  
**Page:** products/nuvvula-undalu  
**URL:** /products/nuvvula-undalu.html  
**Device:** chromium-desktop  
**Browser:** chromium

---

### [LOW] sitemap.xml missing 13 known route(s)

**Category:** seo  
**Device:** chromium-desktop  
**Browser:** chromium
- **Actual:** /index.html, /products/avise-ginjala-podi.html, /products/bellam-palli-undalu.html, /products/kandi-podi.html, /products/karivepaku-podi.html, /products/minapa-sunni-undalu.html, /products/munagaku-podi.html, /products/nuvvula-podi.html, /products/nuvvula-undalu.html, /products/vellulli-karampodi.html, /blog/homemade-vs-store-bought-podi.html, /blog/kandi-podi-benefits-uses.html, /blog/karivepaku-podi-curry-leaves-powder.html

---

### [INFO] Found 2 distinct external link target(s)

**Category:** link-integrity  
**Device:** chromium-desktop  
**Browser:** chromium

---
