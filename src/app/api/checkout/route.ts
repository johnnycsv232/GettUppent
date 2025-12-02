export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getStripe, getStripePriceId, getAppUrl } from '@/lib/stripe';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';
import { ClientTier } from '@/types';

/**
 * POST /api/checkout
 * Create a Stripe Checkout session for a client
 * 
 * Body: { clientId: string, tier: ClientTier }
 */
export async function POST(req: NextRequest) {
  // Optional: Allow admin to create checkout for clients
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const body = await req.json();
    const { clientId, tier } = body;

    if (!clientId || !tier) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: clientId, tier' },
        { status: 400 }
      );
    }

    // Validate tier
    const validTiers: ClientTier[] = ['pilot', 't1', 't2', 'vip'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { success: false, error: `Invalid tier. Must be one of: ${validTiers.join(', ')}` },
        { status: 400 }
      );
    }

    // Get client from Firestore
    const clientDoc = await adminDb().collection('clients').doc(clientId).get();
    if (!clientDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    const client = clientDoc.data();
    const priceId = getStripePriceId(tier);
    const stripe = getStripe();
    const appUrl = getAppUrl();

    // Create or retrieve Stripe customer
    let customerId = client?.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: client?.email,
        name: client?.name,
        metadata: {
          clientId,
          source: 'gettupp-os',
        },
      });
      customerId = customer.id;

      // Save Stripe customer ID to client record
      await adminDb().collection('clients').doc(clientId).update({
        stripeCustomerId: customerId,
        updatedAt: new Date(),
      });
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancelled`,
      metadata: {
        clientId,
        tier,
      },
    });

    // Create invoice record in Firestore
    await adminDb().collection('invoices').add({
      clientId,
      stripeSessionId: session.id,
      tier,
      amount: 0, // Will be updated by webhook
      currency: 'usd',
      status: 'sent',
      description: `GettUpp ${tier.charAt(0).toUpperCase() + tier.slice(1)} Package`,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
