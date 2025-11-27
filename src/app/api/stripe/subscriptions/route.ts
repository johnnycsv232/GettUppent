import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';

/**
 * GET /api/stripe/subscriptions
 * List all subscriptions with optional filtering
 */
export async function GET(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get('clientId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = adminDb().collection('subscriptions').orderBy('createdAt', 'desc');

    if (clientId) {
      query = query.where('clientId', '==', clientId);
    }
    if (status) {
      query = query.where('status', '==', status);
    }

    const snapshot = await query.limit(limit).get();
    
    const subscriptions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      currentPeriodStart: doc.data().currentPeriodStart?.toDate(),
      currentPeriodEnd: doc.data().currentPeriodEnd?.toDate(),
      canceledAt: doc.data().canceledAt?.toDate(),
    }));

    return NextResponse.json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/stripe/subscriptions
 * Create a new subscription for a client
 * 
 * Body: { clientId: string, priceId: string }
 */
export async function POST(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const body = await req.json();
    const { clientId, priceId, tier } = body;

    if (!clientId || !priceId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: clientId, priceId' },
        { status: 400 }
      );
    }

    // Get client
    const clientDoc = await adminDb().collection('clients').doc(clientId).get();
    if (!clientDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    const client = clientDoc.data();
    const stripe = getStripe();

    // Create or get Stripe customer
    let customerId = client?.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: client?.email,
        name: client?.name,
        metadata: { clientId, source: 'gettupp-os' },
      });
      customerId = customer.id;

      await adminDb().collection('clients').doc(clientId).update({
        stripeCustomerId: customerId,
        updatedAt: new Date(),
      });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: { clientId, tier },
    });

    const invoice = subscription.latest_invoice as import('stripe').Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as import('stripe').Stripe.PaymentIntent;

    return NextResponse.json({
      success: true,
      data: {
        subscriptionId: subscription.id,
        clientSecret: paymentIntent?.client_secret,
        status: subscription.status,
      },
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/stripe/subscriptions
 * Update a subscription (cancel, change plan, etc.)
 * 
 * Body: { subscriptionId: string, action: 'cancel' | 'resume' | 'change_plan', priceId?: string }
 */
export async function PATCH(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const body = await req.json();
    const { subscriptionId, action, priceId } = body;

    if (!subscriptionId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: subscriptionId, action' },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    let subscription;

    switch (action) {
      case 'cancel':
        // Cancel at period end (graceful)
        subscription = await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
        });
        break;

      case 'cancel_immediately':
        // Cancel immediately
        subscription = await stripe.subscriptions.cancel(subscriptionId);
        break;

      case 'resume':
        // Resume a cancelled subscription
        subscription = await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: false,
        });
        break;

      case 'change_plan':
        if (!priceId) {
          return NextResponse.json(
            { success: false, error: 'priceId required for plan change' },
            { status: 400 }
          );
        }
        
        const currentSub = await stripe.subscriptions.retrieve(subscriptionId);
        subscription = await stripe.subscriptions.update(subscriptionId, {
          items: [{
            id: currentSub.items.data[0].id,
            price: priceId,
          }],
          proration_behavior: 'create_prorations',
        });
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: {
        subscriptionId: subscription.id,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}
