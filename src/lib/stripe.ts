import Stripe from 'stripe';

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
