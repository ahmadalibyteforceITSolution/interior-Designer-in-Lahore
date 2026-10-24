const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const zipName = 'interiordesignerinlahore_cpanel.zip';
const zipPath = path.join(rootDir, zipName);
const desktopPath = path.join('C:\\Users\\Spacs & Places 3\\Desktop', zipName);
const tempDir = path.join(rootDir, 'deploy_temp');

console.log('Packaging deployment zip for cPanel...');

if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
if (fs.existsSync(desktopPath)) fs.unlinkSync(desktopPath);
if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });

fs.mkdirSync(tempDir, { recursive: true });

// Copy essential files
const copyFiles = ['app.js', 'package.json', 'package-lock.json', '.env'];
copyFiles.forEach(f => {
  const src = path.join(rootDir, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(tempDir, f));
    console.log('Copied ' + f);
  }
});

// Copy server folder (excluding node_modules)
function copyDirRecursive(src, dest, exclude = []) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (exclude.includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, exclude);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying server folder...');
copyDirRecursive(path.join(rootDir, 'server'), path.join(tempDir, 'server'), ['node_modules', '.git']);

console.log('Copying client/dist folder...');
copyDirRecursive(path.join(rootDir, 'client', 'dist'), path.join(tempDir, 'client', 'dist'), ['node_modules', '.git']);

if (fs.existsSync(path.join(rootDir, 'api'))) {
  copyDirRecursive(path.join(rootDir, 'api'), path.join(tempDir, 'api'));
}

console.log('Copying pre-installed backend node_modules...');
if (fs.existsSync(path.join(rootDir, 'node_modules'))) {
  copyDirRecursive(path.join(rootDir, 'node_modules'), path.join(tempDir, 'node_modules'));
}

console.log('Compressing files into zip...');
// PowerShell command to compress directory
const psCommand = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${tempDir}', '${zipPath}', [System.IO.Compression.CompressionLevel]::Optimal, $false)"`;
execSync(psCommand, { stdio: 'inherit' });

// Copy to Desktop for 1-click access
fs.copyFileSync(zipPath, desktopPath);

// Clean up temp
fs.rmSync(tempDir, { recursive: true, force: true });

const sizeMB = (fs.statSync(zipPath).size / (1024 * 1024)).toFixed(2);
console.log(`\n========================================`);
console.log(`SUCCESS! Created: ${zipName} (${sizeMB} MB)`);
console.log(`Path: ${zipPath}`);
console.log(`Desktop: ${desktopPath}`);
console.log(`========================================\n`);
