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
