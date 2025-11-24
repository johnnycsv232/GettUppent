/**
 * The Recruiter: HRAgent
 * Purpose: Manages team, recruitment, and onboarding.
 */

const fs = require('fs');
const path = require('path');

const HR_DIR = path.join(__dirname, '..', 'docs', 'hr');
const TEAM_PATH = path.join(HR_DIR, 'team.json');

function ensureDirs() {
    if (!fs.existsSync(HR_DIR)) {
        fs.mkdirSync(HR_DIR, { recursive: true });
    }
}

function run() {
    console.log('👥 HR Agent started...');
    ensureDirs();

    let team = [];
    if (fs.existsSync(TEAM_PATH)) {
        team = JSON.parse(fs.readFileSync(TEAM_PATH, 'utf8'));
    } else {
        // Initialize with a founder
        team.push({
            id: 1,
            name: 'Founder',
            role: 'CEO',
            status: 'Active',
            joined: new Date().toISOString().split('T')[0]
        });
        fs.writeFileSync(TEAM_PATH, JSON.stringify(team, null, 2));
    }

    console.log(`📋 Current Team Size: ${team.length}`);
    team.forEach(member => {
        console.log(`   - ${member.name} (${member.role})`);
    });

    // Simulate a hiring need
    if (Math.random() > 0.8) {
        console.log('📢 Identifying hiring needs...');
        console.log('   + Suggestion: We might need a "Social Media Intern" soon.');
    } else {
        console.log('✅ Team staffing seems adequate for now.');
    }
}

module.exports = { run };
