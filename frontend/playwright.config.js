// @ts-check
/* eslint-env node */
/**
 * Playwright configuration for Navya Cloud Kitchen.
 *
 * Powers `npm run screenshots` — captures full-page screenshots of every
 * primary route in both desktop and mobile viewports. Playwright manages
 * the static preview server automatically (via http-server on :8123).
 *
 * Output tree: tests/screenshots/{desktop,mobile}/...
 */
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    globalSetup: './tests/global-setup.js',
    testDir: './tests',
    // Only pick up the screenshot spec here. The audit suite has its own
    // config (playwright.audit.config.js) with a different reporter set.
    testMatch: /screenshots\.spec\.js$/,
    timeout: 90_000,
    expect: { timeout: 10_000 },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: [['list']],

    use: {
        baseURL: 'http://localhost:8123',
        actionTimeout: 15_000,
        navigationTimeout: 30_000,
        // Wait for network + images to settle before taking screenshots
        screenshot: 'off',
        video: 'off',
        trace: 'off',
    },

    projects: [
        {
            name: 'desktop',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1440, height: 900 },
                deviceScaleFactor: 1,
            },
        },
        {
            name: 'mobile',
            use: {
                // iPhone 13 metrics via Chromium — keeps a single browser install
                // in play while still exercising the mobile viewport/UA path.
                ...devices['iPhone 13'],
                defaultBrowserType: 'chromium',
                browserName: 'chromium',
            },
        },
    ],

    webServer: {
        command: 'npx http-server . -p 8123 --silent -c-1',
        url: 'http://localhost:8123/index.html',
        reuseExistingServer: !process.env.CI,
        timeout: 30_000,
        stdout: 'ignore',
        stderr: 'pipe',
    },
});
