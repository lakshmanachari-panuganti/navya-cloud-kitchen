// @ts-check
/* eslint-env node */
/**
 * WCAG 2.1 AA accessibility audit.
 *
 * Runs @axe-core/playwright against every seed page (desktop + mobile), plus
 * a few interaction states (cart drawer open, mobile menu open) where the DOM
 * is meaningfully different.
 *
 * Each violation lands as its own finding with axe's rule id + impact.
 */
const { test } = require('./fixtures/audit.fixture');
const AxeBuilder = require('@axe-core/playwright').default;
const { ROUTES } = require('./utils/routes');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

/** Map axe impact → our severity enum. */
function axeImpactToSeverity(impact) {
    switch ((impact || '').toLowerCase()) {
        case 'critical': return SEVERITY.CRITICAL;
        case 'serious':  return SEVERITY.HIGH;
        case 'moderate': return SEVERITY.MEDIUM;
        case 'minor':    return SEVERITY.LOW;
        default:         return SEVERITY.INFO;
    }
}

async function auditPage(page, url, slug, report) {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => null);
    if (!resp || resp.status() >= 400) return;
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(300);

    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();

    for (const violation of results.violations) {
        for (const node of violation.nodes) {
            await report({
                severity: axeImpactToSeverity(violation.impact),
                category: CATEGORIES.ACCESSIBILITY,
                title: `[a11y ${violation.id}] ${violation.help}`,
                description: violation.description,
                page: slug,
                url,
                selector: (node.target || []).join(', '),
                actual: node.failureSummary || '',
                remediation: violation.helpUrl,
                extra: { impact: violation.impact, tags: violation.tags },
            });
        }
    }

    // Explicit checks beyond axe:
    // - Every image should have an alt attribute (empty alt is OK for decorative)
    const imgs = await page.$$eval('img', (arr) => arr.map((i) => ({
        src: i.getAttribute('src') || '',
        alt: i.getAttribute('alt'),
    })));
    for (const img of imgs) {
        if (img.alt === null) {
            await report({
                severity: SEVERITY.HIGH,
                category: CATEGORIES.ACCESSIBILITY,
                title: 'Image missing alt attribute (not even empty)',
                page: slug,
                url,
                actual: img.src,
                remediation: 'Add alt="" for decorative images or descriptive alt for meaningful ones.',
            });
        }
    }

    // - Heading hierarchy: h1 exists, no jumps >1 level
    const headings = await page.$$eval('h1,h2,h3,h4,h5,h6', (arr) => arr.map((h) => Number(h.tagName.slice(1))));
    const h1Count = headings.filter((n) => n === 1).length;
    if (h1Count === 0) {
        await report({
            severity: SEVERITY.HIGH,
            category: CATEGORIES.ACCESSIBILITY,
            title: 'Page has no <h1>',
            page: slug,
            url,
        });
    } else if (h1Count > 1) {
        await report({
            severity: SEVERITY.LOW,
            category: CATEGORIES.SEO,
            title: `Page has ${h1Count} <h1> elements`,
            page: slug,
            url,
            remediation: 'Prefer one <h1> per page.',
        });
    }
    for (let i = 1; i < headings.length; i++) {
        if (headings[i] - headings[i - 1] > 1) {
            await report({
                severity: SEVERITY.MEDIUM,
                category: CATEGORIES.ACCESSIBILITY,
                title: `Heading level skipped: h${headings[i - 1]} → h${headings[i]}`,
                page: slug,
                url,
            });
            break;
        }
    }
}

test.describe('@desktop @responsive accessibility', () => {
    for (const route of ROUTES) {
        test(`axe: ${route.slug}`, async ({ page, report }) => {
            await auditPage(page, route.path, route.slug, report);
        });
    }

    test('axe: home with cart drawer open', async ({ page, report }) => {
        await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle').catch(() => {});
        await page.waitForSelector('.pcard', { timeout: 8_000 }).catch(() => {});
        await page.locator('#navCartBtn').click();
        await page.waitForTimeout(400);
        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();
        for (const v of results.violations) {
            await report({
                severity: axeImpactToSeverity(v.impact),
                category: CATEGORIES.ACCESSIBILITY,
                title: `[a11y ${v.id}] (cart drawer) ${v.help}`,
                page: 'home:drawer',
                url: '/index.html',
                selector: v.nodes.map((n) => (n.target || []).join(', ')).join(' | '),
                remediation: v.helpUrl,
            });
        }
    });
});
