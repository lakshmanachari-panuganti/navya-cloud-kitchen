// @ts-check
/* eslint-env node */
/**
 * Discovery pass. Runs once (chromium-desktop only) and:
 *   1. Verifies every seed route returns a non-error response.
 *   2. Crawls every navigation/menu/footer link and records anything that
 *      resolves to an *internal* HTML page not in the seed set.
 *   3. Records the discovered set for downstream specs (routes.js caches it).
 *
 * @cross so it runs in the default matrix; other browsers benefit from the
 * cached discovery output.
 */
const { test } = require('./fixtures/audit.fixture');
const { ROUTES, discoverRoutes } = require('./utils/routes');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

test.describe('@chromium-only @cross discovery', () => {
    test('every seed route returns a successful response', async ({ page, report }) => {
        for (const route of ROUTES) {
            const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' }).catch((err) => ({ error: err.message }));
            if (!response || response.error) {
                await report({
                    severity: SEVERITY.CRITICAL,
                    category: CATEGORIES.FUNCTIONAL,
                    title: `Route "${route.path}" failed to load`,
                    description: response && response.error ? response.error : 'no response',
                    page: route.slug,
                    url: route.path,
                    remediation: 'Verify the file exists and the static server serves this path.',
                });
                continue;
            }
            const status = response.status();
            if (status >= 400) {
                await report({
                    severity: SEVERITY.CRITICAL,
                    category: CATEGORIES.FUNCTIONAL,
                    title: `Route "${route.path}" returned HTTP ${status}`,
                    page: route.slug,
                    url: route.path,
                    expected: '2xx or 3xx',
                    actual: String(status),
                });
            }
        }
    });

    test('crawl navigation and record any discovered internal pages', async ({ context, report }) => {
        const { extras, externalLinks } = await discoverRoutes(context);
        if (extras.length) {
            await report({
                severity: SEVERITY.INFO,
                category: CATEGORIES.FUNCTIONAL,
                title: `Discovered ${extras.length} internal page(s) not in the seed route list`,
                description: `Added to downstream audit passes: ${extras.map((e) => e.path).join(', ')}`,
                extra: { extras },
            });
        }
        // Just recording that we found external links; individual link-integrity spec probes them.
        if (externalLinks.length) {
            await report({
                severity: SEVERITY.INFO,
                category: CATEGORIES.LINK,
                title: `Found ${externalLinks.length} distinct external link target(s)`,
                extra: { externalLinks: externalLinks.slice(0, 200) },
            });
        }
    });
});
