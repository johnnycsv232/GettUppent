/**
 * The Librarian: AssetAgent
 * Purpose: Organizes raw shoot files into client-ready folders.
 */

const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '..', '01_RAW');
const SELECTS_DIR = path.join(__dirname, '..', '02_SELECTS');

function ensureDirs() {
    if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });
    if (!fs.existsSync(SELECTS_DIR)) fs.mkdirSync(SELECTS_DIR, { recursive: true });
}

function run() {
    console.log('📚 Librarian Agent started...');
    ensureDirs();

    const files = fs.readdirSync(RAW_DIR);
    const supportedExts = ['.jpg', '.jpeg', '.png', '.mp4', '.mov'];
    let moved = 0;

    console.log(`📂 Scanning ${RAW_DIR}...`);

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (supportedExts.includes(ext)) {
            // Simple logic: If it starts with 'IMG_', rename and move
            // In a real app, we'd use metadata or a manifest file
            if (file.startsWith('IMG_') || file.startsWith('DSC_')) {
                const date = new Date().toISOString().split('T')[0];
                const newName = `${date}_GettUpp_${file}`;

                const srcPath = path.join(RAW_DIR, file);
                const destPath = path.join(SELECTS_DIR, newName);

                fs.renameSync(srcPath, destPath);
                console.log(`📦 Moved & Renamed: ${file} -> ${newName}`);
                moved++;
            }
        }
    });

    if (moved === 0) {
        console.log('✨ No raw files to organize.');
    } else {
        console.log(`✅ Organized ${moved} files into 02_SELECTS.`);
    }
}

module.exports = { run };
