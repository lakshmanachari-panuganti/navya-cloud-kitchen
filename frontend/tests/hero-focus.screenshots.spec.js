// @ts-check
/* eslint-env node */
const { test } = require('@playwright/test');
const path = require('path');
const { setupFontRoutes } = require('./utils/font-routes');

const OUT = path.join(__dirname, 'screenshots');

test.beforeEach(async ({ context }) => {
    await setupFontRoutes(context);
});

test('hero — desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        document.querySelectorAll('.reveal-up, .scroll-reveal').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.animation = 'none';
        });
    });
    await page.waitForTimeout(400);
    await page.screenshot({
        path: path.join(OUT, 'hero-desktop.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 },
        animations: 'disabled',
    });
});

test('hero — mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        document.querySelectorAll('.reveal-up, .scroll-reveal').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.animation = 'none';
        });
    });
    await page.waitForTimeout(400);
    await page.screenshot({
        path: path.join(OUT, 'hero-mobile.png'),
        clip: { x: 0, y: 0, width: 390, height: 844 },
        animations: 'disabled',
    });
});

test('menu card — desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
    });
    await page.locator('#menuContainer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({
        path: path.join(OUT, 'menu-desktop.png'),
        clip: { x: 0, y: 0, width: 1440, height: 900 },
        animations: 'disabled',
    });
});

test('trust strip — desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        document.querySelectorAll('.scroll-reveal').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    });
    const strip = page.locator('.feature-highlights');
    await strip.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await strip.screenshot({ path: path.join(OUT, 'trust-desktop.png') });
});

test('reviews — desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        document.querySelectorAll('.scroll-reveal').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    });
    const section = page.locator('.reviews-section');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await section.screenshot({ path: path.join(OUT, 'reviews-desktop.png') });
});

test('reviews — mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        document.querySelectorAll('.scroll-reveal').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    });
    const section = page.locator('.reviews-section');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await section.screenshot({ path: path.join(OUT, 'reviews-mobile.png') });
});

test('trust strip — mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        document.querySelectorAll('.scroll-reveal').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    });
    const strip = page.locator('.feature-highlights');
    await strip.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await strip.screenshot({ path: path.join(OUT, 'trust-mobile.png') });
});

test('blog strip — desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        document.querySelectorAll('.scroll-reveal').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    });
    const strip = page.locator('.blog-strip');
    await strip.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await strip.screenshot({ path: path.join(OUT, 'blog-strip-desktop.png') });
});

test('related reads — desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/blog/kandi-podi-benefits-uses.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
    });
    const box = page.locator('.related-reads');
    await box.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await box.screenshot({ path: path.join(OUT, 'related-reads-desktop.png') });
});

test('blog strip — mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        document.querySelectorAll('.scroll-reveal').forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    });
    const strip = page.locator('.blog-strip');
    await strip.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await strip.screenshot({ path: path.join(OUT, 'blog-strip-mobile.png') });
});

test('checkout drawer — desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
    });
    await page.locator('.pcard-cta').first().click();
    await page.waitForTimeout(300);
    await page.locator('#viewCartBtn').click();
    await page.waitForTimeout(700);
    // Scroll drawer body down so the address + remember + pay button are visible
    await page.locator('.form-remember').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.locator('#cartDrawer').screenshot({
        path: path.join(OUT, 'checkout-desktop.png'),
    });
});

test('checkout drawer — mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/index.html');
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
    });
    await page.locator('.pcard-cta').first().click();
    await page.waitForTimeout(300);
    await page.locator('#viewCartBtn').click();
    await page.waitForTimeout(700);
    await page.locator('.form-remember').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.locator('#cartDrawer').screenshot({
        path: path.join(OUT, 'checkout-mobile.png'),
    });
});
