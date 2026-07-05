// @ts-check
/* eslint-env node */
/**
 * Functional / workflow audit.
 *
 * Rules of engagement (assume nothing works):
 *   - Every rendered menu card must have an image, a title, a description,
 *     at least one size or a single price, an "Add to cart" button.
 *   - Category pills must actually filter the menu.
 *   - Add-to-cart must update cart count, sticky bar, and drawer content.
 *   - Cart quantity buttons must add/remove correctly and never go negative.
 *   - Opening the drawer with an empty cart must NOT crash (the current code
 *     shows an empty-state — verify that empty state renders).
 *   - Mobile hamburger menu opens, traps focus, closes with Escape.
 *   - Sticky nav transitions state on scroll.
 *   - Product detail pages link back to the home menu.
 */
const { test, expect } = require('./fixtures/audit.fixture');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

test.describe('@cross functional — home page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle').catch(() => {});
        // Menu is rendered on requestAnimationFrame after DOMContentLoaded
        await page.waitForSelector('.pcard', { state: 'attached', timeout: 8_000 }).catch(() => {});
    });

    test('menu grid renders every advertised item', async ({ page, report, evidence }) => {
        const cards = await page.locator('.pcard').all();
        if (cards.length === 0) {
            const screenshot = await evidence(page, 'menu-empty');
            await report({
                severity: SEVERITY.CRITICAL,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Menu grid rendered zero product cards',
                page: 'home',
                url: '/index.html',
                remediation: 'Ensure MENU_ITEMS is populated and renderMenu() runs on DOMContentLoaded.',
                evidence: [screenshot],
            });
            return;
        }
        // Every card should have image, name, description, cart CTA
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const name = (await card.locator('.pcard-name').first().textContent() || '').trim();
            const hasImg = await card.locator('img.pcard-img').count();
            const hasDesc = (await card.locator('.pcard-desc').first().textContent() || '').trim();
            const hasCta = await card.locator('.pcard-cta').count();
            const missing = [];
            if (!name) missing.push('title');
            if (!hasImg) missing.push('image');
            if (!hasDesc) missing.push('description');
            if (!hasCta) missing.push('add-to-cart button');
            if (missing.length) {
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.FUNCTIONAL,
                    title: `Product card missing: ${missing.join(', ')}`,
                    page: 'home',
                    selector: `.pcard:nth-of-type(${i + 1})`,
                    actual: name || '(no name)',
                });
            }
        }
    });

    test('category pills actually filter the menu', async ({ page, report }) => {
        const pills = await page.locator('.cat-pill').all();
        if (pills.length < 2) {
            await report({
                severity: SEVERITY.HIGH,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Category pill bar rendered fewer than 2 pills',
                page: 'home',
            });
            return;
        }
        const totalWhenAll = await page.locator('.pcard').count();
        for (let i = 1; i < pills.length; i++) {
            const label = (await pills[i].textContent() || '').trim();
            await pills[i].click();
            await page.waitForTimeout(250);
            const cardsAfter = await page.locator('.pcard').count();
            if (cardsAfter === 0) {
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.FUNCTIONAL,
                    title: `Category "${label}" filters to zero items`,
                    page: 'home',
                    expected: '>= 1 item',
                    actual: '0',
                });
            }
            if (cardsAfter > totalWhenAll) {
                await report({
                    severity: SEVERITY.MEDIUM,
                    category: CATEGORIES.FUNCTIONAL,
                    title: `Category "${label}" shows more items than "All"`,
                    page: 'home',
                    expected: `<= ${totalWhenAll}`,
                    actual: String(cardsAfter),
                });
            }
        }
    });

    test('add-to-cart updates badge, sticky bar, and drawer', async ({ page, report, evidence }) => {
        const firstCta = page.locator('.pcard .pcard-cta').first();
        await firstCta.click();
        await page.waitForTimeout(150);

        const badgeText = (await page.locator('#navCartBadge').textContent() || '').trim();
        if (badgeText !== '1') {
            await report({
                severity: SEVERITY.HIGH,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Nav cart badge did not update to 1 after single add-to-cart',
                page: 'home',
                expected: '1',
                actual: badgeText,
                evidence: [await evidence(page, 'cart-badge-mismatch')],
            });
        }

        // Sticky bar should become visible
        const barVisible = await page.locator('#stickyCartBar').isVisible();
        if (!barVisible) {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Sticky cart bar did not become visible after add',
                page: 'home',
            });
        }

        // Opening drawer via View Cart should reveal the row we just added
        await page.locator('#viewCartBtn').click();
        await page.waitForTimeout(400);
        const rows = await page.locator('#cartItemsList .cart-item').count();
        if (rows !== 1) {
            await report({
                severity: SEVERITY.HIGH,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Cart drawer did not render the added item',
                page: 'home',
                expected: '1 row',
                actual: `${rows} rows`,
                evidence: [await evidence(page, 'drawer-empty-after-add')],
            });
        }
        await expect(page.locator('#billGrandTotal')).not.toHaveText('₹0');
    });

    test('quantity buttons remove item at 0 without going negative', async ({ page, report }) => {
        await page.locator('.pcard .pcard-cta').first().click();
        await page.locator('#viewCartBtn').click();
        await page.waitForTimeout(400);
        const minus = page.locator('.qty-btn').first();
        await minus.click();
        await page.waitForTimeout(200);
        const rows = await page.locator('#cartItemsList .cart-item').count();
        const qtyText = await page.locator('.qty-val').first().textContent().catch(() => null);
        if (rows !== 0) {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Cart row did not disappear after decrementing to 0',
                page: 'home',
                expected: '0 rows',
                actual: `${rows} rows (qty="${qtyText}")`,
            });
        }
    });

    test('opening drawer with an empty cart shows the empty state', async ({ page, report }) => {
        // sticky bar is hidden when empty; open drawer via nav cart btn instead
        await page.locator('#navCartBtn').click();
        await page.waitForTimeout(400);
        const emptyText = (await page.locator('#cartItemsList').textContent() || '').toLowerCase();
        if (!emptyText.includes('empty')) {
            await report({
                severity: SEVERITY.LOW,
                category: CATEGORIES.UX,
                title: 'Empty-cart state does not surface "empty" messaging',
                page: 'home',
                actual: emptyText.slice(0, 200),
            });
        }
    });

    test('checkout form refuses to submit when required fields are blank', async ({ page, report }) => {
        // Add an item so cart is populated
        await page.locator('.pcard .pcard-cta').first().click();
        await page.locator('#viewCartBtn').click();
        await page.waitForTimeout(400);
        // Attempt submit with empty fields
        const submitBtn = page.locator('#payBtn');
        await submitBtn.click();
        await page.waitForTimeout(300);
        // Success screen must NOT appear
        const successVisible = await page.locator('#successScreen').isVisible();
        if (successVisible) {
            await report({
                severity: SEVERITY.CRITICAL,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Checkout accepted a submission with empty required fields',
                page: 'home',
                remediation: 'Client-side validation is bypassable — form fields must enforce required.',
            });
        }
    });

    test('scroll changes navbar state to .scrolled', async ({ page, report }) => {
        const before = await page.locator('#topNav').getAttribute('class') || '';
        await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
        await page.waitForTimeout(400);
        const after = await page.locator('#topNav').getAttribute('class') || '';
        if (!after.includes('scrolled')) {
            await report({
                severity: SEVERITY.LOW,
                category: CATEGORIES.UX,
                title: 'Sticky nav did not gain the .scrolled class after scrolling 400px',
                page: 'home',
                expected: 'class contains "scrolled"',
                actual: after,
            });
        }
        void before;
    });
});

test.describe('@mobile mobile menu', () => {
    test('hamburger opens the slide-in menu and Escape closes it', async ({ page, report, evidence }) => {
        await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle').catch(() => {});
        const menuBtn = page.locator('#navMenuBtn');
        if (!(await menuBtn.isVisible())) {
            // Not really a mobile viewport — fixture picked desktop-only viewport size
            return;
        }
        await menuBtn.click();
        await page.waitForTimeout(400);
        const openClass = await page.locator('#mobileMenu').getAttribute('class') || '';
        if (!openClass.includes('is-open')) {
            await report({
                severity: SEVERITY.HIGH,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Mobile menu did not open when hamburger tapped',
                page: 'home',
                evidence: [await evidence(page, 'mobile-menu-not-open')],
            });
            return;
        }
        // ARIA state
        const expanded = await menuBtn.getAttribute('aria-expanded');
        if (expanded !== 'true') {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.ACCESSIBILITY,
                title: 'Hamburger did not set aria-expanded="true" when opened',
                page: 'home',
                selector: '#navMenuBtn',
                expected: 'true',
                actual: String(expanded),
            });
        }
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
        const closedClass = await page.locator('#mobileMenu').getAttribute('class') || '';
        if (closedClass.includes('is-open')) {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.FUNCTIONAL,
                title: 'Mobile menu did not close on Escape',
                page: 'home',
            });
        }
    });
});
