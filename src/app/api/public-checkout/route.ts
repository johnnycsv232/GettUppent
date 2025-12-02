export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getStripe, getStripePriceId, getAppUrl } from '@/lib/stripe';
import { ClientTier } from '@/types';

// Price mapping for products that don't have Stripe Price IDs configured
const FALLBACK_PRICES: Record<string, number> = {
  pilot: 34500,        // $345 one-time
  t1: 44500,           // $445/mo
  t2: 69500,           // $695/mo
  vip: 99500,          // $995/mo
  crop_fitted: 3800,   // $38
  crop_relaxed: 3600,  // $36
  crop_bundle: 9900,   // $99
};

const PRODUCT_NAMES: Record<string, string> = {
  pilot: 'GettUpp Pilot Night - One-Time Photography Session ($345)',
  t1: 'GettUpp Tier 1 - Monthly Retainer (2 Shoots/mo)',
  t2: 'GettUpp Tier 2 - Monthly Retainer (4 Shoots/mo)',
  vip: 'GettUpp VIP - Monthly Retainer (Unlimited)',
  crop_fitted: 'GettUpp Girls Fitted Crop Top',
  crop_relaxed: 'GettUpp Girls Relaxed Crop Top',
  crop_bundle: 'GettUpp Girls Crop Top Bundle (3)',
};

/**
 * POST /api/public-checkout
 * Create a Stripe Checkout session for public purchases
 * No authentication required
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier, email } = body;

    if (!tier) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: tier/product' },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const appUrl = getAppUrl();
    
    let lineItems;
    const isSubscription = ['t1', 't2', 'vip'].includes(tier);
    
    try {
      // Try to get configured Stripe Price ID
      const priceId = getStripePriceId(tier);
      lineItems = [{ price: priceId, quantity: 1 }];
    } catch {
      // Fallback to dynamic pricing if Price ID not configured
      const amount = FALLBACK_PRICES[tier];
      const name = PRODUCT_NAMES[tier];
      
      if (!amount || !name) {
        return NextResponse.json(
          { success: false, error: 'Invalid product' },
          { status: 400 }
        );
      }

      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name,
            description: `GettUpp Entertainment - ${tier.toUpperCase()}`,
          },
          unit_amount: amount,
          ...(isSubscription ? { recurring: { interval: 'month' as const } } : {}),
        },
        quantity: 1,
      }];
    }

    // Create Checkout Session
    // 🔐 TAX COMPLIANCE: MN Nontaxable Advertising Exemption
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: isSubscription ? 'subscription' : 'payment',
      automatic_tax: { enabled: false }, // MN Advertising Services Exempt
      tax_id_collection: { enabled: false },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancelled`,
      customer_email: email || undefined,
      metadata: {
        tier,
        source: 'public_checkout',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    });
  } catch (error) {
    console.error('Error creating public checkout session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create checkout session. Stripe may not be configured.' },
      { status: 500 }
    );
  }
}
