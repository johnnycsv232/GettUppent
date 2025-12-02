const dotenv = require('dotenv');
const path = require('path');

// Load env vars
const result = dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

if (result.error) {
    console.error('Error loading .env.local:', result.error);
    process.exit(1);
}

const rawKey = process.env.FIREBASE_PRIVATE_KEY;

if (!rawKey) {
    console.error('FIREBASE_PRIVATE_KEY is missing');
    process.exit(1);
}

console.log('Raw Key Length:', rawKey.length);
console.log('First 30 chars:', rawKey.substring(0, 30));
console.log('Last 30 chars:', rawKey.substring(rawKey.length - 30));

// Simulate the replacement
const processedKey = rawKey.replace(/\\n/g, '\n');
console.log('Processed Key Length:', processedKey.length);
console.log('Processed First 30:', JSON.stringify(processedKey.substring(0, 30)));

// Check for actual newlines in raw key
console.log('Has actual newlines?', rawKey.includes('\n'));
console.log('Has escaped newlines?', rawKey.includes('\\n'));
