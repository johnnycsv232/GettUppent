/**
 * The CFO: FinanceAgent
 * Purpose: Manages financial health, budgeting, and forecasting.
 */

const fs = require('fs');
const path = require('path');

const FINANCE_DIR = path.join(__dirname, '..', 'docs', 'finance');
const BUDGET_PATH = path.join(FINANCE_DIR, 'budget.json');

function ensureDirs() {
    if (!fs.existsSync(FINANCE_DIR)) {
        fs.mkdirSync(FINANCE_DIR, { recursive: true });
    }
}

function run() {
    console.log('💰 Finance Agent started...');
    ensureDirs();

    let budget = {
        total_budget: 10000,
        expenses: [],
        remaining: 10000,
        last_updated: new Date().toISOString()
    };

    if (fs.existsSync(BUDGET_PATH)) {
        try {
            budget = JSON.parse(fs.readFileSync(BUDGET_PATH, 'utf8'));
        } catch (e) {
            console.error('⚠️ Error reading budget file, starting fresh.');
        }
    }

    // Simulate a random expense
    const expenseTypes = ['Software Subscription', 'Marketing Ad', 'Office Supplies', 'Contractor Fee'];
    const randomExpense = {
        id: Date.now(),
        type: expenseTypes[Math.floor(Math.random() * expenseTypes.length)],
        amount: Math.floor(Math.random() * 500) + 50,
        date: new Date().toISOString()
    };

    // 30% chance to add an expense
    if (Math.random() > 0.7) {
        budget.expenses.push(randomExpense);
        budget.remaining -= randomExpense.amount;
        budget.last_updated = new Date().toISOString();

        console.log(`💸 New Expense: ${randomExpense.type} - $${randomExpense.amount}`);
        fs.writeFileSync(BUDGET_PATH, JSON.stringify(budget, null, 2));
    } else {
        console.log('✅ No new expenses to record.');
    }

    console.log(`📊 Current Budget Remaining: $${budget.remaining}`);

    if (budget.remaining < 2000) {
        console.log('⚠️ WARNING: Budget is running low!');
    }
}

module.exports = { run };
