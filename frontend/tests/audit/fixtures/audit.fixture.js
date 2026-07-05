// @ts-check
/* eslint-env node */
/**
 * Playwright fixture that wraps every audit spec with two things:
 *
 *   1. Console + pageerror + network capture attached before navigation, so
 *      no early request is missed.
 *   2. A `report()` helper bound to the current browser/device/spec context,
 *      so specs just call `report({ severity, category, title, ... })` without
 *      restating who they are.
 *
 * The captured lists are also exposed on the fixture so console/network specs
 * can inspect them at end-of-test.
 */
const base = require('@playwright/test');
const { recordFinding, captureEvidence, contextFrom } = require('../utils/findings');
const { setupFontRoutes } = require('../../utils/font-routes');

/**
 * @typedef {object} AuditFixtures
 * @property {(f: object) => Promise<object>} report
 * @property {(page: any, label: string) => Promise<string>} evidence
 * @property {{ errors: string[], warnings: string[], logs: string[] }} consoleLog
 * @property {Array<{ url: string, status: number, method: string, resourceType: string, failure: string|null, contentType: string, size: number, timing: number }>} networkLog
 */

exports.test = base.test.extend(/** @type {any} */({
    // Auto-use fixture: serves locally-cached Google Fonts for every test.
    _fontRoutes: [async ({ context }, use) => {
        await setupFontRoutes(context);
        await use();
    }, { auto: true }],

    consoleLog: async ({ page }, use) => {
        const consoleLog = { errors: [], warnings: [], logs: [] };
        page.on('console', (msg) => {
            const record = `[${msg.type()}] ${msg.text()}`;
            if (msg.type() === 'error') consoleLog.errors.push(record);
            else if (msg.type() === 'warning') consoleLog.warnings.push(record);
            else consoleLog.logs.push(record);
        });
        page.on('pageerror', (err) => {
            consoleLog.errors.push(`[pageerror] ${err.message}`);
        });
        await use(consoleLog);
    },

    networkLog: async ({ page }, use) => {
        const networkLog = [];
        const inflight = new Map();

        page.on('request', (req) => {
            inflight.set(req, { start: Date.now(), method: req.method(), url: req.url(), resourceType: req.resourceType() });
        });
        page.on('requestfailed', (req) => {
            const meta = inflight.get(req) || {};
            networkLog.push({
                url: req.url(),
                method: req.method(),
                resourceType: req.resourceType(),
                status: 0,
                contentType: '',
                size: 0,
                timing: meta.start ? Date.now() - meta.start : 0,
                failure: (req.failure() && req.failure().errorText) || 'failed',
            });
            inflight.delete(req);
        });
        page.on('response', async (res) => {
            const req = res.request();
            const meta = inflight.get(req) || {};
            let size = 0;
            try {
                const body = await res.body();
                size = body.length;
            } catch { /* body may not be retained */ }
            networkLog.push({
                url: res.url(),
                method: req.method(),
                resourceType: req.resourceType(),
                status: res.status(),
                contentType: res.headers()['content-type'] || '',
                size,
                timing: meta.start ? Date.now() - meta.start : 0,
                failure: null,
            });
            inflight.delete(req);
        });

        await use(networkLog);
    },

    report: async ({}, use, testInfo) => {
        const ctx = contextFrom(testInfo);
        /** @param {object} finding */
        const report = async (finding) => recordFinding({ ...ctx, ...finding });
        await use(report);
    },

    evidence: async ({}, use) => {
        await use(captureEvidence);
    },
}));

exports.expect = base.expect;
