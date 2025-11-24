/**
 * The Hype Man: SocialAgent
 * Purpose: Drafts DMs and content for the founder.
 */

const fs = require('fs');
const path = require('path');

const LEADS_PATH = path.join(__dirname, '..', 'crm-scripts', 'leads.json');
const DM_SCRIPTS_PATH = path.join(__dirname, '..', 'docs', 'growth', 'dm_scripts.md');

function run() {
    console.log('🗣️  Hype Man Agent started...');

    if (!fs.existsSync(LEADS_PATH)) {
        console.log('❌ No leads database found.');
        return;
    }

    const leads = JSON.parse(fs.readFileSync(LEADS_PATH, 'utf8'));
    const readyLeads = leads.filter(l => l.status === 'ready_for_outreach');

    if (readyLeads.length === 0) {
        console.log('😴 No leads marked "ready_for_outreach". Run "node manage.js leads" first.');
        return;
    }

    console.log(`📝 Drafting DMs for ${readyLeads.length} leads...`);
    console.log('---------------------------------------------------');

    readyLeads.forEach(lead => {
        // Simple template logic - in reality, this could use an LLM
        const venueName = lead.venue;
        const handle = lead.instagram;

        console.log(`\n🎯 Target: ${venueName} (@${handle})`);
        console.log(`📩 Draft (Story Reply):`);
        console.log(`   "Yo ${venueName}! 📸 Just saw the story. The vibe looks crazy tonight. We should get some 4k footage of that crowd next time. - Johnny"`);
        console.log(`👉 Action: Copy/Paste to IG`);
    });

    console.log('\n---------------------------------------------------');
    console.log('✅ Drafts complete.');
}

module.exports = { run };
