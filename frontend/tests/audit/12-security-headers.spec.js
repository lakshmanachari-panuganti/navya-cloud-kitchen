// @ts-check
/* eslint-env node */
/**
 * Security posture audit (non-invasive).
 *
 * Only inspects HTTP response headers, cookie attributes, and page source for
 * obvious information disclosure. Does not attempt any exploit.
 *
 * Runs against the seed routes. In local dev http-server won't set these
 * headers, so the findings are labelled as MEDIUM/LOW to reflect that the
 * production Azure Static Web Apps config is where they must live —
 * staticwebapp.config.json is inspected separately.
 */
const fs = require('fs');
const path = require('path');
const { test } = require('./fixtures/audit.fixture');
const { ROUTES } = require('./utils/routes');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

const REQUIRED_HEADERS = [
    { name: 'content-security-policy',   severity: SEVERITY.HIGH,   description: 'No CSP declared — script/style injection risk is unmitigated.' },
    { name: 'x-content-type-options',    severity: SEVERITY.MEDIUM, description: 'Missing X-Content-Type-Options: nosniff.' },
    { name: 'x-frame-options',           severity: SEVERITY.MEDIUM, description: 'Missing X-Frame-Options / frame-ancestors CSP — clickjacking risk.' },
    { name: 'referrer-policy',           severity: SEVERITY.LOW,    description: 'No Referrer-Policy declared.' },
    { name: 'strict-transport-security', severity: SEVERITY.LOW,    description: 'No HSTS. (In dev http-server this is expected; production must set it.)' },
    { name: 'permissions-policy',        severity: SEVERITY.LOW,    description: 'No Permissions-Policy declared.' },
];

test.describe('@chromium-only @cross security posture', () => {
    for (const route of ROUTES) {
        test(`headers: ${route.slug}`, async ({ request, report }) => {
            const resp = await request.get(route.path, { failOnStatusCode: false }).catch(() => null);
            if (!resp) return;
            const headers = resp.headers();

            for (const rh of REQUIRED_HEADERS) {
                if (!headers[rh.name]) {
                    await report({
                        severity: rh.severity,
                        category: CATEGORIES.SECURITY,
                        title: `Missing response header: ${rh.name}`,
                        page: route.slug,
                        url: route.path,
                        description: rh.description,
                    });
                }
            }

            // Mixed-content signal: page delivered http:// but references https://... assets is *fine*
            // The failing case is the opposite; test that explicitly on the page.
        });
    }

    test('page HTML references only https:// external resources', async ({ page, report }) => {
        await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
        const insecure = await page.evaluate(() => {
            const targets = [
                ...document.querySelectorAll('script[src]'),
                ...document.querySelectorAll('link[href]'),
                ...document.querySelectorAll('img[src]'),
                ...document.querySelectorAll('iframe[src]'),
            ];
            const bad = [];
            for (const el of targets) {
                const attr = el.getAttribute('src') || el.getAttribute('href') || '';
                if (/^http:\/\//i.test(attr)) bad.push({ tag: el.tagName, url: attr });
            }
            return bad;
        });
        for (const b of insecure) {
            await report({
                severity: SEVERITY.HIGH,
                category: CATEGORIES.SECURITY,
                title: `Insecure http:// resource referenced by ${b.tag}`,
                page: 'home',
                actual: b.url,
                remediation: 'Serve every third-party asset over https://.',
            });
        }
    });

    test('staticwebapp.config.json declares security headers for production', async ({ report }) => {
        const cfgPath = path.join(__dirname, '..', '..', 'staticwebapp.config.json');
        if (!fs.existsSync(cfgPath)) {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.SECURITY,
                title: 'staticwebapp.config.json not found — no way to set production security headers',
            });
            return;
        }
        let cfg;
        try { cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8')); }
        catch (err) {
            await report({
                severity: SEVERITY.HIGH,
                category: CATEGORIES.SECURITY,
                title: 'staticwebapp.config.json fails to parse',
                actual: String((err && err.message) || err).slice(0, 200),
            });
            return;
        }
        const gh = (cfg.globalHeaders || {});
        const needed = ['content-security-policy', 'x-content-type-options', 'x-frame-options', 'strict-transport-security', 'referrer-policy'];
        for (const key of needed) {
            const present = Object.keys(gh).some((k) => k.toLowerCase() === key);
            if (!present) {
                await report({
                    severity: SEVERITY.MEDIUM,
                    category: CATEGORIES.SECURITY,
                    title: `staticwebapp.config.json globalHeaders missing ${key}`,
                    remediation: `Add "${key}" to globalHeaders for production hardening.`,
                });
            }
        }
    });

    test('no obvious secrets leak into page HTML', async ({ page, report }) => {
        await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
        const html = await page.content();
        const patterns = [
            { rx: /AKIA[0-9A-Z]{16}/,        label: 'AWS access key ID pattern' },
            { rx: /-----BEGIN [A-Z ]+PRIVATE KEY-----/, label: 'Private key material' },
            { rx: /sk_live_[0-9a-zA-Z]{20,}/, label: 'Stripe live secret key' },
            { rx: /ghp_[A-Za-z0-9]{30,}/,    label: 'GitHub PAT' },
            { rx: /file:\/\/\/[A-Z]:\//i,    label: 'Absolute local path in HTML' },
        ];
        for (const p of patterns) {
            if (p.rx.test(html)) {
                await report({
                    severity: SEVERITY.CRITICAL,
                    category: CATEGORIES.SECURITY,
                    title: `Potential secret pattern in HTML: ${p.label}`,
                    remediation: 'Remove or rotate the exposed value immediately.',
                });
            }
        }
    });
});
