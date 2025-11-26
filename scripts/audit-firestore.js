const admin = require('firebase-admin');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function auditFirestore() {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    }

    const db = admin.firestore();

    console.log('\n========================================');
    console.log('🔍 GETTUPPENT FIRESTORE AUDIT');
    console.log('========================================\n');

    // Collections to check
    const collections = ['leads', 'site_content', 'knowledge_base', 'users', 'clients', 'shoots', 'invoices'];

    for (const collName of collections) {
        try {
            const snapshot = await db.collection(collName).get();
            console.log(`📁 ${collName}: ${snapshot.size} documents`);
            
            if (snapshot.size > 0 && snapshot.size <= 5) {
                // Show sample docs for small collections
                snapshot.docs.forEach((doc, i) => {
                    const data = doc.data();
                    const preview = JSON.stringify(data).substring(0, 100);
                    console.log(`   └─ ${doc.id}: ${preview}...`);
                });
            } else if (snapshot.size > 5) {
                // Show first doc as sample
                const firstDoc = snapshot.docs[0];
                const keys = Object.keys(firstDoc.data());
                console.log(`   └─ Sample fields: ${keys.slice(0, 8).join(', ')}`);
            }
        } catch (error) {
            console.log(`📁 ${collName}: ❌ Error - ${error.message}`);
        }
    }

    // Check specific site_content docs
    console.log('\n--- site_content Details ---');
    try {
        const heroDoc = await db.collection('site_content').doc('hero').get();
        console.log(`   hero: ${heroDoc.exists ? '✅ EXISTS' : '❌ MISSING'}`);
        if (heroDoc.exists) {
            console.log(`   └─ headline: "${heroDoc.data()?.headline || 'N/A'}"`);
        }
        
        const pricingDoc = await db.collection('site_content').doc('pricing').get();
        console.log(`   pricing: ${pricingDoc.exists ? '✅ EXISTS' : '❌ MISSING'}`);
        if (pricingDoc.exists) {
            const tiers = pricingDoc.data()?.tiers || [];
            console.log(`   └─ ${tiers.length} pricing tiers defined`);
        }
    } catch (error) {
        console.log(`   Error checking site_content: ${error.message}`);
    }

    // Check knowledge_base domains
    console.log('\n--- Knowledge Base Breakdown ---');
    try {
        const kbSnapshot = await db.collection('knowledge_base').get();
        const domains = {};
        const types = {};
        
        kbSnapshot.docs.forEach(doc => {
            const data = doc.data();
            domains[data.domain_area] = (domains[data.domain_area] || 0) + 1;
            types[data.knowledge_type] = (types[data.knowledge_type] || 0) + 1;
        });
        
        console.log('   By Domain:');
        Object.entries(domains).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
            console.log(`      ${k}: ${v}`);
        });
        
        console.log('   By Type:');
        Object.entries(types).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
            console.log(`      ${k}: ${v}`);
        });
    } catch (error) {
        console.log(`   Error: ${error.message}`);
    }

    console.log('\n========================================');
    console.log('✅ AUDIT COMPLETE');
    console.log('========================================\n');

    process.exit(0);
}

auditFirestore().catch(err => {
    console.error('Audit failed:', err);
    process.exit(1);
});
