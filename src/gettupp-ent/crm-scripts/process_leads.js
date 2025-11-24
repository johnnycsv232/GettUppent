/**
 * LeadProcessor Agent
 * 
 * Reads from leads.json, normalizes data, and tags leads.
 * Usage: node process_leads.js
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'leads.json');
const PROCESSED_PATH = path.join(__dirname, 'leads_processed.json');

function normalizeHandle(handle) {
    // Remove @, trim whitespace, lowercase
    return handle.replace('@', '').trim().toLowerCase();
}

function tagLead(lead) {
    const tags = [];
    const venue = lead.venue.toLowerCase();

    if (venue.includes('bar') || venue.includes('pub')) tags.push('Bar');
    if (venue.includes('club') || venue.includes('lounge')) tags.push('Club');
    if (lead.role === 'Owner') tags.push('Decision Maker');

    return tags;
}

function processLeads() {
    if (!fs.existsSync(DB_PATH)) {
        console.log('No leads database found.');
        return;
    }

    const rawData = fs.readFileSync(DB_PATH);
    const leads = JSON.parse(rawData);
    const processed = [];

    console.log(`Processing ${leads.length} leads...`);

    leads.forEach(lead => {
        if (lead.status === 'new') {
            console.log(`Normalizing lead: ${lead.venue}`);

            const cleanLead = {
                ...lead,
                instagram: normalizeHandle(lead.instagram),
                tags: tagLead(lead),
                status: 'ready_for_outreach',
                processed_at: new Date().toISOString()
            };

            processed.push(cleanLead);
        } else {
            processed.push(lead);
        }
    });

    fs.writeFileSync(PROCESSED_PATH, JSON.stringify(processed, null, 2));
    console.log(`Done. Saved to ${PROCESSED_PATH}`);
}

module.exports = { run: processLeads };

if (require.main === module) {
    processLeads();
}
