const fs = require('fs');
const path = require('path');

const lines = [
"MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCgD56f5CRqPGZH",
"nqv+P54D8Op2i71sdKwbTiS38hW/pJAOvRBnHmhxZwoeZEauo5vKzJ1ynfEeYuwxE",
"nFYZQLB5AUsAJiMs2mNDaI0Is4EhSbKdeMu/DGscTJlcGMLxthHNNYOuHVyWnQYOY",
"nO47cNbwlBmtpeTjTrGYn+IVNxjLra9+99BSyfBdwrDHugN78GA1hA0ceDFD5Mzf2",
"nnagxhNrz5mPqJZgpqTyDvQpV2Ee/Lj9hLq0Igy66c6BF5anfX0IwpLp67/eBa9q9",
"n8MmB4YpqL6GkpKhDFEBx5OLVplLuZC0O/o3bAeRSceYCqM0NKH+RZ8A2zAWuM0Mv",
"nGAiYoB5BAgMBAAECggEAC6g3kEOIV2hgtpWAmVVt8nC+bFBsXVp129Ag1kRNmzgx",
"nQIGAMyZJLExbnc1IqDtxr5SNTfFiMYBl60t6BbrA1URxkgAxdJ96jniE6EnJWp9p",
"nLRYemiIIH5/qNJw2DO/ZiegmHyw8pMrDr8GerPEI69Vk20Cl39ytb/nMk5Z8vOJ3",
"ny0/JYn3mS9LAQPSiyep1VbmfJL+qFYJYUjEEWQGdvR6C1bP7ozKGE/bLAC000huH",
"ns04WMQx6jUPfsNWd1jfFMzYd3a8cRuZJ8i4aO4QZvHnJd63FqqfzFNeT5I9ni0rM",
"nCcUGazus0i4oT7W2ebjHSbrtN9LILxaJaduK/7TsJQKBgQDbbfXSCgxOJx8CYBgt",
"nICnwMZv+QGg+s0sVnqnucJv93Ay/6/TXTM9/81rOjZiIcFTVE7Mv9YH9BagjqV7S",
"nUlJSAm6KDZ+mAUT6h1sH4cpEFfgNzGny1V6Dxs86iS9Pev8cjn+oFZ2IT09s5Y6/",
"nD4e789Map2DcPZVfty00SIuuswKBgQC6vK4lW7krnXzgaB6VuYltd4t+zYHOvL0u",
"nfWzAPf0LSYC3V/w59f8ouD3RNgdghKBbnZImSRYiHLd7txz77KY0Z769Y/uGAj12",
"n5wqomSd1fzRPDz77IZGZ3s6a76kMo3yzJYb8f5uZwQD6fQ21an5UdNwy2SqxMnf+",
"nzReRk9M5OwKBgEDT0cZGFbCZOj4Xac0bLYi6/100ZhfwHIS8pXO+bTeo5VNmQKXD",
"nGaKxoOhZSPE2TrnM4imPHOJF45D1nwAANjXoZgP/VmVTBrAFgU1o1bsbync5JywJ",
"nAa1o9RxUH1gZ/HjRWMGt8SauV8bSY0PrMKzEsl+zh5hJ0XG/ymkh7bKlAoGAfAmQ",
"nc2g1227E4BrJFhMj4f6iPhwruTNNRnAxqJCEYNb2FNLwy19Hmbin9yu4QrhV/ATy",
"na1Poy8ffaOH88qoCzJSM8ihTjnQ2d6CIR+1TdIyGJm2uHAn0OQzyl5/R3n9J+YVX",
"n4KiyprK4/6nJTVPrjhYBnhT6crFfW3THzv8uMrkCgYBzBno7LWfFOjYsabSM7t79",
"nbmCSZonmVpUotPXPMEL7OVrSymS3w2PejSK/w0TB/b+NxXWOKUwJDZaUOaz1nFSe",
"nIzT1JYRO/iHzwFA0JhaetJg/nWfRsuwQT0sdfbZIw+OzhbBYJfYc9ivIFcMWn1fq",
"nmdkqDYO4c1jdXREq0jUZrA=="
];

// Remove leading 'n' from lines 1 onwards
const cleanLines = lines.map((line, i) => {
    if (i === 0) return line;
    // If line starts with 'n', remove it. If it starts with ' n' remove ' n'.
    // The user provided input had 'n' at start.
    if (line.startsWith('n')) return line.substring(1);
    return line;
});

// Join with NO whitespace because it's base64
const body = cleanLines.join('');
console.log('Cleaned Body Length:', body.length);

// Reconstruct key with literal \n
const finalKey = `-----BEGIN PRIVATE KEY-----\\n${body}\\n-----END PRIVATE KEY-----\\n`;

const envPath = path.resolve(__dirname, '../.env.local');
let content = fs.readFileSync(envPath, 'utf8');

const keyRegex = /FIREBASE_PRIVATE_KEY="([\s\S]*?)"/;
const match = content.match(keyRegex);

if (match) {
    const newContent = content.replace(match[0], `FIREBASE_PRIVATE_KEY="${finalKey}"`);
    fs.writeFileSync(envPath, newContent);
    console.log('Fixed corrupted key in .env.local');
} else {
    console.log('Could not find key in .env.local');
}
