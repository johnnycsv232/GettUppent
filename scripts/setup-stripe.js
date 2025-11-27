#!/usr/bin/env node

/**
 * GettUpp OS - Stripe Product Setup Script
 * 
 * This script creates the required products and prices in your Stripe account.
 * Run once after configuring your STRIPE_SECRET_KEY.
 * 
 * Usage: npm run setup:stripe
 * 
 * Prerequisites:
 * 1. Add STRIPE_SECRET_KEY to your .env.local file
 * 2. Ensure you're using TEST keys during development
 */

require('dotenv').config({ path: '.env.local' });
const Stripe = require('stripe');

// Product configuration matching our tier system
const PRODUCTS = [
  {
    name: 'GettUpp Pilot',
    description: 'Introductory photo session - Perfect for first-timers',
    tier: 'pilot',
    price: 29900, // $299.00 in cents
    metadata: { tier: 'pilot' },
  },
  {
    name: 'GettUpp Tier 1',
    description: 'Basic package for emerging creators',
    tier: 't1',
    price: 59900, // $599.00
    metadata: { tier: 't1' },
  },
  {
    name: 'GettUpp Tier 2',
    description: 'Standard package for serious creators',
    tier: 't2',
    price: 99900, // $999.00
    metadata: { tier: 't2' },
  },
  {
    name: 'GettUpp VIP',
    description: 'Premium package for professional creators',
    tier: 'vip',
    price: 199900, // $1999.00
    metadata: { tier: 'vip' },
  },
];

async function main() {
  console.log('\n🚀 GettUpp Stripe Product Setup\n');
  console.log('='.repeat(50));

  // Verify Stripe key is configured
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.error('❌ Error: STRIPE_SECRET_KEY not found in environment variables.');
    console.error('   Add it to your .env.local file and try again.');
    process.exit(1);
  }

  // Check if using test keys
  const isTestMode = stripeKey.startsWith('sk_test_');
  if (!isTestMode) {
    console.warn('\n⚠️  WARNING: You are using LIVE Stripe keys!');
    console.warn('   Make sure this is intentional.\n');
  } else {
    console.log('✅ Using Stripe TEST mode\n');
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-04-10' });

  const priceIds = {};

  for (const product of PRODUCTS) {
    console.log(`\n📦 Creating product: ${product.name}`);
    
    try {
      // Create the product
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
        metadata: product.metadata,
      });
      console.log(`   ✓ Product created: ${stripeProduct.id}`);

      // Create the price
      const price = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.price,
        currency: 'usd',
        metadata: product.metadata,
      });
      console.log(`   ✓ Price created: ${price.id}`);

      priceIds[product.tier] = price.id;
    } catch (error) {
      console.error(`   ❌ Error creating ${product.name}:`, error.message);
    }
  }

  // Output environment variables to add
  console.log('\n' + '='.repeat(50));
  console.log('\n✅ Setup Complete!\n');
  console.log('Add these environment variables to your .env.local and Vercel:\n');
  console.log('---');
  
  for (const [tier, priceId] of Object.entries(priceIds)) {
    const envVar = `STRIPE_PRICE_${tier.toUpperCase()}=${priceId}`;
    console.log(envVar);
  }
  
  console.log('---\n');
  console.log('📋 Instructions:');
  console.log('1. Copy the above values to your .env.local file');
  console.log('2. Add them to Vercel > Settings > Environment Variables');
  console.log('3. Restart your development server\n');
}

main().catch(console.error);
