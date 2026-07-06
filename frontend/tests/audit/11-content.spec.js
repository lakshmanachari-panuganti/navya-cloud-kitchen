// @ts-check
/* eslint-env node */
/**
 * Content audit — anti-embarrassment.
 *
 * Flags:
 *   - Any page with fewer than 200 rendered characters (likely broken template)
 *   - Placeholder strings like "Lorem", "TODO", "FIXME", "TBD", "XXX"
 *   - Duplicate visible headings within a single page (usually a mistake)
 *   - Buttons/anchors with no accessible name
 *   - Analytics placeholder G-XXXXXXXXXX in HTML
 *   - "Applied for" FSSAI/licence lines pre-launch (nice-to-warn)
 *   - Absolute local paths (file:///C:/...) leaking into the DOM
 */
const { test } = require('./fixtures/audit.fixture');
const { ROUTES } = require('./utils/routes');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

const RED_FLAG_PATTERNS = [
    { pattern: /\blorem\s+ipsum\b/i,   label: 'Lorem ipsum placeholder text',        severity: SEVERITY.HIGH },
    { pattern: /\bTODO\b/,             label: 'TODO comment or content',             severity: SEVERITY.MEDIUM },
    { pattern: /\bFIXME\b/,            label: 'FIXME comment or content',            severity: SEVERITY.MEDIUM },
    { pattern: /\bTBD\b/,              label: 'TBD placeholder',                     severity: SEVERITY.MEDIUM },
    { pattern: /\bXXX\b/,              label: 'XXX placeholder',                     severity: SEVERITY.LOW },
    { pattern: /coming soon/i,         label: '"Coming soon" copy still shipping',   severity: SEVERITY.LOW },
    { pattern: /placeholder/i,         label: 'The word "placeholder" appears in visible copy', severity: SEVERITY.LOW },
    { pattern: /G-XXXXXXXXXX/,         label: 'Google Analytics placeholder measurement ID', severity: SEVERITY.HIGH },
    { pattern: /file:\/\/\/[A-Z]:/i,   label: 'Absolute local path leaking into source', severity: SEVERITY.HIGH },
    { pattern: /Applied for/i,         label: 'License marked "Applied for" in customer-visible copy', severity: SEVERITY.LOW },
];

test.describe('@chromium-only @cross content', () => {
    for (const route of ROUTES) {
        test(`content: ${route.slug}`, async ({ page, report }) => {
            const resp = await page.goto(route.path, { waitUntil: 'domcontentloaded' }).catch(() => null);
            if (!resp || resp.status() >= 400) return;
            await page.waitForLoadState('networkidle').catch(() => {});
            await page.waitForSelector('.pcard', { timeout: 3_000 }).catch(() => {});

            const bodyText = (await page.locator('body').textContent() || '').trim();
            if (bodyText.length < 200) {
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.CONTENT,
                    title: `Page renders very little text (${bodyText.length} chars)`,
                    page: route.slug,
                    url: route.path,
                });
            }

            // Search body TEXT and outer HTML — some placeholders live in comments/scripts too
            const html = await page.content();
            for (const rule of RED_FLAG_PATTERNS) {
                if (rule.pattern.test(bodyText) || rule.pattern.test(html)) {
                    await report({
                        severity: rule.severity,
                        category: CATEGORIES.CONTENT,
                        title: rule.label,
                        page: route.slug,
                        url: route.path,
                        actual: (bodyText.match(rule.pattern) || html.match(rule.pattern) || [''])[0],
                    });
                }
            }

            // Duplicate visible headings (h1-h3)
            const headings = await page.$$eval('h1,h2,h3', (arr) => arr.map((h) => (h.textContent || '').trim().toLowerCase()).filter(Boolean));
            const seen = new Map();
            for (const h of headings) {
                seen.set(h, (seen.get(h) || 0) + 1);
            }
            for (const [text, count] of seen) {
                if (count > 1) {
                    await report({
                        severity: SEVERITY.LOW,
                        category: CATEGORIES.CONTENT,
                        title: `Heading "${text.slice(0, 60)}" appears ${count} times`,
                        page: route.slug,
                        url: route.path,
                    });
                }
            }

            // Buttons/anchors with no accessible name (fair heuristic — no text and no aria-label)
            const nameless = await page.$$eval('button, a', (arr) => {
                const results = [];
                for (const el of arr) {
                    const text = (el.textContent || '').trim();
                    const label = el.getAttribute('aria-label') || el.getAttribute('title');
                    if (!text && !label && el.offsetParent !== null) {
                        results.push({ tag: el.tagName, id: el.id || '', cls: el.className || '' });
                    }
                }
                return results;
            });
            for (const n of nameless) {
                await report({
                    severity: SEVERITY.MEDIUM,
                    category: CATEGORIES.ACCESSIBILITY,
                    title: `${n.tag} without accessible name`,
                    page: route.slug,
                    url: route.path,
                    selector: `${n.tag.toLowerCase()}${n.id ? '#' + n.id : ''}${n.cls ? '.' + n.cls.split(' ').filter(Boolean).join('.') : ''}`.slice(0, 200),
                });
            }
        });
    }
});
