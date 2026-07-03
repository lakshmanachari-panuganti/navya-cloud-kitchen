/**
 * convert-to-webp.js
 * Converts all PNG images in the /images folder to WebP format.
 * 
 * Usage:
 *   npm install sharp
 *   node convert-to-webp.js
 */

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'images');
const QUALITY = 85; // WebP quality (0-100). 85 is a great balance of size vs quality.

// Images that benefit from lossless WebP (logos, icons with transparency/text)
const LOSSLESS_FILES = ['logo.png', 'nck-logo.png'];

async function convertToWebP() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('❌ sharp is not installed. Run: npm install sharp');
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGES_DIR).filter(f => f.endsWith('.png'));

  if (files.length === 0) {
    console.log('No PNG files found in /images directory.');
    return;
  }

  console.log(`\n🖼️  Found ${files.length} PNG files to convert...\n`);

  let totalSaved = 0;
  const results = [];

  for (const file of files) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputFile = file.replace('.png', '.webp');
    const outputPath = path.join(IMAGES_DIR, outputFile);

    const isLossless = LOSSLESS_FILES.includes(file);

    try {
      const inputStats = fs.statSync(inputPath);
      const inputSizeKB = (inputStats.size / 1024).toFixed(1);

      await sharp(inputPath)
        .webp({
          quality: isLossless ? 100 : QUALITY,
          lossless: isLossless,
          effort: 6, // Compression effort (0-6, higher = smaller file but slower)
        })
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const outputSizeKB = (outputStats.size / 1024).toFixed(1);
      const savings = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);
      const savedKB = ((inputStats.size - outputStats.size) / 1024).toFixed(1);

      totalSaved += inputStats.size - outputStats.size;

      results.push({ file, outputFile, inputSizeKB, outputSizeKB, savings, savedKB });
      console.log(`✅ ${file.padEnd(30)} ${inputSizeKB}KB → ${outputSizeKB}KB  (${savings}% smaller, saved ${savedKB}KB)${isLossless ? ' [lossless]' : ''}`);
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err.message);
    }
  }

  const totalSavedMB = (totalSaved / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 Conversion complete!`);
  console.log(`📦 Total space saved: ${totalSavedMB} MB`);
  console.log(`\n⚠️  Next step: Update your HTML/CSS to use .webp files instead of .png`);
  console.log(`   (The original .png files are kept as fallback.)\n`);
}

convertToWebP();
