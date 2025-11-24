/**
 * SiteVerifierAgent - "Business Hello World"
 * 
 * Usage: node site_check.js
 * Dependencies: puppeteer
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log('Starting Site Verifier...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Target: Local dev or Prod
    // For now, we assume we are checking the local file
    const localPath = path.resolve(__dirname, '../landing-page/index.html');
    const url = `file://${localPath}`;

    console.log(`Navigating to: ${url}`);
    await page.goto(url);

    // 1. Check Headline
    const headline = await page.$eval('h1', el => el.innerText);
    console.log(`Headline found: "${headline}"`);

    if (!headline.includes('We Own')) {
        console.error('FAIL: Headline incorrect.');
    } else {
        console.log('PASS: Headline visible.');
    }

    // 2. Check Form
    const form = await page.$('form[name="pilot-booking"]');
    if (form) {
        console.log('PASS: Booking form found.');
    } else {
        console.error('FAIL: Booking form missing.');
    }

    // 3. Screenshot
    const reportDir = path.resolve(__dirname, '../docs/reports');
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }
    const screenshotPath = path.join(reportDir, `site-check-${Date.now()}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved to: ${screenshotPath}`);

    await browser.close();
    console.log('Site Verifier finished.');
})();
