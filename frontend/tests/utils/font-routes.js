// @ts-check
/* eslint-env node */
/**
 * Browser-context route helpers that serve locally-cached Google Fonts instead
 * of hitting the CDN on every test run.
 *
 * Usage — call once per BrowserContext before navigating:
 *   const { setupFontRoutes } = require('./font-routes');
 *   await setupFontRoutes(context);
 *
 * If the font cache hasn't been populated yet (global-setup hasn't run or
 * failed) the function exits silently and the browser falls back to the CDN.
 */
const fs   = require('fs');
const path = require('path');

const FONTS_DIR = path.join(__dirname, '..', 'fonts');

// Module-level cache so the files are read only once per worker process
let _css    = null;
let _urlMap = null;
let _loaded = false;

function loadCache() {
    if (_loaded) return _css !== null;
    _loaded = true;

    const cssPath = path.join(FONTS_DIR, 'fonts.css');
    const mapPath = path.join(FONTS_DIR, 'url-map.json');
    if (!fs.existsSync(cssPath) || !fs.existsSync(mapPath)) return false;

    _css    = fs.readFileSync(cssPath);
    _urlMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
    return true;
}

/**
 * Register context-level routes that serve locally-cached Google Fonts.
 * Falls back silently to the CDN when no cache is present.
 *
 * @param {import('@playwright/test').BrowserContext} context
 */
async function setupFontRoutes(context) {
    if (!loadCache()) return;

    // Serve the cached CSS for any fonts.googleapis.com request
    await context.route('https://fonts.googleapis.com/**', (route) => {
        route.fulfill({
            status: 200,
            headers: {
                'content-type': 'text/css; charset=utf-8',
                'access-control-allow-origin': '*',
            },
            body: _css,
        });
    });

    // Serve individual woff2 files from the local cache
    await context.route('https://fonts.gstatic.com/**', (route) => {
        const filename = _urlMap[route.request().url()];
        const fontPath = filename && path.join(FONTS_DIR, filename);
        if (fontPath && fs.existsSync(fontPath)) {
            route.fulfill({
                status: 200,
                headers: {
                    'content-type': 'font/woff2',
                    'access-control-allow-origin': '*',
                },
                body: fs.readFileSync(fontPath),
            });
        } else {
            route.continue();
        }
    });
}

module.exports = { setupFontRoutes };
