/**
 * copy-assets.js
 * Run this once: node copy-assets.js
 * Copies all AI-generated images from the brain folder into the project /images folder
 * so they are included in deployment to Azure Static Web Apps.
 */
const fs = require('fs');
const path = require('path');

const SRC = `C:\\Users\\E092721\\.gemini\\antigravity\\brain\\4cc002e7-42a8-4f85-93d6-dac719940557`;
const DEST = path.join(__dirname, 'images');

if (!fs.existsSync(DEST)) fs.mkdirSync(DEST);

const assets = [
    // Hero image
    { src: 'navyas_hero_banner_1780838693861.png',        dest: 'hero.png' },
    // Logo
    { src: 'navyas_kitchen_logo_1780835858832.png',       dest: 'logo.png' },
    // Product images
    { src: 'moringa_podi_1780837049362.png',              dest: 'moringa_podi.png' },
    { src: 'curry_leaves_podi_1780837004093.png',         dest: 'curry_leaves_podi.png' },
    { src: 'kandi_podi_1780837030018.png',                dest: 'kandi_podi.png' },
    { src: 'sunni_undalu_1780837017678.png',              dest: 'sunni_undalu.png' },
    { src: 'palli_chikki_1780837062371.png',              dest: 'palli_chikki.png' },
    { src: 'flaxseed_garlic_podi_1780839254078.png',      dest: 'flaxseed_garlic_podi.png' },
    { src: 'vellulli_karampodi_1780839267768.png',        dest: 'vellulli_karampodi.png' },
    { src: 'nuvvula_podi_1780839280961.png',              dest: 'nuvvula_podi.png' },
    { src: 'nuvvula_undalu_1780839294373.png',            dest: 'nuvvula_undalu.png' },
];

let ok = 0, fail = 0;
assets.forEach(({ src, dest }) => {
    try {
        fs.copyFileSync(path.join(SRC, src), path.join(DEST, dest));
        console.log(`✅  Copied → images/${dest}`);
        ok++;
    } catch (e) {
        console.error(`❌  Failed  → images/${dest} (${e.message})`);
        fail++;
    }
});

console.log(`\nDone: ${ok} copied, ${fail} failed.`);
console.log(`\nImages saved to: ${DEST}`);
