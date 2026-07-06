// @ts-check
/* eslint-env node */
/**
 * Image audit.
 *
 * For every seed page verifies:
 *   - Every <img> src resolves (HEAD 2xx/3xx).
 *   - Every <img> has an alt attribute (empty is acceptable for decorative).
 *   - Every <img> reports naturalWidth > 0 (i.e. actually loaded in-browser).
 *   - Images aren't intrinsically wildly larger than their rendered box (>3× is a
 *     performance smell).
 *   - <picture> sources fall back cleanly (source[srcset] resolves too).
 */
const { test } = require('./fixtures/audit.fixture');
const { ROUTES } = require('./utils/routes');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

test.describe('@cross images', () => {
    for (const route of ROUTES) {
        test(`images: ${route.slug}`, async ({ page, request, report }) => {
            const resp = await page.goto(route.path, { waitUntil: 'domcontentloaded' }).catch(() => null);
            if (!resp || resp.status() >= 400) return;
            await page.waitForLoadState('networkidle').catch(() => {});
            await page.waitForSelector('.pcard img', { timeout: 3_000 }).catch(() => {});

            // Force lazy images to load so we can check them
            await page.evaluate(() => {
                document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
                window.scrollTo(0, document.body.scrollHeight);
            });
            await page.waitForTimeout(500);
            await page.evaluate(() => window.scrollTo(0, 0));

            const imgs = await page.$$eval('img', (arr) => arr.map((i) => ({
                src: i.currentSrc || i.src,
                alt: i.getAttribute('alt'),
                naturalWidth: i.naturalWidth,
                naturalHeight: i.naturalHeight,
                boundingWidth: i.getBoundingClientRect().width,
                boundingHeight: i.getBoundingClientRect().height,
                loading: i.getAttribute('loading'),
                onerror: !!i.getAttribute('onerror'),
            })));

            for (const img of imgs) {
                if (!img.src) {
                    await report({
                        severity: SEVERITY.HIGH,
                        category: CATEGORIES.IMAGE,
                        title: 'Image tag with empty src',
                        page: route.slug,
                        url: route.path,
                    });
                    continue;
                }
                if (img.alt === null) {
                    await report({
                        severity: SEVERITY.HIGH,
                        category: CATEGORIES.ACCESSIBILITY,
                        title: 'Image missing alt attribute',
                        page: route.slug,
                        url: route.path,
                        actual: img.src,
                    });
                }
                if (img.naturalWidth === 0 && !img.src.startsWith('data:')) {
                    await report({
                        severity: SEVERITY.HIGH,
                        category: CATEGORIES.IMAGE,
                        title: 'Image failed to load in-browser (naturalWidth=0)',
                        page: route.slug,
                        url: route.path,
                        actual: img.src,
                    });
                }
                // Only flag oversized images when rendered to a meaningful box
                if (img.naturalWidth && img.boundingWidth > 0 && img.naturalWidth > img.boundingWidth * 3) {
                    await report({
                        severity: SEVERITY.LOW,
                        category: CATEGORIES.PERFORMANCE,
                        title: `Image ${Math.round(img.naturalWidth)}px wide but rendered at ${Math.round(img.boundingWidth)}px`,
                        page: route.slug,
                        url: route.path,
                        actual: img.src,
                        remediation: 'Serve smaller variants via <picture> or srcset for the actual displayed size.',
                    });
                }
            }

            // HEAD-check every <img> src + every <source srcset>
            const srcs = new Set(imgs.map((i) => i.src).filter(Boolean));
            const sources = await page.$$eval('picture source', (arr) => arr.flatMap((s) => {
                const set = s.getAttribute('srcset') || '';
                // Resolve inside the page so relative srcset entries become absolute
                return set.split(',').map((part) => part.trim().split(/\s+/)[0]).filter(Boolean).map((raw) => new URL(raw, location.href).toString());
            }));
            for (const s of sources) srcs.add(s);

            for (const src of srcs) {
                if (src.startsWith('data:') || src.startsWith('file:')) continue;
                let url;
                try { url = new URL(src, 'http://localhost:8123'); } catch { continue; }
                if (url.host !== 'localhost:8123') continue; // external image probes handled elsewhere
                const status = await request.get(url.pathname, { failOnStatusCode: false }).then((r) => r.status()).catch(() => 0);
                if (status === 0 || status >= 400) {
                    await report({
                        severity: SEVERITY.HIGH,
                        category: CATEGORIES.IMAGE,
                        title: `Image request failed (HTTP ${status || 'ERR'})`,
                        page: route.slug,
                        url: route.path,
                        actual: url.pathname,
                    });
                }
            }
        });
    }
});
