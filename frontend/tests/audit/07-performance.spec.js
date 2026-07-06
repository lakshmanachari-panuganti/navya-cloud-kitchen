// @ts-check
/* eslint-env node */
/**
 * Performance audit — measured against the local static server so absolute
 * numbers are lower than production, but relative regressions still surface.
 *
 * Captures Core Web Vitals via the browser's Performance APIs (no Lighthouse
 * dependency — Playwright's project matrix runs across three engines, and
 * Lighthouse only supports Chrome).
 *
 * Budgets are intentionally forgiving on WebKit/Firefox because their
 * timing APIs surface slightly different numbers.
 */
const { test } = require('./fixtures/audit.fixture');
const { ROUTES } = require('./utils/routes');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

const BUDGETS = {
    // milliseconds
    fcp:            2_500,
    lcp:            4_000,
    domContentLoaded: 3_000,
    load:           6_000,
    // score
    cls:            0.10,
};

test.describe('@desktop @cross performance', () => {
    for (const route of ROUTES) {
        test(`vitals: ${route.slug}`, async ({ page, report }) => {
            await page.goto(route.path, { waitUntil: 'domcontentloaded' });

            const vitals = await page.evaluate(() => new Promise((resolve) => {
                const out = { fcp: null, lcp: null, cls: 0, domContentLoaded: null, load: null };
                try {
                    const nav = performance.getEntriesByType('navigation')[0];
                    if (nav) {
                        out.domContentLoaded = nav.domContentLoadedEventEnd;
                        out.load = nav.loadEventEnd;
                    }
                } catch { /* older browsers */ }

                try {
                    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
                    if (fcpEntry) out.fcp = fcpEntry.startTime;
                } catch { /* not supported */ }

                // LCP + CLS via PerformanceObserver (Chromium only reliably)
                let lcpSeen = 0;
                try {
                    const po = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            if (entry.startTime > lcpSeen) lcpSeen = entry.startTime;
                        }
                    });
                    po.observe({ type: 'largest-contentful-paint', buffered: true });
                } catch { /* Firefox/WebKit may not support */ }

                let clsValue = 0;
                try {
                    const cls = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            if (!entry.hadRecentInput) clsValue += entry.value;
                        }
                    });
                    cls.observe({ type: 'layout-shift', buffered: true });
                } catch { /* not supported */ }

                setTimeout(() => {
                    out.lcp = lcpSeen || null;
                    out.cls = clsValue;
                    resolve(out);
                }, 1500);
            }));

            for (const [metric, budget] of Object.entries(BUDGETS)) {
                const value = vitals[metric];
                if (value == null) continue;
                if (value > budget) {
                    await report({
                        severity: metric === 'cls' ? SEVERITY.MEDIUM : SEVERITY.LOW,
                        category: CATEGORIES.PERFORMANCE,
                        title: `${metric.toUpperCase()} over budget on ${route.slug}`,
                        page: route.slug,
                        url: route.path,
                        expected: `${budget}${metric === 'cls' ? '' : 'ms'}`,
                        actual: metric === 'cls' ? value.toFixed(3) : `${Math.round(value)}ms`,
                        extra: vitals,
                    });
                }
            }

            // Blocking resources check — count `<link rel="stylesheet">` and non-async scripts in <head>
            const blockingHead = await page.evaluate(() => {
                const links = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]:not([media="print"])'));
                const scripts = Array.from(document.head.querySelectorAll('script[src]:not([async]):not([defer])'));
                return { css: links.length, js: scripts.length };
            });
            if (blockingHead.css > 3) {
                await report({
                    severity: SEVERITY.LOW,
                    category: CATEGORIES.PERFORMANCE,
                    title: `Page has ${blockingHead.css} render-blocking stylesheets in <head>`,
                    page: route.slug,
                    url: route.path,
                });
            }
            if (blockingHead.js > 0) {
                await report({
                    severity: SEVERITY.MEDIUM,
                    category: CATEGORIES.PERFORMANCE,
                    title: `Page has ${blockingHead.js} render-blocking synchronous script(s) in <head>`,
                    page: route.slug,
                    url: route.path,
                    remediation: 'Add defer or async to the <script src> tags.',
                });
            }
        });
    }
});
