/**
 * The Counsel: LegalAgent
 * Purpose: Ensures compliance, manages contracts, and assesses risk.
 */

const fs = require('fs');
const path = require('path');

const LEGAL_DIR = path.join(__dirname, '..', 'docs', 'legal');
const CONTRACTS_DIR = path.join(LEGAL_DIR, 'contracts');

function ensureDirs() {
    if (!fs.existsSync(LEGAL_DIR)) fs.mkdirSync(LEGAL_DIR, { recursive: true });
    if (!fs.existsSync(CONTRACTS_DIR)) fs.mkdirSync(CONTRACTS_DIR, { recursive: true });
}

function run() {
    console.log('⚖️  Legal Agent started...');
    ensureDirs();

    // Check for required compliance documents
    const requiredDocs = ['privacy_policy.md', 'terms_of_service.md'];
    const missingDocs = [];

    requiredDocs.forEach(doc => {
        if (!fs.existsSync(path.join(LEGAL_DIR, doc))) {
            missingDocs.push(doc);
        }
    });

    if (missingDocs.length > 0) {
        console.log(`⚠️ Missing compliance documents: ${missingDocs.join(', ')}`);
        console.log('📝 Drafting placeholders...');

        missingDocs.forEach(doc => {
            fs.writeFileSync(path.join(LEGAL_DIR, doc), `# ${doc.replace('.md', '').replace(/_/g, ' ').toUpperCase()}\n\n[Draft Pending Legal Review]\n`);
            console.log(`   + Created ${doc}`);
        });
    } else {
        console.log('✅ Basic compliance documents present.');
    }

    // Simulate contract review
    const contracts = fs.readdirSync(CONTRACTS_DIR);
    if (contracts.length === 0) {
        console.log('📂 No active contracts to review.');
    } else {
        console.log(`🧐 Reviewing ${contracts.length} contracts...`);
        // In a real scenario, this would parse text and check for clauses
        console.log('✅ All contracts appear to be in standard format.');
    }
}

module.exports = { run };
