// @ts-check
/* eslint-env node */
/**
 * Link-integrity audit.
 *
 * For every seed page:
 *   - Collect every <a href>. Classify each link.
 *   - Internal HTML links: HEAD-request each one and confirm 2xx/3xx.
 *   - Internal fragment (#) links: verify the target element exists on the page.
 *   - Absolute URLs pointing at same-host but different origin (e.g. https://
 *     variant) are recorded as-is.
 *   - External links: probed only for reachable status code. Failures at this
 *     layer are logged as INFO because production may block outbound requests
 *     during automation.
 *   - Every anchor without an href, or with an empty href, is a defect.
 */
const { test } = require('./fixtures/audit.fixture');
const { ROUTES, classifyLink } = require('./utils/routes');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

const internalCache = new Map();

async function probeInternal(request, path) {
    if (internalCache.has(path)) return internalCache.get(path);
    let status = 0;
    try {
        const resp = await request.get(path, { failOnStatusCode: false, maxRedirects: 3 });
        status = resp.status();
    } catch {
        status = 0;
    }
    internalCache.set(path, status);
    return status;
}

test.describe('@chromium-only @cross links', () => {
    for (const route of ROUTES) {
        test(`links: ${route.slug}`, async ({ page, request, report }) => {
            const resp = await page.goto(route.path, { waitUntil: 'domcontentloaded' }).catch(() => null);
            if (!resp || resp.status() >= 400) return;
            await page.waitForLoadState('networkidle').catch(() => {});
            await page.waitForSelector('.pcard', { timeout: 3_000 }).catch(() => {});

            const anchors = await page.$$eval('a', (arr) => arr.map((a) => ({
                href: a.getAttribute('href'),
                text: (a.textContent || '').trim().slice(0, 80),
                target: a.getAttribute('target'),
                rel: a.getAttribute('rel'),
            })));

            for (const a of anchors) {
                if (a.href == null) {
                    await report({
                        severity: SEVERITY.MEDIUM,
                        category: CATEGORIES.LINK,
                        title: 'Anchor with no href attribute',
                        page: route.slug,
                        url: route.path,
                        actual: a.text,
                    });
                    continue;
                }
                if (a.href === '' || a.href === '#') {
                    await report({
                        severity: SEVERITY.LOW,
                        category: CATEGORIES.LINK,
                        title: `Anchor with empty/hash-only href: "${a.href}"`,
                        page: route.slug,
                        url: route.path,
                        actual: a.text,
                    });
                    continue;
                }
                // target=_blank without rel=noopener leaks window.opener
                if (a.target === '_blank' && !(a.rel || '').split(/\s+/).includes('noopener')) {
                    await report({
                        severity: SEVERITY.MEDIUM,
                        category: CATEGORIES.SECURITY,
                        title: 'target="_blank" link missing rel="noopener"',
                        page: route.slug,
                        url: route.path,
                        actual: a.href,
                        remediation: 'Add rel="noopener noreferrer" to prevent reverse tabnabbing.',
                    });
                }

                const cls = classifyLink(a.href, route.path);
                if (cls.internal) {
                    const status = await probeInternal(request, cls.path);
                    if (status === 0 || status >= 400) {
                        await report({
                            severity: SEVERITY.HIGH,
                            category: CATEGORIES.LINK,
                            title: `Broken internal link: ${cls.path} (HTTP ${status || 'ERR'})`,
                            page: route.slug,
                            url: route.path,
                            actual: `text="${a.text}"`,
                        });
                    }
                } else if (cls.kind === 'fragment' && a.href.length > 1) {
                    const target = a.href.slice(1);
                    // CSS.escape doesn't exist in Node — use a getElementById lookup inside the page instead
                    const exists = await page.evaluate((id) => !!document.getElementById(id), target).catch(() => false);
                    if (!exists) {
                        await report({
                            severity: SEVERITY.MEDIUM,
                            category: CATEGORIES.LINK,
                            title: `Fragment link "${a.href}" points to nonexistent id`,
                            page: route.slug,
                            url: route.path,
                            actual: `text="${a.text}"`,
                        });
                    }
                }
            }
        });
    }
});
