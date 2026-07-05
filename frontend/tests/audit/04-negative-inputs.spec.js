// @ts-check
/* eslint-env node */
/**
 * Negative-input / input-fuzzing audit.
 *
 * Feeds every checkout form field a battery of hostile payloads and verifies:
 *   - the app never navigates to a success screen when required data is invalid
 *   - the payload is never reflected raw into the DOM (no innerHTML injection)
 *   - the console stays clean (no uncaught errors from parsing the payload)
 */
const { test } = require('./fixtures/audit.fixture');
const { SEVERITY, CATEGORIES } = require('./utils/findings');

const HOSTILE_PAYLOADS = [
    { label: 'empty',              value: '' },
    { label: 'whitespace-only',    value: '     ' },
    { label: 'null-literal',       value: 'null' },
    { label: 'undefined-literal',  value: 'undefined' },
    { label: 'sql-injection',      value: "' OR '1'='1" },
    { label: 'sql-drop',           value: '"; DROP TABLE users; --' },
    { label: 'html-tag',           value: '<h1>Injected</h1>' },
    { label: 'script-tag',         value: '<script>window.__pwn = true</script>' },
    { label: 'onerror-img',        value: '<img src=x onerror="window.__pwn=true">' },
    { label: 'unicode',            value: '🌶️🥘🇮🇳你好नमस्ते' },
    { label: 'emoji-only',         value: '🌶️'.repeat(400) },
    { label: 'long-string',        value: 'A'.repeat(5000) },
    { label: 'newline-injection',  value: 'foo\r\nBcc: attacker@example.com' },
    { label: 'path-traversal',     value: '../../etc/passwd' },
    { label: 'template-injection', value: '${constructor.constructor("return process")()}' },
];

test.describe('@desktop @cross negative input — checkout', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle').catch(() => {});
        await page.waitForSelector('.pcard', { state: 'attached', timeout: 8_000 }).catch(() => {});
        await page.locator('.pcard .pcard-cta').first().click();
        await page.locator('#viewCartBtn').click();
        await page.waitForTimeout(300);
    });

    for (const payload of HOSTILE_PAYLOADS) {
        test(`payload "${payload.label}" is handled gracefully`, async ({ page, report, consoleLog }) => {
            const before = consoleLog.errors.length;

            await page.fill('#custName', payload.value);
            await page.fill('#custPhone', payload.value);
            await page.fill('#custAddress', payload.value);
            await page.click('#payBtn');
            await page.waitForTimeout(250);

            const successVisible = await page.locator('#successScreen').isVisible();

            // "empty" and any obviously-invalid payload MUST be rejected
            const shouldBeRejected = !/^[6-9]\d{9}$/.test(payload.value) || !payload.value.trim();
            if (shouldBeRejected && successVisible) {
                await report({
                    severity: SEVERITY.HIGH,
                    category: CATEGORIES.NEGATIVE_INPUT,
                    title: `Checkout accepted invalid payload ("${payload.label}")`,
                    page: 'home',
                    actual: `Success screen visible for value=${JSON.stringify(payload.value).slice(0, 200)}`,
                    remediation: 'Validate name/phone/address on submit; do not proceed if invalid.',
                });
            }

            // Check that no reflection has happened — the payload should never leak into innerHTML
            // (for HTML/script payloads specifically).
            const reflected = await page.evaluate((v) => {
                return document.body.innerHTML.includes(v) && (v.includes('<') || v.includes('>'));
            }, payload.value);
            if (reflected && /<script|onerror/i.test(payload.value)) {
                await report({
                    severity: SEVERITY.CRITICAL,
                    category: CATEGORIES.SECURITY,
                    title: `Hostile input reflected into DOM: "${payload.label}"`,
                    page: 'home',
                    actual: `payload=${JSON.stringify(payload.value).slice(0, 200)} appeared inside document.body innerHTML`,
                    remediation: 'Use textContent instead of innerHTML for user-supplied strings.',
                });
            }
            // Check whether the injection actually executed
            const pwned = await page.evaluate(() => Boolean(window.__pwn));
            if (pwned) {
                await report({
                    severity: SEVERITY.CRITICAL,
                    category: CATEGORIES.SECURITY,
                    title: `Injected script executed for payload "${payload.label}"`,
                    page: 'home',
                });
            }

            const newErrors = consoleLog.errors.slice(before);
            if (newErrors.length) {
                await report({
                    severity: SEVERITY.MEDIUM,
                    category: CATEGORIES.CONSOLE,
                    title: `Console error(s) while processing payload "${payload.label}"`,
                    page: 'home',
                    actual: newErrors.join('\n').slice(0, 800),
                });
            }
        });
    }
});
