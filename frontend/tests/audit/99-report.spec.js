// @ts-check
/* eslint-env node */
/**
 * Final aggregator — runs only in the `report` project after every browser
 * project has finished. Reads every JSON finding written under
 * tests/audit-report/findings/ and produces:
 *
 *   - tests/audit-report/summary.json  (machine-readable)
 *   - tests/audit-report/AUDIT_REPORT.md  (human-readable, ordered by severity)
 *
 * The test itself fails if any CRITICAL findings were recorded — this is what
 * makes the suite a real quality gate: the pipeline goes red on Sev-1 defects.
 *
 * Non-critical severities do NOT fail the pipeline by default. Set
 * AUDIT_STRICT=1 to also fail on HIGH.
 */
const fs = require('fs');
const path = require('path');
const { test, expect } = require('./fixtures/audit.fixture');

const REPORT_ROOT = path.join(__dirname, '..', 'audit-report');
const FINDINGS_DIR = path.join(REPORT_ROOT, 'findings');

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low', 'info'];
const SEVERITY_WEIGHT = { critical: 25, high: 10, medium: 3, low: 1, info: 0 };

test.describe('@report aggregate', () => {
    test('generate audit report and enforce quality gate', async () => {
        if (!fs.existsSync(FINDINGS_DIR)) {
            fs.mkdirSync(FINDINGS_DIR, { recursive: true });
        }
        const files = fs.readdirSync(FINDINGS_DIR).filter((f) => f.endsWith('.json'));
        /** @type {any[]} */
        const findings = [];
        for (const f of files) {
            try {
                findings.push(JSON.parse(fs.readFileSync(path.join(FINDINGS_DIR, f), 'utf8')));
            } catch { /* skip malformed */ }
        }

        // Group / count
        const bySeverity = Object.fromEntries(SEVERITY_ORDER.map((s) => [s, 0]));
        const byCategory = /** @type {Record<string, number>} */ ({});
        const byPage = /** @type {Record<string, number>} */ ({});
        const byBrowser = /** @type {Record<string, number>} */ ({});
        for (const f of findings) {
            bySeverity[f.severity] = (bySeverity[f.severity] || 0) + 1;
            byCategory[f.category] = (byCategory[f.category] || 0) + 1;
            if (f.page) byPage[f.page] = (byPage[f.page] || 0) + 1;
            if (f.device) byBrowser[f.device] = (byBrowser[f.device] || 0) + 1;
        }

        // Quality score: 100 minus severity-weighted deductions, floored at 0
        const deductions = SEVERITY_ORDER.reduce((acc, s) => acc + (bySeverity[s] * SEVERITY_WEIGHT[s]), 0);
        const score = Math.max(0, 100 - deductions);
        const strict = process.env.AUDIT_STRICT === '1';
        const status = bySeverity.critical > 0 || (strict && bySeverity.high > 0) ? 'FAIL' : 'PASS';

        const summary = {
            generatedAt: new Date().toISOString(),
            status,
            score,
            totals: bySeverity,
            byCategory,
            byPage,
            byBrowser,
            totalFindings: findings.length,
        };
        fs.writeFileSync(path.join(REPORT_ROOT, 'summary.json'), JSON.stringify(summary, null, 2), 'utf8');

        // Sort findings by severity (critical first), then category, then title
        findings.sort((a, b) => {
            const dv = SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity);
            if (dv) return dv;
            const dc = (a.category || '').localeCompare(b.category || '');
            if (dc) return dc;
            return (a.title || '').localeCompare(b.title || '');
        });

        // Human-readable markdown
        const lines = [];
        lines.push('# Navya Cloud Kitchen — Automated Audit Report');
        lines.push('');
        lines.push(`- **Generated:** ${summary.generatedAt}`);
        lines.push(`- **Status:** ${status === 'PASS' ? 'PASS' : 'FAIL'}`);
        lines.push(`- **Quality score:** ${score} / 100`);
        lines.push(`- **Total findings:** ${findings.length}`);
        lines.push('');
        lines.push('## Severity breakdown');
        lines.push('');
        lines.push('| Severity | Count |');
        lines.push('| --- | ---: |');
        for (const s of SEVERITY_ORDER) lines.push(`| ${s} | ${bySeverity[s] || 0} |`);
        lines.push('');
        lines.push('## Findings by category');
        lines.push('');
        lines.push('| Category | Count |');
        lines.push('| --- | ---: |');
        for (const [k, v] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
            lines.push(`| ${k} | ${v} |`);
        }
        lines.push('');
        lines.push('## Findings by page');
        lines.push('');
        lines.push('| Page | Count |');
        lines.push('| --- | ---: |');
        for (const [k, v] of Object.entries(byPage).sort((a, b) => b[1] - a[1])) {
            lines.push(`| ${k} | ${v} |`);
        }
        lines.push('');
        lines.push('## Detailed findings');
        lines.push('');
        for (const f of findings) {
            lines.push(`### [${(f.severity || '').toUpperCase()}] ${f.title}`);
            lines.push('');
            const meta = [];
            if (f.category) meta.push(`**Category:** ${f.category}`);
            if (f.page)     meta.push(`**Page:** ${f.page}`);
            if (f.url)      meta.push(`**URL:** ${f.url}`);
            if (f.device)   meta.push(`**Device:** ${f.device}`);
            if (f.browser)  meta.push(`**Browser:** ${f.browser}`);
            if (f.selector) meta.push(`**Selector:** \`${String(f.selector).slice(0, 200)}\``);
            if (meta.length) lines.push(meta.join('  \n'));
            if (f.description) { lines.push(''); lines.push(`> ${f.description}`); }
            if (f.expected) { lines.push(''); lines.push(`- **Expected:** ${f.expected}`); }
            if (f.actual) { lines.push(`- **Actual:** ${String(f.actual).slice(0, 500)}`); }
            if (f.remediation) { lines.push(`- **Remediation:** ${f.remediation}`); }
            if (Array.isArray(f.steps) && f.steps.length) {
                lines.push('');
                lines.push('**Steps to reproduce:**');
                for (const s of f.steps) lines.push(`1. ${s}`);
            }
            if (Array.isArray(f.evidence) && f.evidence.length) {
                lines.push('');
                lines.push('**Evidence:**');
                for (const e of f.evidence) lines.push(`- \`${e}\``);
            }
            lines.push('');
            lines.push('---');
            lines.push('');
        }
        fs.writeFileSync(path.join(REPORT_ROOT, 'AUDIT_REPORT.md'), lines.join('\n'), 'utf8');

        // Console summary
        // eslint-disable-next-line no-console
        console.log(`\n=== AUDIT ${status} — score ${score}/100 — findings: ${findings.length} ===`);
        for (const s of SEVERITY_ORDER) {
            // eslint-disable-next-line no-console
            console.log(`  ${s.padEnd(9)} ${bySeverity[s] || 0}`);
        }
        // eslint-disable-next-line no-console
        console.log(`\nFull report: ${path.relative(process.cwd(), path.join(REPORT_ROOT, 'AUDIT_REPORT.md'))}\n`);

        // Quality gate
        expect(bySeverity.critical, `${bySeverity.critical} CRITICAL finding(s) — see AUDIT_REPORT.md`).toBe(0);
        if (strict) {
            expect(bySeverity.high, `${bySeverity.high} HIGH finding(s) with AUDIT_STRICT=1 — see AUDIT_REPORT.md`).toBe(0);
        }
    });
});
