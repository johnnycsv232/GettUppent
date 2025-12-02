const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
let content = fs.readFileSync(envPath, 'utf8');

// Match the key. It starts with FIREBASE_PRIVATE_KEY=" and ends with "
// We look for the start, and find the closing quote which should be at the end of the block
const keyRegex = /FIREBASE_PRIVATE_KEY="([\s\S]*?)"/;
const match = content.match(keyRegex);

if (match) {
    let rawKey = match[1];
    console.log('Found key with length:', rawKey.length);
    
    // Replace actual newlines with literal \n
    let cleanKey = rawKey.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // If the key was already flat but using \n, this split won't do much (length 1)
    // If it was multi-line, it will split.
    const lines = cleanKey.split('\n');
    
    // If lines > 1, we join with \n literal.
    // If lines == 1, check if we need to fix anything?
    // Maybe it has mixed content.
    
    // We want to ensure it is a single line with literal \n
    // If it is already a single line, lines.length is 1.
    // We should verify if it contains literal \n
    
    let newKey;
    if (lines.length > 1) {
        console.log('Detected multi-line key. Flattening...');
        newKey = lines.join('\\n');
    } else {
        console.log('Key is single line. Checking formatting...');
        // If it's single line, it might already be correct or might be missing \n
        // We assume if it's single line it's likely correct from previous edits, 
        // but let's ensure no weirdness.
        newKey = cleanKey;
    }
    
    // Ensure proper start/end newlines if missing
    // The user key usually has \n after BEGIN and before END.
    
    // Replace the content
    const newContent = content.replace(match[0], `FIREBASE_PRIVATE_KEY="${newKey}"`);
    
    fs.writeFileSync(envPath, newContent);
    console.log('Updated .env.local');
} else {
    console.log('Could not find FIREBASE_PRIVATE_KEY in .env.local');
}
