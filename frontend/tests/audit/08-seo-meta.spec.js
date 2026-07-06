// @ts-check
/* eslint-env node */
/**
 * SEO / metadata audit.
 *
 * For every seed route, verify:
 *   - <title> present, 10–65 chars, unique across the site
 *   - <meta name="description"> present, 50–160 chars, unique across the site
 *   - <link rel="canonical"> present and absolute
 *   - Open Graph tags: og:title, og:description, og:image, og:type, og:url
 *   - Twitter card tags
 *   - <html lang> is set
 *   - Structured data (application/ld+json) parses as JSON
 *
 * Also verifies robots.txt and sitemap.xml exist and reference the seed routes.
 */
const { test } = require('./fixtures/audit.fixture');
const { ROUTES } = require('./utils/routes');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

const globalTitles = new Map();
const globalDescriptions = new Map();

test.describe.configure({ mode: 'serial' });

test.describe('@chromium-only @cross seo', () => {
    for (const route of ROUTES) {
        test(`meta: ${route.slug}`, async ({ page, report }) => {
            const resp = await page.goto(route.path, { waitUntil: 'domcontentloaded' }).catch(() => null);
            if (!resp || resp.status() >= 400) return;

            const meta = await page.evaluate(() => {
                const get = (sel) => {
                    const el = document.querySelector(sel);
                    return el ? el.getAttribute('content') || el.textContent || '' : null;
                };
                const structured = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) => s.textContent || '');
                return {
                    title: document.title,
                    description: get('meta[name="description"]'),
                    canonical: (document.querySelector('link[rel="canonical"]') || {}).href || null,
                    ogTitle: get('meta[property="og:title"]'),
                    ogDescription: get('meta[property="og:description"]'),
                    ogImage: get('meta[property="og:image"]'),
                    ogType: get('meta[property="og:type"]'),
                    ogUrl: get('meta[property="og:url"]'),
                    twitterCard: get('meta[name="twitter:card"]'),
                    twitterTitle: get('meta[name="twitter:title"]'),
                    twitterImage: get('meta[name="twitter:image"]'),
                    htmlLang: document.documentElement.getAttribute('lang'),
                    viewport: get('meta[name="viewport"]'),
                    structured,
                    favicon: (document.querySelector('link[rel~="icon"]') || {}).href || null,
                };
            });

            // Title
            if (!meta.title || meta.title.length < 10) {
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.SEO,
                    title: 'Missing or too-short <title>',
                    page: route.slug,
                    url: route.path,
                    actual: meta.title || '(empty)',
                });
            } else if (meta.title.length > 65) {
                await report({
                    severity: SEVERITY.LOW,
                    category: CATEGORIES.SEO,
                    title: `<title> is ${meta.title.length} characters (recommended ≤65)`,
                    page: route.slug,
                    url: route.path,
                    actual: meta.title,
                });
            }
            const dupTitle = globalTitles.get(meta.title);
            if (dupTitle && dupTitle !== route.slug) {
                await report({
                    severity: SEVERITY.MEDIUM,
                    category: CATEGORIES.SEO,
                    title: `Duplicate <title> shared with ${dupTitle}`,
                    page: route.slug,
                    url: route.path,
                    actual: meta.title,
                });
            } else if (meta.title) {
                globalTitles.set(meta.title, route.slug);
            }

            // Description
            if (!meta.description) {
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.SEO,
                    title: 'Missing <meta name="description">',
                    page: route.slug,
                    url: route.path,
                });
            } else {
                const len = meta.description.length;
                if (len < 50 || len > 160) {
                    await report({
                        severity: SEVERITY.LOW,
                        category: CATEGORIES.SEO,
                        title: `Meta description length ${len} outside recommended 50–160`,
                        page: route.slug,
                        url: route.path,
                        actual: meta.description,
                    });
                }
                const dupDesc = globalDescriptions.get(meta.description);
                if (dupDesc && dupDesc !== route.slug) {
                    await report({
                        severity: SEVERITY.MEDIUM,
                        category: CATEGORIES.SEO,
                        title: `Duplicate meta description shared with ${dupDesc}`,
                        page: route.slug,
                        url: route.path,
                    });
                }
                globalDescriptions.set(meta.description, route.slug);
            }

            // Canonical
            if (!meta.canonical) {
                await report({
                    severity: SEVERITY.MEDIUM,
                    category: CATEGORIES.SEO,
                    title: 'Missing <link rel="canonical">',
                    page: route.slug,
                    url: route.path,
                });
            }

            const socialChecks = [
                ['og:title',       meta.ogTitle],
                ['og:description', meta.ogDescription],
                ['og:image',       meta.ogImage],
                ['og:type',        meta.ogType],
                ['og:url',         meta.ogUrl],
                ['twitter:card',   meta.twitterCard],
                ['twitter:title',  meta.twitterTitle],
                ['twitter:image',  meta.twitterImage],
            ];
            for (const [tag, value] of socialChecks) {
                if (!value) {
                    await report({
                        severity: SEVERITY.LOW,
                        category: CATEGORIES.SEO,
                        title: `Missing ${tag} meta tag`,
                        page: route.slug,
                        url: route.path,
                    });
                }
            }

            if (!meta.htmlLang) {
                await report({
                    severity: SEVERITY.MEDIUM,
                    category: CATEGORIES.ACCESSIBILITY,
                    title: '<html> missing lang attribute',
                    page: route.slug,
                    url: route.path,
                });
            }
            if (!meta.viewport) {
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.SEO,
                    title: 'Missing viewport meta tag',
                    page: route.slug,
                    url: route.path,
                });
            }
            if (!meta.favicon) {
                await report({
                    severity: SEVERITY.LOW,
                    category: CATEGORIES.SEO,
                    title: 'No <link rel="icon"> declared',
                    page: route.slug,
                    url: route.path,
                });
            }

            // Structured data — must parse
            for (const raw of meta.structured) {
                try { JSON.parse(raw); }
                catch (err) {
                    await report({
                        severity: SEVERITY.MEDIUM,
                        category: CATEGORIES.SEO,
                        title: 'Structured data (JSON-LD) fails to parse',
                        page: route.slug,
                        url: route.path,
                        actual: String((err && err.message) || err).slice(0, 200),
                    });
                }
            }
        });
    }

    test('robots.txt exists and is not empty', async ({ page, report }) => {
        const resp = await page.goto('/robots.txt', { waitUntil: 'domcontentloaded' }).catch(() => null);
        if (!resp || resp.status() >= 400) {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.SEO,
                title: 'robots.txt missing or errors',
                url: '/robots.txt',
                actual: resp ? String(resp.status()) : 'no response',
            });
            return;
        }
        const text = (await page.textContent('body')) || '';
        if (!text.trim()) {
            await report({
                severity: SEVERITY.LOW,
                category: CATEGORIES.SEO,
                title: 'robots.txt is empty',
                url: '/robots.txt',
            });
        }
    });

    test('sitemap.xml exists and references seed routes', async ({ request, report }) => {
        const resp = await request.get('/sitemap.xml').catch(() => null);
        if (!resp || !resp.ok()) {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.SEO,
                title: 'sitemap.xml missing or errors',
                url: '/sitemap.xml',
                actual: resp ? String(resp.status()) : 'no response',
            });
            return;
        }
        const body = await resp.text();
        const missing = ROUTES.filter((r) => !body.includes(r.path) && !body.includes(r.path.replace(/^\//, '')));
        if (missing.length) {
            await report({
                severity: SEVERITY.LOW,
                category: CATEGORIES.SEO,
                title: `sitemap.xml missing ${missing.length} known route(s)`,
                actual: missing.map((r) => r.path).join(', '),
            });
        }
    });

    test('Google Analytics ID is not a placeholder', async ({ page, report }) => {
        await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
        const html = await page.content();
        if (/G-XXXXXXXXXX/.test(html)) {
            await report({
                severity: SEVERITY.HIGH,
                category: CATEGORIES.SEO,
                title: 'Google Analytics measurement ID is a placeholder (G-XXXXXXXXXX)',
                url: '/index.html',
                remediation: 'Replace the placeholder with the real GA4 measurement ID before launch.',
            });
        }
    });
});
