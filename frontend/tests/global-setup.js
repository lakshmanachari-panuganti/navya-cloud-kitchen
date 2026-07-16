// @ts-check
/* eslint-env node */
/**
 * Playwright global setup — downloads Google Fonts once and caches them in
 * tests/fonts/ so every test run serves fonts from localhost instead of the
 * CDN.  If the network request fails the cache is simply left empty and the
 * browser falls back to fonts.googleapis.com transparently.
 *
 * Re-run manually to refresh the cache:
 *   node tests/global-setup.js
 * or via the npm script:
 *   npm run fonts:download
 */
const fs   = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const FONTS_DIR = path.join(__dirname, 'fonts');

/** Exact URL from index.html <link> */
const GOOGLE_FONTS_URL =
    'https://fonts.googleapis.com/css2' +
    '?family=Fraunces:opsz,wght,SOFT@9..144,400..800,0..100' +
    '&family=Inter:wght@400;500;600' +
    '&family=Noto+Sans+Telugu:wght@400;600' +
    '&display=swap';

/** Modern Chrome UA → Google Fonts returns woff2 */
const UA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
    'Chrome/125.0.0.0 Safari/537.36';

/**
 * GET a URL (follows one level of redirect), returns a Buffer.
 * @param {string} url
 * @returns {Promise<Buffer>}
 */
function fetchBuf(url) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(url);
        https
            .get(
                {
                    hostname: parsed.hostname,
                    path: parsed.pathname + parsed.search,
                    headers: { 'User-Agent': UA },
                },
                (res) => {
                    if (
                        res.statusCode >= 300 &&
                        res.statusCode < 400 &&
                        res.headers.location
                    ) {
                        res.resume();
                        resolve(fetchBuf(res.headers.location));
                        return;
                    }
                    const chunks = [];
                    res.on('data', (c) => chunks.push(c));
                    res.on('end', () => resolve(Buffer.concat(chunks)));
                    res.on('error', reject);
                },
            )
            .on('error', reject);
    });
}

/**
 * Download Google Fonts files into tests/fonts/ and write a url-map.json
 * so that font-routes.js can intercept CDN requests and serve them locally.
 */
async function downloadFonts() {
    const cssPath = path.join(FONTS_DIR, 'fonts.css');
    const mapPath = path.join(FONTS_DIR, 'url-map.json');

    if (fs.existsSync(cssPath) && fs.existsSync(mapPath)) {
        console.log('[font-setup] Fonts already cached — skipping download.');
        return;
    }

    console.log('[font-setup] Downloading Google Fonts…');
    fs.mkdirSync(FONTS_DIR, { recursive: true });

    let css;
    try {
        css = (await fetchBuf(GOOGLE_FONTS_URL)).toString('utf8');
    } catch (err) {
        console.warn(
            '[font-setup] Could not fetch Google Fonts CSS — tests will use CDN.',
            err.message,
        );
        return;
    }

    // Collect every fonts.gstatic.com URL referenced in the CSS
    const fontUrls = [
        ...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g),
    ].map((m) => m[1]);

    const urlMap = {};
    for (const fontUrl of fontUrls) {
        const filename =
            crypto.createHash('md5').update(fontUrl).digest('hex').slice(0, 16) +
            '.woff2';
        const localPath = path.join(FONTS_DIR, filename);
        if (!fs.existsSync(localPath)) {
            try {
                fs.writeFileSync(localPath, await fetchBuf(fontUrl));
            } catch (err) {
                console.warn('[font-setup] Failed to download', fontUrl, err.message);
                continue;
            }
        }
        urlMap[fontUrl] = filename;
    }

    fs.writeFileSync(mapPath, JSON.stringify(urlMap, null, 2));
    fs.writeFileSync(cssPath, css);
    console.log(
        `[font-setup] Cached ${Object.keys(urlMap).length} font files to tests/fonts/.`,
    );
}

module.exports = downloadFonts;

// Allow direct invocation: node tests/global-setup.js
if (require.main === module) {
    downloadFonts().catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
