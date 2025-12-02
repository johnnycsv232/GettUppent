export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { adminDb } from '@/lib/firebase-admin';
import Stripe from 'stripe';
import { SubscriptionStatus } from '@/types';

/**
 * POST /api/webhooks/stripe
 * Handle ALL incoming Stripe webhook events
 * 
 * Required Stripe Events to subscribe in Stripe Dashboard:
 * - checkout.session.completed
 * - payment_intent.succeeded
 * - payment_intent.payment_failed
 * - customer.subscription.created
 * - customer.subscription.updated
 * - customer.subscription.deleted
 * - invoice.payment_succeeded
 * - invoice.payment_failed
 * - charge.refunded
 * - charge.dispute.created
 * - customer.created
 * - customer.updated
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    console.error('Webhook Error: Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('Webhook Error: STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  const stripe = getStripe();

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log(`📧 Stripe Webhook: ${event.type}`);

  try {
    switch (event.type) {
      // ============================================
      // CHECKOUT EVENTS
      // ============================================
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      // ============================================
      // PAYMENT INTENT EVENTS
      // ============================================
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      // ============================================
      // SUBSCRIPTION EVENTS
      // ============================================
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      // ============================================
      // INVOICE EVENTS (Recurring Payments)
      // ============================================
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      // ============================================
      // REFUND EVENTS
      // ============================================
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      // ============================================
      // DISPUTE EVENTS
      // ============================================
      case 'charge.dispute.created':
        await handleDisputeCreated(event.data.object as Stripe.Dispute);
        break;

      // ============================================
      // CUSTOMER EVENTS
      // ============================================
      case 'customer.created':
      case 'customer.updated':
        await handleCustomerUpdated(event.data.object as Stripe.Customer);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// ============================================
// CHECKOUT HANDLERS
// ============================================

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('✅ Checkout completed:', session.id);
  const db = adminDb();
  const now = new Date();

  const { clientId, tier, source } = session.metadata || {};
  
  // Handle public checkout (no clientId)
  if (!clientId && source === 'public_checkout') {
    // Create a new client from checkout
    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Unknown';
    
    const newClientRef = await db.collection('clients').add({
      name: customerName,
      email: customerEmail,
      tier: tier || 'pilot',
      status: 'active',
      amountPaid: session.amount_total ? session.amount_total / 100 : 0,
      stripeCustomerId: session.customer as string,
      stripePaymentIntentId: session.payment_intent as string,
      stripeSubscriptionId: session.subscription as string || null,
      source: 'public_checkout',
      createdAt: now,
      updatedAt: now,
    });
    
    console.log(`✅ New client created from public checkout: ${newClientRef.id}`);
    
    // Record the payment
    await recordPayment(db, {
      clientId: newClientRef.id,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      type: session.mode === 'subscription' ? 'subscription' : 'one_time',
      status: 'succeeded',
      stripePaymentIntentId: session.payment_intent as string,
      description: `GettUpp ${tier || 'Pilot'} - Checkout`,
      tier: tier as 'pilot' | 't1' | 't2' | 'vip',
    });
    
    return;
  }

  if (!clientId) {
    console.error('No clientId in session metadata');
    return;
  }

  // Update existing client
  const updateData: Record<string, unknown> = {
    status: 'active',
    amountPaid: session.amount_total ? session.amount_total / 100 : 0,
    stripePaymentIntentId: session.payment_intent as string,
    updatedAt: now,
  };

  if (tier) updateData.tier = tier;
  if (session.customer) updateData.stripeCustomerId = session.customer as string;
  if (session.subscription) updateData.stripeSubscriptionId = session.subscription as string;

  await db.collection('clients').doc(clientId).update(updateData);

  // Update invoice if exists
  const invoiceQuery = await db
    .collection('invoices')
    .where('stripeSessionId', '==', session.id)
    .limit(1)
    .get();

  if (!invoiceQuery.empty) {
    await invoiceQuery.docs[0].ref.update({
      status: 'paid',
      stripePaymentIntentId: session.payment_intent as string,
      stripeSubscriptionId: session.subscription as string || null,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      paidAt: now,
    });
  }

  // Record the payment
  await recordPayment(db, {
    clientId,
    amount: session.amount_total ? session.amount_total / 100 : 0,
    type: session.mode === 'subscription' ? 'subscription' : 'one_time',
    status: 'succeeded',
    stripePaymentIntentId: session.payment_intent as string,
    description: `GettUpp ${tier || 'Purchase'} - Checkout`,
    tier: tier as 'pilot' | 't1' | 't2' | 'vip',
  });

  console.log(`✅ Client ${clientId} activated with ${tier} tier`);
}

// ============================================
// PAYMENT HANDLERS
// ============================================

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('✅ Payment succeeded:', paymentIntent.id);
  // Main logic handled by checkout.session.completed
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('❌ Payment failed:', paymentIntent.id);
  console.log('Failure reason:', paymentIntent.last_payment_error?.message);

  const { clientId } = paymentIntent.metadata || {};
  if (clientId) {
    const db = adminDb();
    await db.collection('clients').doc(clientId).update({
      notes: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`,
      updatedAt: new Date(),
    });

    // Record failed payment
    await recordPayment(db, {
      clientId,
      amount: paymentIntent.amount / 100,
      type: 'one_time',
      status: 'failed',
      stripePaymentIntentId: paymentIntent.id,
      description: `Failed payment: ${paymentIntent.last_payment_error?.message || 'Unknown'}`,
    });
  }
}

// ============================================
// SUBSCRIPTION HANDLERS
// ============================================

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('🔄 Subscription created:', subscription.id);
  await syncSubscription(subscription);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('🔄 Subscription updated:', subscription.id);
  await syncSubscription(subscription);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('❌ Subscription deleted:', subscription.id);
  const db = adminDb();
  const now = new Date();

  // Find client by subscription ID
  const clientQuery = await db
    .collection('clients')
    .where('stripeSubscriptionId', '==', subscription.id)
    .limit(1)
    .get();

  if (!clientQuery.empty) {
    await clientQuery.docs[0].ref.update({
      status: 'cancelled',
      subscriptionStatus: 'canceled',
      cancelAtPeriodEnd: false,
      updatedAt: now,
    });
  }

  // Update subscription record
  const subQuery = await db
    .collection('subscriptions')
    .where('stripeSubscriptionId', '==', subscription.id)
    .limit(1)
    .get();

  if (!subQuery.empty) {
    await subQuery.docs[0].ref.update({
      status: 'canceled',
      canceledAt: now,
      updatedAt: now,
    });
  }
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const db = adminDb();
  const now = new Date();
  const status = subscription.status as SubscriptionStatus;

  // Find client by customer ID
  const clientQuery = await db
    .collection('clients')
    .where('stripeCustomerId', '==', subscription.customer)
    .limit(1)
    .get();

  if (!clientQuery.empty) {
    const clientDoc = clientQuery.docs[0];
    const clientStatus = status === 'active' ? 'active' : status === 'past_due' ? 'past_due' : 'pending';

    await clientDoc.ref.update({
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      status: clientStatus,
      updatedAt: now,
    });

    // Upsert subscription record
    const priceId = subscription.items.data[0]?.price?.id;
    const amount = subscription.items.data[0]?.price?.unit_amount || 0;
    const tier = getTierFromPriceId(priceId);

    const subQuery = await db
      .collection('subscriptions')
      .where('stripeSubscriptionId', '==', subscription.id)
      .limit(1)
      .get();

    const subData = {
      clientId: clientDoc.id,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      stripePriceId: priceId,
      status,
      tier,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      amount: amount / 100,
      currency: subscription.currency,
      interval: 'month' as const,
      updatedAt: now,
    };

    if (subQuery.empty) {
      await db.collection('subscriptions').add({ ...subData, createdAt: now });
    } else {
      await subQuery.docs[0].ref.update(subData);
    }
  }
}

// ============================================
// INVOICE HANDLERS (Recurring)
// ============================================

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('✅ Invoice payment succeeded:', invoice.id);
  const db = adminDb();
  const now = new Date();

  // Find client by customer ID
  const clientQuery = await db
    .collection('clients')
    .where('stripeCustomerId', '==', invoice.customer)
    .limit(1)
    .get();

  if (!clientQuery.empty) {
    const clientDoc = clientQuery.docs[0];
    const currentPaid = clientDoc.data().amountPaid || 0;

    await clientDoc.ref.update({
      amountPaid: currentPaid + (invoice.amount_paid / 100),
      status: 'active',
      updatedAt: now,
    });

    // Record the payment
    await recordPayment(db, {
      clientId: clientDoc.id,
      amount: invoice.amount_paid / 100,
      type: 'subscription',
      status: 'succeeded',
      stripeInvoiceId: invoice.id,
      stripeSubscriptionId: invoice.subscription as string,
      description: `Subscription payment - ${invoice.lines.data[0]?.description || 'Monthly'}`,
    });

    // Create invoice record
    await db.collection('invoices').add({
      clientId: clientDoc.id,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      status: 'paid',
      stripeInvoiceId: invoice.id,
      stripeSubscriptionId: invoice.subscription as string,
      description: `Subscription Invoice - ${new Date(invoice.period_start * 1000).toLocaleDateString()}`,
      tier: clientDoc.data().tier,
      createdAt: new Date(invoice.created * 1000),
      paidAt: now,
    });
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('❌ Invoice payment failed:', invoice.id);
  const db = adminDb();
  const now = new Date();

  const clientQuery = await db
    .collection('clients')
    .where('stripeCustomerId', '==', invoice.customer)
    .limit(1)
    .get();

  if (!clientQuery.empty) {
    const clientDoc = clientQuery.docs[0];

    await clientDoc.ref.update({
      status: 'past_due',
      subscriptionStatus: 'past_due',
      notes: `Invoice payment failed: ${invoice.id}`,
      updatedAt: now,
    });

    // Record failed payment
    await recordPayment(db, {
      clientId: clientDoc.id,
      amount: invoice.amount_due / 100,
      type: 'subscription',
      status: 'failed',
      stripeInvoiceId: invoice.id,
      description: `Failed subscription payment`,
    });
  }
}

// ============================================
// REFUND HANDLERS
// ============================================

async function handleChargeRefunded(charge: Stripe.Charge) {
  console.log('💰 Charge refunded:', charge.id);
  const db = adminDb();
  const now = new Date();

  // Find payment by charge ID
  const paymentQuery = await db
    .collection('payments')
    .where('stripeChargeId', '==', charge.id)
    .limit(1)
    .get();

  if (!paymentQuery.empty) {
    const isFullRefund = charge.refunded;
    await paymentQuery.docs[0].ref.update({
      status: isFullRefund ? 'refunded' : 'partially_refunded',
      refundedAmount: charge.amount_refunded / 100,
      updatedAt: now,
    });
  }

  // Update client if customer found
  if (charge.customer) {
    const clientQuery = await db
      .collection('clients')
      .where('stripeCustomerId', '==', charge.customer)
      .limit(1)
      .get();

    if (!clientQuery.empty) {
      const clientDoc = clientQuery.docs[0];
      const currentPaid = clientDoc.data().amountPaid || 0;
      const refundAmount = charge.amount_refunded / 100;

      await clientDoc.ref.update({
        amountPaid: Math.max(0, currentPaid - refundAmount),
        notes: `Refund processed: $${refundAmount}`,
        updatedAt: now,
      });

      // Record refund
      await recordPayment(db, {
        clientId: clientDoc.id,
        amount: -refundAmount,
        type: 'refund',
        status: 'succeeded',
        stripeChargeId: charge.id,
        description: `Refund for charge ${charge.id}`,
        refundedAmount: refundAmount,
      });
    }
  }
}

// ============================================
// DISPUTE HANDLERS
// ============================================

async function handleDisputeCreated(dispute: Stripe.Dispute) {
  console.log('⚠️ Dispute created:', dispute.id);
  const db = adminDb();
  const now = new Date();

  // Log dispute for admin review
  await db.collection('disputes').add({
    stripeDisputeId: dispute.id,
    stripeChargeId: dispute.charge,
    amount: dispute.amount / 100,
    currency: dispute.currency,
    reason: dispute.reason,
    status: dispute.status,
    createdAt: now,
  });

  // Find and flag client
  if (dispute.charge) {
    const stripe = getStripe();
    const charge = await stripe.charges.retrieve(dispute.charge as string);
    
    if (charge.customer) {
      const clientQuery = await db
        .collection('clients')
        .where('stripeCustomerId', '==', charge.customer)
        .limit(1)
        .get();

      if (!clientQuery.empty) {
        await clientQuery.docs[0].ref.update({
          notes: `⚠️ DISPUTE: ${dispute.reason} - Amount: $${dispute.amount / 100}`,
          updatedAt: now,
        });
      }
    }
  }
}

// ============================================
// CUSTOMER HANDLERS
// ============================================

async function handleCustomerUpdated(customer: Stripe.Customer) {
  console.log('👤 Customer updated:', customer.id);
  const db = adminDb();

  const clientQuery = await db
    .collection('clients')
    .where('stripeCustomerId', '==', customer.id)
    .limit(1)
    .get();

  if (!clientQuery.empty && customer.email) {
    await clientQuery.docs[0].ref.update({
      email: customer.email,
      name: customer.name || clientQuery.docs[0].data().name,
      updatedAt: new Date(),
    });
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getTierFromPriceId(priceId: string | undefined): 'pilot' | 't1' | 't2' | 'vip' {
  const priceMap: Record<string, 'pilot' | 't1' | 't2' | 'vip'> = {
    [process.env.STRIPE_PRICE_PILOT || '']: 'pilot',
    [process.env.STRIPE_PRICE_T1 || '']: 't1',
    [process.env.STRIPE_PRICE_T2 || '']: 't2',
    [process.env.STRIPE_PRICE_VIP || '']: 'vip',
  };
  return priceMap[priceId || ''] || 'pilot';
}

interface PaymentRecord {
  clientId: string;
  amount: number;
  type: 'one_time' | 'subscription' | 'refund';
  status: 'succeeded' | 'pending' | 'failed' | 'refunded' | 'partially_refunded';
  stripePaymentIntentId?: string;
  stripeChargeId?: string;
  stripeInvoiceId?: string;
  stripeSubscriptionId?: string;
  description: string;
  tier?: 'pilot' | 't1' | 't2' | 'vip';
  refundedAmount?: number;
}

async function recordPayment(db: FirebaseFirestore.Firestore, data: PaymentRecord) {
  const now = new Date();
  await db.collection('payments').add({
    ...data,
    currency: 'usd',
    createdAt: now,
    updatedAt: now,
  });
}
