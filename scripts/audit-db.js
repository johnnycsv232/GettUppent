const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function auditDb() {
    if (!admin.apps.length) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
                }),
            });
        } catch (e) {
            console.error("Failed to initialize Firebase Admin:", e.message);
            process.exit(1);
        }
    }

    const db = admin.firestore();
    console.log("--- FIRESTORE AUDIT ---");

    try {
        // Leads
        const leadsSnap = await db.collection('leads').get();
        console.log(`[leads] Count: ${leadsSnap.size}`);

        // Site Content
        const contentSnap = await db.collection('site_content').get();
        console.log(`[site_content] Count: ${contentSnap.size}`);
        contentSnap.forEach(doc => console.log(`  - ${doc.id}`));

        // Knowledge Base
        const kbSnap = await db.collection('knowledge_base').get();
        console.log(`[knowledge_base] Count: ${kbSnap.size}`);

        // Shoots
        const shootsSnap = await db.collection('shoots').get();
        console.log(`[shoots] Count: ${shootsSnap.size}`);

        // Check for other collections if possible (not easy in client SDK, but we can try common ones)
        const usersSnap = await db.collection('users').get();
        console.log(`[users] Count: ${usersSnap.size}`);

    } catch (error) {
        console.error("Error auditing DB:", error);
    }
}

auditDb();
