# Devil's-advocate audit suite

This is a production quality gate, not a smoke test. Every spec assumes the
application is broken and tries to prove otherwise.

## Layout

```
tests/audit/
├── fixtures/
│   └── audit.fixture.js         Playwright fixture: console+network capture, report()
├── utils/
│   ├── findings.js              Finding model, severity enum, JSON writer, evidence
│   └── routes.js                Seed routes + BFS crawler for hidden pages
├── 01-crawl.spec.js             Route discovery + status probing
├── 02-functional.spec.js        Menu, cart, filter, drawer, nav
├── 03-cart-checkout.spec.js     Full checkout, form validation, race conditions
├── 04-negative-inputs.spec.js   XSS / SQL / unicode / long-string fuzz
├── 05-accessibility.spec.js     axe-core WCAG 2.1 AA + heading/lang/alt checks
├── 06-console-network.spec.js   Console errors, request failures, oversized assets
├── 07-performance.spec.js       Core Web Vitals + render-blocking resource checks
├── 08-seo-meta.spec.js          Titles, descriptions, OG/Twitter, canonical, JSON-LD
├── 09-link-integrity.spec.js    HEAD-check every link, fragment target existence
├── 10-images.spec.js            Broken images, missing alt, oversized natural size
├── 11-content.spec.js           Placeholders, lorem ipsum, TODO, path leaks
├── 12-security-headers.spec.js  CSP/HSTS/X-Frame + secret-pattern scan + swa config
├── 13-visual-responsive.spec.js Pixel-diff regression + overflow + touch targets
└── 99-report.spec.js            Aggregator — writes AUDIT_REPORT.md + fails on Sev-1
```

## Running

```bash
# Full sweep across every browser + device project (slow, thorough)
npm run audit

# Fast Chromium-only pass (still runs the aggregator quality gate)
npm run audit:chromium

# Re-generate the AUDIT_REPORT.md from an existing findings/ dir
npm run audit:report

# Blow away all prior state (findings, evidence, baselines, diffs)
npm run audit:clean

# Also fail the pipeline on HIGH-severity findings
AUDIT_STRICT=1 npm run audit
```

## Where to look after a run

- `tests/audit-report/AUDIT_REPORT.md`   — human-readable, severity-ordered
- `tests/audit-report/summary.json`      — machine-readable roll-up
- `tests/audit-report/findings/*.json`   — one file per finding, with evidence refs
- `tests/audit-report/evidence/*.png`    — screenshots referenced by findings
- `tests/audit-report/html/`             — Playwright HTML report
- `tests/audit-report/visual/`           — current-run screenshots
- `tests/audit-report/baseline/`         — visual-regression baselines
- `tests/audit-report/visual-diff/`      — diff PNGs where drift > 0.5%

## Extending

Every spec should:

1. Import `{ test }` from `./fixtures/audit.fixture` (not `@playwright/test`).
2. Call `await report({ severity, category, title, ... })` for each defect
   instead of throwing — the goal is *max discovery*, not fast-fail.
3. Attach a screenshot via `await evidence(page, 'short-label')` when the
   finding is a visible UI defect.
4. Tag its describe/test with `@desktop`, `@mobile`, `@responsive`, `@cross`,
   or `@chromium-only` so the project matrix filters correctly.

## Quality gate

The `report` project runs last and **fails the pipeline** if any CRITICAL
finding was recorded. Set `AUDIT_STRICT=1` to also fail on HIGH.
