const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function checkContent() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
            }),
        });
    }

    const db = admin.firestore();
    const snapshot = await db.collection('site_content').get();

    console.log(`Found ${snapshot.size} documents in 'site_content'.`);
    snapshot.forEach(doc => {
        console.log(`- ${doc.id}`);
    });
}

checkContent();
