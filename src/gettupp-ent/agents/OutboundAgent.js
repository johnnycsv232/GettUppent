/**
 * The Hunter: OutboundAgent
 * Purpose: Simulates the "Feed Sweep" to generate leads.
 */

const fs = require('fs');
const path = require('path');

const LEADS_PATH = path.join(__dirname, '..', 'crm-scripts', 'leads.json');

// Mock data to simulate "finding" leads on Instagram
const MOCK_LEADS = [
    { venue: "The Basement", instagram: "basementmpls", tags: ["Club", "Underground"] },
    { venue: "Rooftop 612", instagram: "rooftop612", tags: ["Bar", "View"] },
    { venue: "Neon Tiger", instagram: "neontiger_mpls", tags: ["Lounge", "New"] },
    { venue: "Vibe Room", instagram: "viberoom_ent", tags: ["Club", "HipHop"] },
    { venue: "Pourhouse", instagram: "thepourhouse", tags: ["Bar", "Live Music"] }
];

function run() {
    console.log('🕵️  Hunter Agent started...');
    console.log('📡 Scanning Instagram feeds (Simulation)...');

    let leads = [];
    if (fs.existsSync(LEADS_PATH)) {
        leads = JSON.parse(fs.readFileSync(LEADS_PATH, 'utf8'));
    }

    // Simulate finding 1-2 new leads
    const newLeadsCount = Math.floor(Math.random() * 2) + 1;
    let added = 0;

    for (let i = 0; i < newLeadsCount; i++) {
        const candidate = MOCK_LEADS[Math.floor(Math.random() * MOCK_LEADS.length)];

        // Check for duplicates
        if (!leads.find(l => l.instagram === candidate.instagram)) {
            leads.push({
                ...candidate,
                status: "new",
                date_found: new Date().toISOString().split('T')[0]
            });
            console.log(`✅ Found new lead: ${candidate.venue} (@${candidate.instagram})`);
            added++;
        }
    }

    if (added === 0) {
        console.log('🤷 No new leads found in this sweep.');
    } else {
        fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2));
        console.log(`💾 Saved ${added} new leads to database.`);
    }
}

module.exports = { run };
