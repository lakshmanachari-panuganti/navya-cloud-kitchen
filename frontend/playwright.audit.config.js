// @ts-check
/* eslint-env node */
/**
 * Production quality-gate audit configuration.
 *
 * This config is separate from `playwright.config.js` (which drives the
 * screenshot capture pipeline) so the two can evolve independently.
 *
 * Runs the entire tests/audit/ tree across:
 *   - Chromium desktop
 *   - Firefox desktop
 *   - WebKit desktop
 *   - Chromium tablet (iPad-sized)
 *   - Mobile Chrome (Pixel 7)
 *   - Mobile Safari (iPhone 13)
 *
 * A single serial `report` project runs last and aggregates every finding
 * dropped into tests/audit-report/findings/ into a single prioritized report.
 *
 * Output tree: tests/audit-report/
 */
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'tests', 'audit-report');
const IS_CI = !!process.env.CI;
const BASE_URL = process.env.AUDIT_BASE_URL || 'http://localhost:8123';

/** Common `use` block shared across every browser project. */
const commonUse = {
    baseURL: BASE_URL,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: IS_CI ? 'retain-on-failure' : 'off',
    trace: 'retain-on-failure',
    // Every finding is expected to persist a screenshot, so keep the browser
    // in a deterministic state (no locale surprises, no motion).
    locale: 'en-IN',
    timezoneId: 'Asia/Kolkata',
    colorScheme: 'light',
    reducedMotion: 'reduce',
    ignoreHTTPSErrors: true,
    launchOptions: {
        args: ['--disable-blink-features=AutomationControlled'],
    },
};

module.exports = defineConfig({
    globalSetup: './tests/global-setup.js',
    testDir: './tests/audit',
    testMatch: /.*\.spec\.js$/,
    fullyParallel: true,
    forbidOnly: IS_CI,
    retries: 0,
    // Deliberately limited to keep console/network capture ordering deterministic
    workers: IS_CI ? 2 : 4,
    timeout: 60_000,
    expect: { timeout: 10_000 },

    outputDir: path.join(OUTPUT_DIR, 'artifacts'),
    reporter: [
        ['list'],
        ['html', { outputFolder: path.join(OUTPUT_DIR, 'html'), open: 'never' }],
        ['json', { outputFile: path.join(OUTPUT_DIR, 'results.json') }],
        ['junit', { outputFile: path.join(OUTPUT_DIR, 'junit.xml') }],
    ],

    projects: [
        // ── Desktop matrix (cross-browser) ───────────────────────────
        {
            name: 'chromium-desktop',
            grep: /@desktop|@cross|@all/,
            grepInvert: /@report/,
            use: {
                ...devices['Desktop Chrome'],
                ...commonUse,
                viewport: { width: 1440, height: 900 },
            },
        },
        {
            name: 'firefox-desktop',
            grep: /@cross|@all/,
            grepInvert: /@report|@chromium-only/,
            use: {
                ...devices['Desktop Firefox'],
                ...commonUse,
                viewport: { width: 1440, height: 900 },
            },
        },
        {
            name: 'webkit-desktop',
            grep: /@cross|@all/,
            grepInvert: /@report|@chromium-only/,
            use: {
                ...devices['Desktop Safari'],
                ...commonUse,
                viewport: { width: 1440, height: 900 },
            },
        },

        // ── Responsive matrix ────────────────────────────────────────
        {
            name: 'tablet',
            grep: /@responsive|@all/,
            grepInvert: /@report/,
            use: {
                ...devices['iPad (gen 7)'],
                ...commonUse,
            },
        },
        {
            name: 'mobile-chrome',
            grep: /@mobile|@responsive|@all/,
            grepInvert: /@report/,
            use: {
                ...devices['Pixel 7'],
                ...commonUse,
            },
        },
        {
            name: 'mobile-safari',
            grep: /@mobile|@responsive|@all/,
            grepInvert: /@report/,
            use: {
                ...devices['iPhone 13'],
                ...commonUse,
            },
        },

        // ── Aggregator: runs *after* every browser project, single worker ──
        {
            name: 'report',
            grep: /@report/,
            testMatch: /99-.*\.spec\.js$/,
            fullyParallel: false,
            dependencies: [
                'chromium-desktop',
                'firefox-desktop',
                'webkit-desktop',
                'tablet',
                'mobile-chrome',
                'mobile-safari',
            ],
            use: {
                ...devices['Desktop Chrome'],
                ...commonUse,
            },
        },
    ],

    webServer: {
        command: 'npx http-server . -p 8123 --silent -c-1',
        url: 'http://localhost:8123/index.html',
        reuseExistingServer: !IS_CI,
        timeout: 30_000,
        stdout: 'ignore',
        stderr: 'pipe',
    },
});
