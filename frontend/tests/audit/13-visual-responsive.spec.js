// @ts-check
/* eslint-env node */
/**
 * Visual + responsive audit.
 *
 * For every seed page + every viewport project (mobile, tablet, desktop, cross
 * browsers):
 *   - Capture a full-page screenshot into tests/audit-report/visual/<project>/<slug>.png
 *   - Compare against a baseline stored in tests/audit-report/baseline/<project>/…
 *     If no baseline exists, the current run becomes the baseline (first-run
 *     bootstrap). Subsequent runs raise a MEDIUM finding when pixel-diff exceeds
 *     0.5% of the frame.
 *   - Detect horizontal overflow (document.scrollingElement.scrollWidth >
 *     window.innerWidth) — often a sign of a rogue container.
 *   - Detect any fixed-position element that exceeds the viewport width.
 */
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const { test } = require('./fixtures/audit.fixture');
const { ROUTES } = require('./utils/routes');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

const REPORT_ROOT = path.join(__dirname, '..', 'audit-report');
const VISUAL_DIR = path.join(REPORT_ROOT, 'visual');
const BASELINE_DIR = path.join(REPORT_ROOT, 'baseline');
const DIFF_DIR = path.join(REPORT_ROOT, 'visual-diff');

for (const d of [VISUAL_DIR, BASELINE_DIR, DIFF_DIR]) {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function ensureDir(p) { const dir = path.dirname(p); if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }

test.describe('@responsive visual regression + overflow', () => {
    for (const route of ROUTES) {
        test(`visual: ${route.slug}`, async ({ page, report, evidence }, testInfo) => {
            const project = testInfo.project.name;
            const resp = await page.goto(route.path, { waitUntil: 'domcontentloaded' }).catch(() => null);
            if (!resp || resp.status() >= 400) return;
            await page.waitForLoadState('networkidle').catch(() => {});
            await page.evaluate(() => {
                document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
            });
            await page.waitForTimeout(500);

            const shotPath = path.join(VISUAL_DIR, project, `${route.slug}.png`);
            ensureDir(shotPath);
            const buf = await page.screenshot({ fullPage: true, animations: 'disabled', path: shotPath });

            // Baseline compare
            const baselinePath = path.join(BASELINE_DIR, project, `${route.slug}.png`);
            if (!fs.existsSync(baselinePath)) {
                ensureDir(baselinePath);
                fs.copyFileSync(shotPath, baselinePath);
            } else {
                try {
                    const current = PNG.sync.read(buf);
                    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
                    if (current.width === baseline.width && current.height === baseline.height) {
                        const diff = new PNG({ width: current.width, height: current.height });
                        const mismatched = pixelmatch(current.data, baseline.data, diff.data, current.width, current.height, { threshold: 0.15 });
                        const totalPx = current.width * current.height;
                        const pct = (mismatched / totalPx) * 100;
                        if (pct > 0.5) {
                            const diffPath = path.join(DIFF_DIR, project, `${route.slug}.png`);
                            ensureDir(diffPath);
                            fs.writeFileSync(diffPath, PNG.sync.write(diff));
                            await report({
                                severity: SEVERITY.MEDIUM,
                                category: CATEGORIES.VISUAL,
                                title: `Visual regression: ${pct.toFixed(2)}% pixel drift`,
                                page: route.slug,
                                url: route.path,
                                actual: `${mismatched} pixels differ`,
                                evidence: [
                                    path.relative(REPORT_ROOT, shotPath).replace(/\\/g, '/'),
                                    path.relative(REPORT_ROOT, baselinePath).replace(/\\/g, '/'),
                                    path.relative(REPORT_ROOT, diffPath).replace(/\\/g, '/'),
                                ],
                            });
                        }
                    } else {
                        await report({
                            severity: SEVERITY.LOW,
                            category: CATEGORIES.VISUAL,
                            title: `Viewport dimensions changed vs baseline (${baseline.width}×${baseline.height} → ${current.width}×${current.height})`,
                            page: route.slug,
                            url: route.path,
                            remediation: 'Delete tests/audit-report/baseline/ to re-snapshot if intentional.',
                        });
                    }
                } catch (err) {
                    await report({
                        severity: SEVERITY.INFO,
                        category: CATEGORIES.VISUAL,
                        title: `Pixel diff skipped: ${(err && err.message) || err}`,
                        page: route.slug,
                    });
                }
            }

            // Horizontal overflow — often the actual "mobile broken" bug
            const overflow = await page.evaluate(() => ({
                scrollWidth: document.documentElement.scrollWidth,
                clientWidth: document.documentElement.clientWidth,
            }));
            if (overflow.scrollWidth > overflow.clientWidth + 1) {
                const screenshot = await evidence(page, `overflow-${project}-${route.slug}`);
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.RESPONSIVE,
                    title: `Horizontal overflow (scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth})`,
                    page: route.slug,
                    url: route.path,
                    evidence: [screenshot],
                });
            }

            // Fixed elements wider than the viewport (sticky bar/cart drawer clipping)
            const wideFixed = await page.evaluate(() => {
                const bad = [];
                for (const el of document.querySelectorAll('body *')) {
                    const cs = getComputedStyle(el);
                    if (cs.position === 'fixed' || cs.position === 'sticky') {
                        const rect = el.getBoundingClientRect();
                        if (rect.width > window.innerWidth + 1) {
                            bad.push({ tag: el.tagName, id: el.id, cls: el.className, w: rect.width, vw: window.innerWidth });
                        }
                    }
                }
                return bad.slice(0, 20);
            });
            for (const b of wideFixed) {
                await report({
                    severity: SEVERITY.MEDIUM,
                    category: CATEGORIES.RESPONSIVE,
                    title: `Fixed/sticky element wider than viewport: ${b.tag}${b.id ? '#' + b.id : ''}`,
                    page: route.slug,
                    url: route.path,
                    actual: `element=${Math.round(b.w)}px, viewport=${b.vw}px`,
                });
            }

            // Small-tap-target check for mobile projects
            if (project.startsWith('mobile')) {
                const small = await page.evaluate(() => {
                    const bad = [];
                    for (const el of document.querySelectorAll('a, button')) {
                        if (el.offsetParent === null) continue;
                        const r = el.getBoundingClientRect();
                        if (r.width < 32 || r.height < 32) {
                            bad.push({ tag: el.tagName, id: el.id, cls: (el.className || '').toString().slice(0, 60), w: r.width, h: r.height });
                        }
                    }
                    return bad.slice(0, 30);
                });
                for (const s of small) {
                    await report({
                        severity: SEVERITY.LOW,
                        category: CATEGORIES.ACCESSIBILITY,
                        title: `Touch target below 32×32 on mobile: ${s.tag}`,
                        page: route.slug,
                        url: route.path,
                        selector: `${s.tag.toLowerCase()}${s.id ? '#' + s.id : ''}`,
                        actual: `${Math.round(s.w)}×${Math.round(s.h)}`,
                    });
                }
            }
        });
    }
});
