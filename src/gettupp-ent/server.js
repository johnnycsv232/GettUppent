/**
 * GettUpp OS - Backend Server
 * Serves the dashboard and controls agents.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
const DASHBOARD_PATH = path.join(__dirname, 'dashboard', 'index.html');
const LEADS_PATH = path.join(__dirname, 'crm-scripts', 'leads.json');
const MANAGE_SCRIPT = path.join(__dirname, 'manage.js');

const server = http.createServer((req, res) => {
    // Enable CORS for local dev if needed
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    if (req.url === '/') {
        // Serve Dashboard
        fs.readFile(DASHBOARD_PATH, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading dashboard');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/api/stats') {
        // Get Stats
        let leadsCount = 0;
        if (fs.existsSync(LEADS_PATH)) {
            const leads = JSON.parse(fs.readFileSync(LEADS_PATH, 'utf8'));
            leadsCount = leads.length;
        }

        // Mock revenue for now
        const revenue = 1380; // $345 * 4

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ leads: leadsCount, revenue: revenue, shoots: 3 }));

    } else if (req.url === '/api/leads') {
        // Get Leads
        if (fs.existsSync(LEADS_PATH)) {
            const leads = fs.readFileSync(LEADS_PATH, 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(leads);
        } else {
            res.end('[]');
        }

    } else if (req.url.startsWith('/api/run/')) {
        // Run Agent
        const agent = req.url.split('/')[3]; // /api/run/hunt
        const validAgents = ['hunt', 'organize', 'hype', 'leads'];

        if (validAgents.includes(agent)) {
            console.log(`🚀 Running agent: ${agent}`);
            exec(`node "${MANAGE_SCRIPT}" ${agent}`, (error, stdout, stderr) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: !error,
                    output: stdout || stderr
                }));
            });
        } else {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Invalid agent' }));
        }
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`
    💻 GettUpp OS is running!
    --------------------------
    Local:   http://localhost:${PORT}
    `);
});
