// @ts-check
/* eslint-env node */
/**
 * Full-page screenshot capture across all primary routes and key flows.
 *
 * Runs once per project (desktop, mobile) — output routes into
 *   tests/screenshots/<project>/<page>.png
 * The mobile project also captures a couple of interaction states
 * (slide-in menu, cart drawer) so the mobile UX is fully covered.
 */
const { test, expect } = require('@playwright/test');
const path = require('path');
const { setupFontRoutes } = require('./utils/font-routes');

const OUT_ROOT = path.join(__dirname, 'screenshots');

// Serve locally-cached Google Fonts in every test so screenshots show the
// correct typefaces even without CDN access (CI / offline runs).
test.beforeEach(async ({ context }) => {
    await setupFontRoutes(context);
});

/**
 * Primary routes. Paths are relative to the base URL.
 * `slug` becomes the screenshot file name (without extension).
 */
const PAGES = [
    { slug: 'home',     path: '/index.html' },
    { slug: 'policies', path: '/policies.html' },

    { slug: 'products/avise-ginjala-podi',   path: '/products/avise-ginjala-podi.html' },
    { slug: 'products/bellam-palli-undalu',  path: '/products/bellam-palli-undalu.html' },
    { slug: 'products/kandi-podi',           path: '/products/kandi-podi.html' },
    { slug: 'products/karivepaku-podi',      path: '/products/karivepaku-podi.html' },
    { slug: 'products/minapa-sunni-undalu',  path: '/products/minapa-sunni-undalu.html' },
    { slug: 'products/munagaku-podi',        path: '/products/munagaku-podi.html' },
    { slug: 'products/nuvvula-podi',         path: '/products/nuvvula-podi.html' },
    { slug: 'products/nuvvula-undalu',       path: '/products/nuvvula-undalu.html' },
    { slug: 'products/vellulli-karampodi',   path: '/products/vellulli-karampodi.html' },

    { slug: 'blog/homemade-vs-store-bought-podi',    path: '/blog/homemade-vs-store-bought-podi.html' },
    { slug: 'blog/kandi-podi-benefits-uses',         path: '/blog/kandi-podi-benefits-uses.html' },
    { slug: 'blog/karivepaku-podi-curry-leaves-powder', path: '/blog/karivepaku-podi-curry-leaves-powder.html' },
];

/**
 * Wait for the page to fully paint before capture:
 *   - DOM + subresources loaded
 *   - Web fonts settled
 *   - Any lingering CSS animations (marquee, subtle pulses) don't cause tearing
 */
async function settle(page) {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }
        // Nudge lazy-loaded imagery to eager for the shot
        document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
            img.loading = 'eager';
        });
        // Hide fixed panels (cart drawer, success screen, sticky cart bar) that
        // aren't currently open. Playwright's fullPage capture stretches the
        // viewport and can render `position:fixed; transform:translateY(100%)`
        // panels inline, polluting the shot.
        const selectors = [
            '.drawer:not(.open)',
            '.drawer-overlay',
            '.success-screen:not(.open)',
            '.cart-bar',
        ];
        selectors.forEach((sel) => {
            document.querySelectorAll(sel).forEach((el) => {
                el.style.setProperty('display', 'none', 'important');
            });
        });
        // Force-reveal any scroll-triggered content. IntersectionObserver
        // may not fire for elements far below the initial viewport during
        // a fullPage capture, leaving `.scroll-reveal` blocks stuck at
        // opacity:0.
        document.querySelectorAll('.scroll-reveal, .reveal-up').forEach((el) => {
            el.classList.add('revealed');
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.animation = 'none';
        });
    });
    // Small settle delay for reveal-up animations to finish
    await page.waitForTimeout(600);
}

function outPath(projectName, slug) {
    return path.join(OUT_ROOT, projectName, `${slug}.png`);
}

for (const page of PAGES) {
    test(`capture ${page.slug}`, async ({ page: pw, browserName }, testInfo) => {
        void browserName;
        const project = testInfo.project.name;

        const response = await pw.goto(page.path, { waitUntil: 'domcontentloaded' });
        expect(response, `no response for ${page.path}`).not.toBeNull();
        expect(response.status(), `bad status for ${page.path}`).toBeLessThan(400);

        await settle(pw);
        await pw.screenshot({
            path: outPath(project, page.slug),
            fullPage: true,
            animations: 'disabled',
        });
    });
}

/*
 * Mobile-only interaction states.
 * Skipped in the desktop project because the corresponding UI
 * (slide-in menu, sticky cart bar) is mobile-first.
 */
test.describe('mobile flows', () => {
    test.beforeEach(async ({}, testInfo) => {
        test.skip(testInfo.project.name !== 'mobile', 'mobile-only flow');
    });

    test('home — slide-in menu open', async ({ page }) => {
        await page.goto('/index.html');
        await settle(page);
        await page.locator('#navMenuBtn').click();
        // Wait for the slide-in transition to finish
        await page.waitForSelector('.mobile-menu.is-open', { state: 'attached' });
        await page.waitForTimeout(500);
        await page.screenshot({
            path: outPath('mobile', 'home--menu-open'),
            fullPage: false,
            animations: 'disabled',
        });
    });

    test('home — products accordion expanded', async ({ page }) => {
        await page.goto('/index.html');
        await settle(page);
        await page.locator('#navMenuBtn').click();
        await page.waitForSelector('.mobile-menu.is-open');
        await page.waitForTimeout(400);
        await page.locator('.mm-accordion-trigger').first().click();
        await page.waitForTimeout(300);
        await page.screenshot({
            path: outPath('mobile', 'home--menu-products-open'),
            fullPage: false,
            animations: 'disabled',
        });
    });
});

/*
 * Desktop-only: scrolled navbar state (transparent → solid transition).
 */
test.describe('desktop states', () => {
    test.beforeEach(async ({}, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'desktop-only state');
    });

    test('home — navbar scrolled state', async ({ page }) => {
        await page.goto('/index.html');
        await settle(page);
        await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'instant' }));
        await page.waitForTimeout(500);
        await page.screenshot({
            path: outPath('desktop', 'home--nav-scrolled'),
            fullPage: false,
            animations: 'disabled',
            clip: { x: 0, y: 0, width: 1440, height: 200 },
        });
    });
});
