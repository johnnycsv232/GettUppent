/**
 * The CMO: MarketingAgent
 * Purpose: Drives growth, manages campaigns, and analyzes leads.
 */

const fs = require('fs');
const path = require('path');

const LEADS_PATH = path.join(__dirname, '..', 'crm-scripts', 'leads.json');
const MARKETING_DIR = path.join(__dirname, '..', 'docs', 'marketing');

function ensureDirs() {
    if (!fs.existsSync(MARKETING_DIR)) {
        fs.mkdirSync(MARKETING_DIR, { recursive: true });
    }
}

function run() {
    console.log('🚀 Marketing Agent started...');
    ensureDirs();

    if (!fs.existsSync(LEADS_PATH)) {
        console.log('❌ No leads database found to analyze.');
        return;
    }

    const leads = JSON.parse(fs.readFileSync(LEADS_PATH, 'utf8'));
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;

    console.log(`📊 Market Analysis:`);
    console.log(`   - Total Leads: ${totalLeads}`);
    console.log(`   - New Leads: ${newLeads}`);

    if (newLeads > 5) {
        console.log('🔥 Hot Streak! We should boost our ad spend.');
    } else {
        console.log('📉 Lead flow is steady. Consider a new content campaign.');
    }

    // Simulate content calendar suggestion
    const days = ['Monday', 'Wednesday', 'Friday'];
    const topics = ['Behind the Scenes', 'Client Testimonial', 'Service Highlight'];

    console.log('\n📅 Proposed Content Calendar for next week:');
    days.forEach((day, index) => {
        console.log(`   - ${day}: ${topics[index]}`);
    });
}

module.exports = { run };
