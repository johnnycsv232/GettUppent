import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';
import { Payment, PaymentStatus, PaymentType, ApiResponse } from '@/types';

const COLLECTION = 'payments';

/**
 * GET /api/admin/payments
 * List all payments with optional filtering
 */
export async function GET(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get('clientId');
    const status = searchParams.get('status') as PaymentStatus | null;
    const type = searchParams.get('type') as PaymentType | null;
    const limit = parseInt(searchParams.get('limit') || '100');

    let query = adminDb().collection(COLLECTION).orderBy('createdAt', 'desc');

    if (clientId) {
      query = query.where('clientId', '==', clientId);
    }
    if (status) {
      query = query.where('status', '==', status);
    }
    if (type) {
      query = query.where('type', '==', type);
    }

    const snapshot = await query.limit(limit).get();
    
    const payments: Payment[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Payment[];

    // Calculate totals
    const totals = {
      totalRevenue: payments
        .filter(p => p.status === 'succeeded' && p.type !== 'refund')
        .reduce((sum, p) => sum + p.amount, 0),
      totalRefunded: payments
        .filter(p => p.type === 'refund')
        .reduce((sum, p) => sum + Math.abs(p.amount), 0),
      totalPending: payments
        .filter(p => p.status === 'pending')
        .reduce((sum, p) => sum + p.amount, 0),
      count: payments.length,
    };

    const response: ApiResponse<{ payments: Payment[]; totals: typeof totals }> = {
      success: true,
      data: { payments, totals },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}
