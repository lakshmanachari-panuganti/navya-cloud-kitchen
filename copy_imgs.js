const fs = require('fs');
const path = require('path');

const srcDir = `C:\\Users\\E092721\\.gemini\\antigravity\\brain\\4cc002e7-42a8-4f85-93d6-dac719940557`;
const destDir = `c:\\repos\\navyaskitchen\\images`;

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

const filesToCopy = [
    { src: 'curry_leaves_podi_1780837004093.png', dest: 'curry_leaves_podi.png' },
    { src: 'sunni_undalu_1780837017678.png', dest: 'sunni_undalu.png' },
    { src: 'kandi_podi_1780837030018.png', dest: 'kandi_podi.png' },
    { src: 'moringa_podi_1780837049362.png', dest: 'moringa_podi.png' },
    { src: 'palli_chikki_1780837062371.png', dest: 'palli_chikki.png' },
    { src: 'navyas_kitchen_logo_1780835858832.png', dest: 'logo.png' }
];

filesToCopy.forEach(file => {
    try {
        fs.copyFileSync(path.join(srcDir, file.src), path.join(destDir, file.dest));
        console.log(`Copied ${file.src} to ${file.dest}`);
    } catch (e) {
        console.error(`Failed to copy ${file.src}:`, e);
    }
});
