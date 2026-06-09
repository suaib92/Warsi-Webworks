const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const ext = path.extname(file);
      const basename = path.basename(file, ext);
      // Skip if it's the apple-icon or icon which Next.js expects in specific formats
      if (file === 'apple-icon.png' || file === 'icon.png') continue;

      const newPath = path.join(dir, `${basename}.webp`);
      
      try {
        await sharp(fullPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(newPath);
        
        console.log(`Converted: ${fullPath} -> ${newPath}`);
        
        // Remove old file
        fs.unlinkSync(fullPath);
        console.log(`Deleted: ${fullPath}`);
      } catch (err) {
        console.error(`Error processing ${fullPath}:`, err);
      }
    }
  }
}

processDirectory(publicDir).then(() => {
  console.log('Image optimization complete.');
});
