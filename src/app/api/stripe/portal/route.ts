import { NextRequest, NextResponse } from 'next/server';
import { getStripe, getAppUrl } from '@/lib/stripe';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';

/**
 * POST /api/stripe/portal
 * Create a Stripe Customer Portal session for self-service subscription management
 * 
 * Body: { clientId: string }
 */
export async function POST(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const body = await req.json();
    const { clientId } = body;

    if (!clientId) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: clientId' },
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
    const stripeCustomerId = client?.stripeCustomerId;

    if (!stripeCustomerId) {
      return NextResponse.json(
        { success: false, error: 'Client does not have a Stripe customer ID' },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const appUrl = getAppUrl();

    // Create Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${appUrl}/admin/clients/${clientId}`,
    });

    return NextResponse.json({
      success: true,
      data: {
        url: session.url,
      },
    });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
