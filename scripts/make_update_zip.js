const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const zipPath = path.resolve('C:\\Users\\Spacs & Places 3\\Desktop\\interiordesignerinlahore_update.zip');
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function() {
  const sizeMB = (archive.pointer() / (1024 * 1024)).toFixed(2);
  console.log(`========================================`);
  console.log(`SUCCESS: Created ${zipPath}`);
  console.log(`Total Size: ${sizeMB} MB`);
  console.log(`========================================`);
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// 1. Files
archive.file('app.js', { name: 'app.js' });
archive.file('package.json', { name: 'package.json' });
archive.file('.env', { name: '.env' });

// 2. Directories
archive.directory('server/', 'server');
archive.directory('client/dist/', 'client/dist');

archive.finalize();
