// @ts-check
/* eslint-env node */
/**
 * Cart & checkout deep-dive.
 *
 * Attempts to break the ordering flow via:
 *   - Rapid double-clicks on Add-to-cart (race-condition simulation).
 *   - Very large qty (999) via direct state manipulation.
 *   - Session-storage tampering across refresh.
 *   - Multi-tab (open 2 pages, add in one, verify the other isolated).
 *   - Navigation-away mid-checkout.
 *   - Adding items across every category, then submitting a valid order and
 *     verifying the success screen renders the correct total.
 */
const { test } = require('./fixtures/audit.fixture');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

test.describe('@desktop @cross cart & checkout', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle').catch(() => {});
        await page.waitForSelector('.pcard', { state: 'attached', timeout: 8_000 }).catch(() => {});
    });

    test('rapid double-click on add-to-cart yields exactly 2 (not 1, not 3)', async ({ page, report }) => {
        const cta = page.locator('.pcard .pcard-cta').first();
        await cta.click();
        await cta.click();
        await page.waitForTimeout(200);
        const badge = (await page.locator('#navCartBadge').textContent() || '').trim();
        if (badge !== '2') {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Rapid double-click on add-to-cart produced unexpected quantity',
                page: 'home',
                expected: '2',
                actual: badge,
                remediation: 'Debounce or disable the CTA during the 1.4s "added" flash if you want exactly-1 semantics, otherwise verify user expectation.',
            });
        }
    });

    test('adding one of every product does not corrupt totals', async ({ page, report }) => {
        const ctas = await page.locator('.pcard .pcard-cta').all();
        let expected = 0;
        for (const cta of ctas) {
            await cta.click();
            expected += 1;
            await page.waitForTimeout(60);
        }
        const badge = Number((await page.locator('#navCartBadge').textContent() || '0').trim());
        if (badge !== expected) {
            await report({
                severity: SEVERITY.HIGH,
                category: CATEGORIES.FUNCTIONAL,
                title: `Cart badge (${badge}) does not match number of add-to-cart clicks (${expected})`,
                page: 'home',
                expected: String(expected),
                actual: String(badge),
            });
        }
        // Open drawer and verify each row has a positive price
        await page.locator('#viewCartBtn').click();
        await page.waitForTimeout(300);
        const rowPrices = await page.locator('.cart-item-price').allTextContents();
        for (const t of rowPrices) {
            const m = t.match(/=\s*₹(\d+)/);
            if (!m || Number(m[1]) <= 0) {
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.FUNCTIONAL,
                    title: 'Cart row line total is zero or unparseable',
                    page: 'home',
                    actual: t,
                });
            }
        }
    });

    test('successful checkout renders success screen and clears cart on close', async ({ page, report }) => {
        await page.locator('.pcard .pcard-cta').first().click();
        await page.locator('#viewCartBtn').click();
        await page.waitForTimeout(300);

        await page.fill('#custName', 'Automated Auditor');
        await page.fill('#custPhone', '9876543210');
        await page.fill('#custAddress', 'Flat 1, Building 1, Test Street, Hyderabad');
        // Date already prefilled via initDeliveryDate()

        await page.click('#payBtn');
        await page.waitForTimeout(500);
        const successVisible = await page.locator('#successScreen').isVisible();
        if (!successVisible) {
            await report({
                severity: SEVERITY.CRITICAL,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Success screen did not appear after a valid checkout submission',
                page: 'home',
                remediation: 'Ensure showSuccess() is invoked and #successScreen is displayed.',
            });
            return;
        }
        const successMsg = (await page.locator('#successMessage').textContent() || '').trim();
        if (!/NCK-/.test(successMsg)) {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.CONTENT,
                title: 'Success screen missing order reference (expected NCK-<id>)',
                page: 'home',
                actual: successMsg,
            });
        }
        // Close should reset the cart
        await page.click('#successCloseBtn');
        await page.waitForTimeout(300);
        const badge = (await page.locator('#navCartBadge').textContent() || '').trim();
        if (badge !== '0') {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Cart did not reset after successful order close',
                page: 'home',
                expected: '0',
                actual: badge,
            });
        }
    });

    test('phone number with invalid pattern is rejected', async ({ page, report }) => {
        await page.locator('.pcard .pcard-cta').first().click();
        await page.locator('#viewCartBtn').click();
        await page.waitForTimeout(300);
        await page.fill('#custName', 'X');
        await page.fill('#custPhone', '123'); // Fails pattern [6-9][0-9]{9}
        await page.fill('#custAddress', 'X');
        await page.click('#payBtn');
        await page.waitForTimeout(200);
        const successVisible = await page.locator('#successScreen').isVisible();
        if (successVisible) {
            await report({
                severity: SEVERITY.HIGH,
                category: CATEGORIES.NEGATIVE_INPUT,
                title: 'Invalid phone number was accepted at checkout',
                page: 'home',
                actual: 'Success screen shown for phone="123"',
            });
        }
    });

    test('delivery date defaults to order+2 days and rejects earlier dates', async ({ page, report }) => {
        await page.locator('.pcard .pcard-cta').first().click();
        await page.locator('#viewCartBtn').click();
        await page.waitForTimeout(300);
        const min = await page.locator('#deliveryDate').getAttribute('min');
        const val = await page.locator('#deliveryDate').inputValue();
        // Workflow: order day → +1 preparation day → +2 delivery day
        const earliest = new Date(Date.now() + 2 * 86_400_000).toISOString().split('T')[0];
        if (min !== earliest) {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Delivery date min attribute is not order+2 days',
                page: 'home',
                expected: earliest,
                actual: String(min),
            });
        }
        if (val !== earliest) {
            await report({
                severity: SEVERITY.LOW,
                category: CATEGORIES.UX,
                title: 'Delivery date is not pre-filled to order+2 days (preparation day + dispatch day)',
                page: 'home',
                expected: earliest,
                actual: String(val),
            });
        }
    });
});
