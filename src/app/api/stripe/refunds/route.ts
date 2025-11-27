import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';

/**
 * POST /api/stripe/refunds
 * Create a refund for a payment
 * 
 * Body: { 
 *   paymentIntentId: string, 
 *   amount?: number (in dollars, optional for partial refund),
 *   reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
 * }
 */
export async function POST(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const body = await req.json();
    const { paymentIntentId, amount, reason } = body;

    if (!paymentIntentId) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: paymentIntentId' },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Create refund
    const refundParams: {
      payment_intent: string;
      amount?: number;
      reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
    } = {
      payment_intent: paymentIntentId,
    };

    // Convert dollars to cents for partial refund
    if (amount) {
      refundParams.amount = Math.round(amount * 100);
    }

    if (reason) {
      refundParams.reason = reason;
    }

    const refund = await stripe.refunds.create(refundParams);

    // The webhook will handle updating Firestore records
    // But we can also update immediately for responsiveness

    return NextResponse.json({
      success: true,
      data: {
        refundId: refund.id,
        amount: refund.amount / 100,
        status: refund.status,
        reason: refund.reason,
      },
      message: `Refund of $${refund.amount / 100} processed successfully`,
    });
  } catch (error: unknown) {
    console.error('Error creating refund:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create refund';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * GET /api/stripe/refunds
 * List refunds for a payment intent
 */
export async function GET(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(req.url);
    const paymentIntentId = searchParams.get('paymentIntentId');
    const limit = parseInt(searchParams.get('limit') || '10');

    const stripe = getStripe();

    const params: { limit: number; payment_intent?: string } = { limit };
    if (paymentIntentId) {
      params.payment_intent = paymentIntentId;
    }

    const refunds = await stripe.refunds.list(params);

    return NextResponse.json({
      success: true,
      data: refunds.data.map(r => ({
        id: r.id,
        amount: r.amount / 100,
        status: r.status,
        reason: r.reason,
        created: new Date(r.created * 1000),
        paymentIntentId: r.payment_intent,
      })),
    });
  } catch (error) {
    console.error('Error fetching refunds:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch refunds' },
      { status: 500 }
    );
  }
}
