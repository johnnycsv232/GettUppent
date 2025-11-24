/**
 * GettUpp ENT - Central Command
 * Usage: node manage.js [command]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG_PATH = path.join(__dirname, 'docs', 'config.json');
const LANDING_PAGE_PATH = path.join(__dirname, 'landing-page', 'index.html');
const LEAD_PROCESSOR = path.join(__dirname, 'crm-scripts', 'process_leads.js');
const INVOICE_GENERATOR = path.join(__dirname, 'ops-tools', 'invoice_generator.js');

const OUTBOUND_AGENT = path.join(__dirname, 'agents', 'OutboundAgent.js');
const ASSET_AGENT = path.join(__dirname, 'agents', 'AssetAgent.js');
const SOCIAL_AGENT = path.join(__dirname, 'agents', 'SocialAgent.js');

const args = process.argv.slice(2);
const command = args[0];

function loadConfig() {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

function runBuild() {
    console.log('🏗️  Building Landing Page...');
    const config = loadConfig();
    let html = fs.readFileSync(LANDING_PAGE_PATH, 'utf8');

    // Inject Pricing
    html = html.replace(/{{PRICE_PILOT}}/g, config.pricing.pilot_night.price);
    html = html.replace(/{{PRICE_TIER1}}/g, config.pricing.tier_1.price);
    html = html.replace(/{{PRICE_TIER2}}/g, config.pricing.tier_2.price);
    html = html.replace(/{{PRICE_TIER3}}/g, config.pricing.tier_3.price);

    // Inject Brand Info
    html = html.replace(/{{MISSION}}/g, config.business.mission);

    // Save to a 'dist' or overwrite (for now, we overwrite for simplicity in this bootstrap phase)
    // In a real build, we'd output to /dist/index.html
    fs.writeFileSync(LANDING_PAGE_PATH, html);
    console.log('✅ Landing Page updated with config values.');
}

function runLeads() {
    console.log('👥 Processing Leads...');
    require(LEAD_PROCESSOR).run();
}

function runInvoices() {
    console.log('💸 Generating Invoices...');
    require(INVOICE_GENERATOR).run();
}

function runHunt() {
    require(OUTBOUND_AGENT).run();
}

function runOrganize() {
    require(ASSET_AGENT).run();
}

function runHype() {
    require(SOCIAL_AGENT).run();
}

function showHelp() {
    console.log(`
GettUpp ENT Manager
-------------------
Commands:
  build     Inject config.json values into index.html
  leads     Run the lead normalization agent
  invoices  Run the invoice generation agent
  hunt      Run OutboundAgent (Find Leads)
  organize  Run AssetAgent (Organize Files)
  hype      Run SocialAgent (Draft DMs)
    `);
}

switch (command) {
    case 'build':
        runBuild();
        break;
    case 'leads':
        runLeads();
        break;
    case 'invoices':
        runInvoices();
        break;
    case 'hunt':
        runHunt();
        break;
    case 'organize':
        runOrganize();
        break;
    case 'hype':
        runHype();
        break;
    default:
        showHelp();
}
