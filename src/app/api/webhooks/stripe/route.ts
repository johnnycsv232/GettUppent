import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase-admin';
import Stripe from 'stripe';

/**
 * POST /api/webhooks/stripe
 * Handle incoming Stripe webhook events
 * 
 * Required Stripe Events to subscribe:
 * - checkout.session.completed
 * - payment_intent.succeeded
 * - payment_intent.payment_failed
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    console.error('Webhook Error: Missing stripe-signature header');
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('Webhook Error: STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;
  const stripe = getStripe();

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  console.log(`📧 Stripe Webhook: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout session completion
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('✅ Checkout completed:', session.id);

  const { clientId, tier } = session.metadata || {};
  if (!clientId) {
    console.error('No clientId in session metadata');
    return;
  }

  const now = new Date();
  const db = adminDb();

  // Update client status and payment info
  await db.collection('clients').doc(clientId).update({
    status: 'active',
    amountPaid: session.amount_total ? session.amount_total / 100 : 0,
    stripePaymentIntentId: session.payment_intent as string,
    tier: tier || undefined,
    updatedAt: now,
  });

  // Update invoice status
  const invoiceQuery = await db
    .collection('invoices')
    .where('stripeSessionId', '==', session.id)
    .limit(1)
    .get();

  if (!invoiceQuery.empty) {
    const invoiceDoc = invoiceQuery.docs[0];
    await invoiceDoc.ref.update({
      status: 'paid',
      stripePaymentIntentId: session.payment_intent as string,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      paidAt: now,
    });
  }

  console.log(`✅ Client ${clientId} activated with ${tier} tier`);
}

/**
 * Handle successful payment intent
 */
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('✅ Payment succeeded:', paymentIntent.id);
  
  // Additional handling if needed
  // The checkout.session.completed event usually handles the main logic
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('❌ Payment failed:', paymentIntent.id);
  console.log('Failure reason:', paymentIntent.last_payment_error?.message);

  // Update any related records if needed
  const { clientId } = paymentIntent.metadata || {};
  if (clientId) {
    await adminDb().collection('clients').doc(clientId).update({
      notes: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`,
      updatedAt: new Date(),
    });
  }
}
