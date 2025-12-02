const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
let content = fs.readFileSync(envPath, 'utf8');

const keyRegex = /FIREBASE_PRIVATE_KEY="([\s\S]*?)"/;
const match = content.match(keyRegex);

if (match) {
    let rawKey = match[1];
    console.log('Original key length:', rawKey.length);
    
    // Strip headers, footers, newlines (literal and actual), and spaces
    let body = rawKey.replace(/-----BEGIN PRIVATE KEY-----/g, '')
                     .replace(/-----END PRIVATE KEY-----/g, '')
                     .replace(/\\n/g, '') // Remove literal \n
                     .replace(/\n/g, '')  // Remove actual newlines
                     .replace(/\r/g, '')
                     .replace(/\s/g, ''); // Remove spaces/tabs
                     
    console.log('Base64 body length:', body.length);
    
    // Chunk body into 64-char lines
    const chunks = [];
    for (let i = 0; i < body.length; i += 64) {
        chunks.push(body.slice(i, i + 64));
    }
    const wrappedBody = chunks.join('\\n');
    
    // Reconstruct key with literal \n
    const finalKey = `-----BEGIN PRIVATE KEY-----\\n${wrappedBody}\\n-----END PRIVATE KEY-----\\n`;
    
    const newContent = content.replace(match[0], `FIREBASE_PRIVATE_KEY="${finalKey}"`);
    
    fs.writeFileSync(envPath, newContent);
    console.log('Reconstructed and updated .env.local');
} else {
    console.log('Could not find FIREBASE_PRIVATE_KEY in .env.local');
}
