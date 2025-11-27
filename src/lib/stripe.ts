import Stripe from 'stripe';
import { ClientTier } from '@/types';

/**
 * 🔐 Server-side Stripe SDK initialization
 * 
 * IMPORTANT: Only use this on the server side (API routes, server components)
 * Never expose the secret key to the client!
 */

function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      '🔴 STRIPE_SECRET_KEY is not configured. ' +
      'Add it to your .env.local file and Vercel environment variables.'
    );
  }
  return key;
}

// Lazy initialization to prevent errors during build
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(getStripeSecretKey(), {
      apiVersion: '2023-10-16',
      typescript: true,
    });
  }
  return stripeInstance;
}

/**
 * Get the Stripe Price ID for a given tier
 */
export function getStripePriceId(tier: string): string {
  const priceMap: Record<string, string | undefined> = {
    pilot: process.env.STRIPE_PRICE_PILOT,
    t1: process.env.STRIPE_PRICE_T1,
    t2: process.env.STRIPE_PRICE_T2,
    vip: process.env.STRIPE_PRICE_VIP,
  };

  const priceId = priceMap[tier];
  if (!priceId) {
    throw new Error(
      `🔴 Stripe Price ID not found for tier: ${tier}. ` +
      `Make sure STRIPE_PRICE_${tier.toUpperCase()} is set in environment variables.`
    );
  }

  return priceId;
}

/**
 * Get the Stripe Product ID for a given tier
 */
export function getStripeProductId(tier: string): string {
  const productMap: Record<string, string | undefined> = {
    pilot: process.env.STRIPE_PRODUCT_PILOT,
    t1: process.env.STRIPE_PRODUCT_T1,
    t2: process.env.STRIPE_PRODUCT_T2,
    vip: process.env.STRIPE_PRODUCT_VIP,
  };

  const productId = productMap[tier];
  if (!productId) {
    throw new Error(
      `🔴 Stripe Product ID not found for tier: ${tier}. ` +
      `Make sure STRIPE_PRODUCT_${tier.toUpperCase()} is set in environment variables.`
    );
  }

  return productId;
}

/**
 * Get tier from Stripe Price ID
 */
export function getTierFromPriceId(priceId: string): ClientTier {
  const priceMap: Record<string, ClientTier> = {
    [process.env.STRIPE_PRICE_PILOT || '']: 'pilot',
    [process.env.STRIPE_PRICE_T1 || '']: 't1',
    [process.env.STRIPE_PRICE_T2 || '']: 't2',
    [process.env.STRIPE_PRICE_VIP || '']: 'vip',
  };
  return priceMap[priceId] || 'pilot';
}

/**
 * Check if a tier is a subscription (recurring) tier
 */
export function isSubscriptionTier(tier: ClientTier): boolean {
  return ['t1', 't2', 'vip'].includes(tier);
}

/**
 * Get the app URL for Stripe redirects
 */
export function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL;
  if (!url) {
    // Fallback for development
    return 'http://localhost:3000';
  }
  return url;
}

/**
 * Format amount from cents to display string
 */
export function formatAmount(amountInCents: number, currency = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100);
}

/**
 * Get all Stripe configuration for debugging
 */
export function getStripeConfig() {
  return {
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    prices: {
      pilot: process.env.STRIPE_PRICE_PILOT || 'NOT SET',
      t1: process.env.STRIPE_PRICE_T1 || 'NOT SET',
      t2: process.env.STRIPE_PRICE_T2 || 'NOT SET',
      vip: process.env.STRIPE_PRICE_VIP || 'NOT SET',
    },
    products: {
      pilot: process.env.STRIPE_PRODUCT_PILOT || 'NOT SET',
      t1: process.env.STRIPE_PRODUCT_T1 || 'NOT SET',
      t2: process.env.STRIPE_PRODUCT_T2 || 'NOT SET',
      vip: process.env.STRIPE_PRODUCT_VIP || 'NOT SET',
    },
    appUrl: getAppUrl(),
  };
}
