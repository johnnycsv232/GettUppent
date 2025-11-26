const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function verify() {
    console.log('🔍 Verifying Firestore Connection...');

    if (!admin.apps.length) {
        const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined;

        if (projectId && clientEmail && privateKey) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey,
                }),
            });
        } else {
            admin.initializeApp();
        }
    }

    const db = admin.firestore();

    try {
        const snapshot = await db.collection('knowledge_base').limit(1).get();
        if (snapshot.empty) {
            console.error('❌ Connection successful, but collection "knowledge_base" is empty!');
            process.exit(1);
        }

        console.log('✅ Connection successful!');
        snapshot.forEach(doc => {
            console.log('   - Doc ID:', doc.id);
            console.log('   - Data:', JSON.stringify(doc.data(), null, 2));
        });
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error);
        process.exit(1);
    }
}

verify();
