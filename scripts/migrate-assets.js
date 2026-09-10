const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\xampp\\htdocs\\inner-design1\\wp-content\\uploads';
const destDir = path.resolve(__dirname, '..', 'server', 'uploads');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log('Migrating assets from:', srcDir);
console.log('To:', destDir);

function findFiles(dir, matchers, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    try {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findFiles(fullPath, matchers, fileList);
      } else {
        const lower = item.toLowerCase();
        for (const m of matchers) {
          if (m.test(lower)) {
            fileList.push(fullPath);
            break;
          }
        }
      }
    } catch (e) {}
  }
  return fileList;
}

const logoFiles = findFiles(srcDir, [/logo/, /brand/]);
console.log(`Found ${logoFiles.length} logo files`);

const imageFiles = findFiles(srcDir, [/\.(jpe?g|png|webp|svg)$/i]);
console.log(`Found ${imageFiles.length} total image files`);

const selected = new Set();
logoFiles.forEach(f => selected.add(f));

imageFiles.forEach(f => {
  const base = path.basename(f);
  if (!base.match(/-\d+x\d+\./)) {
    selected.add(f);
  }
});

console.log(`Selected ${selected.size} high-quality assets to migrate`);

let copied = 0;
const mediaIndex = [];

for (const filePath of selected) {
  try {
    const fileName = path.basename(filePath);
    const targetPath = path.join(destDir, fileName);
    fs.copyFileSync(filePath, targetPath);
    copied++;

    const stat = fs.statSync(targetPath);
    mediaIndex.push({
      name: fileName,
      url: `/uploads/${fileName}`,
      size: stat.size,
      type: path.extname(fileName).replace('.', ''),
      isLogo: fileName.toLowerCase().includes('logo'),
      date: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error copying file:', filePath, err.message);
  }
}

const indexPath = path.resolve(__dirname, '..', 'server', 'data', 'media.json');
fs.writeFileSync(indexPath, JSON.stringify(mediaIndex, null, 2));

console.log(`Successfully migrated ${copied} media assets! Media index saved to ${indexPath}`);
