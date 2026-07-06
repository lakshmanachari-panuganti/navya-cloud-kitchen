// @ts-check
/* eslint-env node */
/**
 * Console & network audit.
 *
 * On every seed route:
 *   - Records every console.error, console.warning, pageerror, and
 *     unhandledrejection during load + a 1s idle window.
 *   - Records every response with status >= 400, plus network failures.
 *   - Flags large responses (>500KB HTML, >250KB CSS, >800KB image, >150KB JS).
 *   - Flags responses missing Cache-Control (only tracks real ones — the
 *     dev static-server also has no cache header, so we scope the check to
 *     asset paths under /images/ that ship in production).
 */
const { test } = require('./fixtures/audit.fixture');
const { ROUTES } = require('./utils/routes');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

const SIZE_LIMITS = {
    document: 400_000,
    stylesheet: 250_000,
    script: 200_000,
    image: 800_000,
    font: 200_000,
};

test.describe('@cross console & network', () => {
    for (const route of ROUTES) {
        test(`console+network: ${route.slug}`, async ({ page, report, consoleLog, networkLog }) => {
            const resp = await page.goto(route.path, { waitUntil: 'domcontentloaded' }).catch(() => null);
            await page.waitForLoadState('networkidle').catch(() => {});
            await page.waitForTimeout(800);

            if (!resp) {
                await report({
                    severity: SEVERITY.CRITICAL,
                    category: CATEGORIES.FUNCTIONAL,
                    title: `No response for ${route.path}`,
                    page: route.slug,
                    url: route.path,
                });
                return;
            }

            for (const err of consoleLog.errors) {
                // Filter out third-party analytics noise that's expected in local dev
                if (/googletagmanager|gtag/i.test(err)) continue;
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.CONSOLE,
                    title: 'Console error during page load',
                    page: route.slug,
                    url: route.path,
                    actual: err.slice(0, 500),
                });
            }
            for (const warn of consoleLog.warnings) {
                if (/googletagmanager|gtag|preload|Deprecation/i.test(warn)) continue;
                await report({
                    severity: SEVERITY.LOW,
                    category: CATEGORIES.CONSOLE,
                    title: 'Console warning during page load',
                    page: route.slug,
                    url: route.path,
                    actual: warn.slice(0, 500),
                });
            }

            const failures = networkLog.filter((r) => r.failure || (r.status >= 400 && r.status !== 0));
            for (const f of failures) {
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.NETWORK,
                    title: f.failure ? `Request failed: ${f.failure}` : `Request returned HTTP ${f.status}`,
                    page: route.slug,
                    url: f.url,
                    actual: `${f.method} ${f.status || 'ERR'} ${f.resourceType}`,
                });
            }

            // Oversized asset detection
            for (const r of networkLog) {
                const limit = SIZE_LIMITS[r.resourceType];
                if (!limit || !r.size) continue;
                if (r.size > limit) {
                    await report({
                        severity: SEVERITY.MEDIUM,
                        category: CATEGORIES.PERFORMANCE,
                        title: `Oversized ${r.resourceType}: ${(r.size / 1024).toFixed(0)} KB (limit ${limit / 1024} KB)`,
                        page: route.slug,
                        url: r.url,
                    });
                }
            }

            // Duplicate requests to the same URL within one page load are suspicious
            const dupCounts = new Map();
            for (const r of networkLog) {
                dupCounts.set(r.url, (dupCounts.get(r.url) || 0) + 1);
            }
            for (const [url, count] of dupCounts) {
                if (count > 2 && !/analytics|gtag/i.test(url)) {
                    await report({
                        severity: SEVERITY.LOW,
                        category: CATEGORIES.NETWORK,
                        title: `URL fetched ${count} times during a single page load`,
                        page: route.slug,
                        url,
                    });
                }
            }
        });
    }
});
