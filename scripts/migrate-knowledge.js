const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function initFirebaseAdmin() {
    if (!admin.apps.length) {
        const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined;

        if (projectId && clientEmail && privateKey) {
            console.log('Initializing with env vars...');
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey,
                }),
            });
        } else {
            console.log('Initializing with default credentials (ADC)...');
            admin.initializeApp();
        }
    }
}

async function migrate(jsonFilePath, collectionName = 'knowledge_base') {
    await initFirebaseAdmin();
    const db = admin.firestore();

    const file = path.resolve(jsonFilePath);
    if (!fs.existsSync(file)) {
        throw new Error(`JSON file not found: ${file}`);
    }

    const raw = fs.readFileSync(file, 'utf8');
    const entries = JSON.parse(raw);

    console.log(`Found ${entries.length} entries. Starting migration to '${collectionName}'...`);

    const batchSize = 400; // Conservative batch limit
    let processed = 0;

    for (let i = 0; i < entries.length; i += batchSize) {
        const batch = db.batch();
        const chunk = entries.slice(i, i + batchSize);

        for (const entry of chunk) {
            const docId = entry.id || undefined;
            const docRef = docId ? db.collection(collectionName).doc(String(docId)) : db.collection(collectionName).doc();

            const payload = {
                ...entry,
                migrated_at: admin.firestore.FieldValue.serverTimestamp(),
                original_id: entry.id || null,
                __migration_source: 'server_script_v1'
            };

            // Use set with merge: true for idempotency
            batch.set(docRef, payload, { merge: true });
        }

        await batch.commit();
        processed += chunk.length;
        console.log(`Committed ${processed}/${entries.length}`);
        await new Promise((res) => setTimeout(res, 500)); // Rate limit protection
    }

    console.log('Migration complete.');
}

async function main() {
    try {
        // Default to the known file name in root
        const jsonPath = process.argv[2] || './GETTUPP_MASTER_UNIFIED_Q4_2025_FULL_with_GettUpp_Girls.json';
        await migrate(jsonPath);
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

main();
