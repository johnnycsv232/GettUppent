/**
 * GettUpp ENT - Agent Fleet Orchestrator
 * Purpose: Runs all business agents in sequence to manage the enterprise.
 */

const SocialAgent = require('./agents/SocialAgent');
const AssetAgent = require('./agents/AssetAgent');
const OutboundAgent = require('./agents/OutboundAgent');
const FinanceAgent = require('./agents/FinanceAgent');
const LegalAgent = require('./agents/LegalAgent');
const HRAgent = require('./agents/HRAgent');
const MarketingAgent = require('./agents/MarketingAgent');
const StrategyAgent = require('./agents/StrategyAgent');
const OperationsAgent = require('./agents/OperationsAgent');
const WebsiteAgent = require('./agents/WebsiteAgent');
const CarouselAgent = require('./agents/CarouselAgent');


async function runFleet() {
    console.clear();
    console.log('===================================================');
    console.log('🤖  GettUpp ENT - BUSINESS AGENT FLEET INITIALIZING');
    console.log('===================================================\n');

    // 1. Operations & Strategy (High Level)
    console.log('--- PHASE 1: STRATEGY & OPS ---');
    OperationsAgent.run();
    StrategyAgent.run();
    console.log('\n');

    // 2. Core Business Functions (Finance, Legal, HR)
    console.log('--- PHASE 2: CORE BUSINESS ---');
    FinanceAgent.run();
    LegalAgent.run();
    HRAgent.run();
    console.log('\n');

    // 3. Growth & Execution (Marketing, Sales, Social, Assets, Website)
    console.log('--- PHASE 3: GROWTH & EXECUTION ---');
    MarketingAgent.run();
    CarouselAgent.run();  // Generate Instagram carousel content
    OutboundAgent.run(); // The Hunter
    SocialAgent.run();   // The Hype Man
    AssetAgent.run();    // The Librarian
    WebsiteAgent.run();  // The Webmaster
    console.log('\n');


    console.log('===================================================');
    console.log('✅  FLEET EXECUTION COMPLETE');
    console.log('===================================================');
}

runFleet();
