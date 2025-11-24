/**
 * InvoiceGenerator Agent
 * 
 * Reads from shoot_log.json and generates simple text-based invoices.
 * Usage: node invoice_generator.js
 */

const fs = require('fs');
const path = require('path');

const SHOOT_LOG_PATH = path.join(__dirname, 'shoot_log.json');
const INVOICE_DIR = path.join(__dirname, 'invoices');

// Ensure invoice directory exists
if (!fs.existsSync(INVOICE_DIR)) {
    fs.mkdirSync(INVOICE_DIR);
}

function generateInvoice(shoot) {
    const invoiceId = `INV-${shoot.shoot_id}-${Date.now()}`;
    const date = new Date().toLocaleDateString();

    const content = `
================================================
GettUpp ENT - INVOICE
================================================
Invoice ID: ${invoiceId}
Date: ${date}

Bill To:
${shoot.venue}
(Client ID: ${shoot.client_id})

------------------------------------------------
Description                 Amount
------------------------------------------------
${shoot.package} Package       $${shoot.price}.00
(Date: ${shoot.date})

------------------------------------------------
TOTAL DUE:                  $${shoot.price}.00
================================================

Payment Terms: Due on receipt.
Pay via Venmo: @GettUppENT
    `;

    const filename = path.join(INVOICE_DIR, `${invoiceId}.txt`);
    fs.writeFileSync(filename, content.trim());
    console.log(`Generated invoice: ${filename}`);
}

function run() {
    if (!fs.existsSync(SHOOT_LOG_PATH)) {
        console.log('No shoot log found.');
        return;
    }

    const shoots = JSON.parse(fs.readFileSync(SHOOT_LOG_PATH));

    console.log(`Checking ${shoots.length} shoots for invoicing...`);

    shoots.forEach(shoot => {
        if (shoot.status === 'completed') {
            generateInvoice(shoot);
        }
    });
}

module.exports = { run };

if (require.main === module) {
    run();
}
