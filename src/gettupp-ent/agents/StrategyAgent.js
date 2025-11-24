/**
 * The Visionary: StrategyAgent
 * Purpose: Sets high-level direction and updates the roadmap.
 */

const fs = require('fs');
const path = require('path');

const GOVERNANCE_DIR = path.join(__dirname, '..', 'docs', 'governance');
const ROADMAP_PATH = path.join(GOVERNANCE_DIR, 'roadmap.md');

function ensureDirs() {
    if (!fs.existsSync(GOVERNANCE_DIR)) {
        fs.mkdirSync(GOVERNANCE_DIR, { recursive: true });
    }
}

function run() {
    console.log('🧠 Strategy Agent started...');
    ensureDirs();

    if (!fs.existsSync(ROADMAP_PATH)) {
        console.log('⚠️ No roadmap found. Creating a new one...');
        fs.writeFileSync(ROADMAP_PATH, '# Strategic Roadmap\n\n## Q1 Goals\n- [ ] Launch MVP\n- [ ] Acquire 10 customers\n');
    }

    const roadmapContent = fs.readFileSync(ROADMAP_PATH, 'utf8');
    console.log('🗺️  Current Roadmap Status:');

    const lines = roadmapContent.split('\n');
    let goals = 0;
    let completed = 0;

    lines.forEach(line => {
        if (line.includes('- [ ]')) goals++;
        if (line.includes('- [x]')) {
            goals++;
            completed++;
        }
    });

    console.log(`   - Total Goals: ${goals}`);
    console.log(`   - Completed: ${completed}`);
    console.log(`   - Progress: ${goals > 0 ? Math.round((completed / goals) * 100) : 0}%`);

    if (completed === goals && goals > 0) {
        console.log('🎉 All goals met! Time to define Q2 objectives.');
    } else {
        console.log('👉 Focus on executing current Q1 goals.');
    }
}

module.exports = { run };
