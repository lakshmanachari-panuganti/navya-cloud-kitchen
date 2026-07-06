// @ts-check
/* eslint-env node */
/**
 * Central "finding" model + writer.
 *
 * Every spec in this suite reports issues through `recordFinding()` instead of
 * throwing raw assertion errors. That gives us:
 *   1. A single JSON record per issue (severity, location, evidence, etc.).
 *   2. A stable format for the aggregator (99-report.spec.js) to consume.
 *   3. The ability to keep collecting issues on a page instead of stopping at
 *      the first failure — which is exactly what a devil's-advocate audit
 *      needs (max defect discovery, not fast-fail).
 *
 * Findings are written under tests/audit-report/findings/<uuid>.json.
 * Attachments (screenshots, logs) are written to tests/audit-report/evidence/.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPORT_ROOT = path.join(__dirname, '..', '..', 'audit-report');
const FINDINGS_DIR = path.join(REPORT_ROOT, 'findings');
const EVIDENCE_DIR = path.join(REPORT_ROOT, 'evidence');

for (const dir of [REPORT_ROOT, FINDINGS_DIR, EVIDENCE_DIR]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const SEVERITY = Object.freeze({
    CRITICAL: 'critical',
    HIGH:     'high',
    MEDIUM:   'medium',
    LOW:      'low',
    INFO:     'info',
});

const CATEGORIES = Object.freeze({
    FUNCTIONAL:      'functional',
    NEGATIVE_INPUT:  'negative-input',
    ACCESSIBILITY:   'accessibility',
    CONSOLE:         'console',
    NETWORK:         'network',
    PERFORMANCE:     'performance',
    SEO:             'seo',
    LINK:            'link-integrity',
    IMAGE:           'image',
    CONTENT:         'content',
    SECURITY:        'security',
    VISUAL:          'visual-regression',
    RESPONSIVE:      'responsive',
    BROWSER_COMPAT:  'browser-compatibility',
    UX:              'ux',
});

/**
 * Persist a single finding.
 *
 * @param {object} finding
 * @param {string} finding.severity  one of SEVERITY.*
 * @param {string} finding.category  one of CATEGORIES.*
 * @param {string} finding.title     short, action-oriented headline
 * @param {string} [finding.description] more detail if the title isn't enough
 * @param {string} [finding.page]    logical page slug (e.g. "home", "products/kandi-podi")
 * @param {string} [finding.url]     absolute or path URL that triggered it
 * @param {string} [finding.selector] DOM selector when relevant
 * @param {string} [finding.expected]
 * @param {string} [finding.actual]
 * @param {string} [finding.remediation] concrete fix suggestion
 * @param {string[]} [finding.steps]  reproduction steps
 * @param {string} [finding.browser]  chromium|firefox|webkit
 * @param {string} [finding.device]   desktop|mobile-chrome|iphone|etc.
 * @param {string} [finding.spec]     which spec/test caught it
 * @param {string[]} [finding.evidence] file paths on disk (screenshots, logs)
 * @param {object} [finding.extra]   free-form structured data
 */
function recordFinding(finding) {
    const id = crypto.randomBytes(6).toString('hex');
    const record = {
        id,
        timestamp: new Date().toISOString(),
        severity: finding.severity || SEVERITY.MEDIUM,
        category: finding.category || 'unknown',
        title: finding.title || 'Untitled finding',
        description: finding.description || '',
        page: finding.page || '',
        url: finding.url || '',
        selector: finding.selector || '',
        expected: finding.expected || '',
        actual: finding.actual || '',
        remediation: finding.remediation || '',
        steps: Array.isArray(finding.steps) ? finding.steps : [],
        browser: finding.browser || '',
        device: finding.device || '',
        spec: finding.spec || '',
        evidence: Array.isArray(finding.evidence) ? finding.evidence : [],
        extra: finding.extra || null,
    };
    const filePath = path.join(FINDINGS_DIR, `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(record, null, 2), 'utf8');
    return record;
}

/**
 * Save a screenshot as evidence and return its relative path.
 * Playwright's page.screenshot returns a Buffer when no path is given.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} label - human label used in the filename
 */
async function captureEvidence(page, label) {
    const slug = label.replace(/[^a-z0-9-]+/gi, '_').slice(0, 80);
    const filename = `${Date.now()}_${slug}.png`;
    const abs = path.join(EVIDENCE_DIR, filename);
    try {
        await page.screenshot({ path: abs, fullPage: false, animations: 'disabled' });
        return path.relative(REPORT_ROOT, abs).replace(/\\/g, '/');
    } catch {
        return '';
    }
}

/** Convenience: build a testInfo → {browser, device, spec} triple. */
function contextFrom(testInfo) {
    return {
        browser: (testInfo.project.use && testInfo.project.use.defaultBrowserType) || testInfo.project.name.split('-')[0],
        device: testInfo.project.name,
        spec: testInfo.titlePath.slice(1).join(' › '),
    };
}

module.exports = {
    SEVERITY,
    CATEGORIES,
    recordFinding,
    captureEvidence,
    contextFrom,
    REPORT_ROOT,
    FINDINGS_DIR,
    EVIDENCE_DIR,
};
