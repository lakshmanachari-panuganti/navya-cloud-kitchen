// @ts-check
/* eslint-env node */
/**
 * Static route registry + dynamic route crawler.
 *
 * ROUTES: the "known" pages the site owns — used as the seed set for every
 * auditor (SEO, a11y, links, visual, etc.).
 *
 * discoverRoutes(): walks the DOM of the seed pages and returns every new
 * *internal* href it finds. Runs once per audit session and caches the result
 * in tests/audit-report/discovered-routes.json so multiple specs share it.
 */
const fs = require('fs');
const path = require('path');

const REPORT_ROOT = path.join(__dirname, '..', '..', 'audit-report');
const CACHE_FILE = path.join(REPORT_ROOT, 'discovered-routes.json');

/** Seed routes — declared, not discovered. */
const ROUTES = [
    { slug: 'home',      path: '/index.html',    kind: 'landing' },
    { slug: 'policies',  path: '/policies.html', kind: 'legal' },

    { slug: 'products/avise-ginjala-podi',   path: '/products/avise-ginjala-podi.html',   kind: 'product' },
    { slug: 'products/bellam-palli-undalu',  path: '/products/bellam-palli-undalu.html',  kind: 'product' },
    { slug: 'products/kandi-podi',           path: '/products/kandi-podi.html',           kind: 'product' },
    { slug: 'products/karivepaku-podi',      path: '/products/karivepaku-podi.html',      kind: 'product' },
    { slug: 'products/minapa-sunni-undalu',  path: '/products/minapa-sunni-undalu.html',  kind: 'product' },
    { slug: 'products/munagaku-podi',        path: '/products/munagaku-podi.html',        kind: 'product' },
    { slug: 'products/nuvvula-podi',         path: '/products/nuvvula-podi.html',         kind: 'product' },
    { slug: 'products/nuvvula-undalu',       path: '/products/nuvvula-undalu.html',       kind: 'product' },
    { slug: 'products/vellulli-karampodi',   path: '/products/vellulli-karampodi.html',   kind: 'product' },

    { slug: 'blog/homemade-vs-store-bought-podi',       path: '/blog/homemade-vs-store-bought-podi.html',       kind: 'blog' },
    { slug: 'blog/kandi-podi-benefits-uses',            path: '/blog/kandi-podi-benefits-uses.html',            kind: 'blog' },
    { slug: 'blog/karivepaku-podi-curry-leaves-powder', path: '/blog/karivepaku-podi-curry-leaves-powder.html', kind: 'blog' },
];

const ROUTE_PATHS = ROUTES.map((r) => r.path.toLowerCase());

/**
 * Given an <a href> value on `basePath`, decide if it's an internal HTML route
 * we should crawl. Skips assets, hash-only fragments, mailto:, tel:, wa.me, etc.
 */
function classifyLink(href, basePath) {
    if (!href) return { internal: false, kind: 'empty' };
    const trimmed = href.trim();
    if (!trimmed) return { internal: false, kind: 'empty' };
    if (trimmed.startsWith('#')) return { internal: false, kind: 'fragment' };
    if (/^(mailto|tel|sms|whatsapp|javascript):/i.test(trimmed)) return { internal: false, kind: 'protocol' };

    let url;
    try {
        url = new URL(trimmed, `http://localhost:8123${basePath}`);
    } catch {
        return { internal: false, kind: 'invalid' };
    }

    // Only same-origin http(s) counts as internal
    if (!/^https?:$/.test(url.protocol)) return { internal: false, kind: 'protocol' };
    if (url.host !== 'localhost:8123' && !/^(www\.)?navyacloudkitchen\.com$/i.test(url.host)) {
        return { internal: false, kind: 'external', absolute: url.toString() };
    }

    // Skip binary assets — the link-integrity spec checks those separately
    if (/\.(png|jpe?g|webp|gif|svg|ico|css|js|pdf|zip|mp4|webm|woff2?)$/i.test(url.pathname)) {
        return { internal: false, kind: 'asset', absolute: url.toString() };
    }

    return {
        internal: true,
        kind: 'html',
        path: url.pathname + (url.search || ''),
        hash: url.hash,
        absolute: url.toString(),
    };
}

/**
 * Discover reachable internal pages starting from the seed ROUTES.
 * Returns { seeded, discovered, extras } and caches to disk.
 *
 * @param {import('@playwright/test').BrowserContext} context
 */
async function discoverRoutes(context) {
    if (fs.existsSync(CACHE_FILE)) {
        try {
            const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
            if (cached && cached.discovered) return cached;
        } catch { /* fall through and regenerate */ }
    }

    const known = new Set(ROUTE_PATHS);
    const extras = [];
    const externalLinks = new Set();

    const page = await context.newPage();
    try {
        for (const route of ROUTES) {
            try {
                await page.goto(route.path, { waitUntil: 'domcontentloaded', timeout: 20_000 });
                await page.waitForLoadState('networkidle').catch(() => {});
            } catch { continue; }

            const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href') || ''));
            for (const href of hrefs) {
                const cls = classifyLink(href, route.path);
                if (cls.internal) {
                    const p = cls.path.toLowerCase();
                    if (!known.has(p)) {
                        known.add(p);
                        extras.push({ slug: p.replace(/^\//, '').replace(/\.html$/, '') || 'discovered', path: cls.path, kind: 'discovered', discoveredFrom: route.path });
                    }
                } else if (cls.kind === 'external' && cls.absolute) {
                    externalLinks.add(cls.absolute);
                }
            }
        }
    } finally {
        await page.close().catch(() => {});
    }

    const payload = {
        seeded: ROUTES,
        discovered: ROUTES.concat(extras),
        extras,
        externalLinks: Array.from(externalLinks).sort(),
        generatedAt: new Date().toISOString(),
    };
    if (!fs.existsSync(REPORT_ROOT)) fs.mkdirSync(REPORT_ROOT, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(payload, null, 2), 'utf8');
    return payload;
}

module.exports = {
    ROUTES,
    ROUTE_PATHS,
    classifyLink,
    discoverRoutes,
};
