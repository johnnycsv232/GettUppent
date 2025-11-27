import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';
import { Invoice, InvoiceStatus, ApiResponse } from '@/types';

const COLLECTION = 'invoices';

/**
 * GET /api/admin/invoices
 * List all invoices with optional filtering
 */
export async function GET(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as InvoiceStatus | null;
    const clientId = searchParams.get('clientId');
    const limit = parseInt(searchParams.get('limit') || '100');

    let query = adminDb().collection(COLLECTION).orderBy('createdAt', 'desc');

    if (status) {
      query = query.where('status', '==', status);
    }
    if (clientId) {
      query = query.where('clientId', '==', clientId);
    }

    const snapshot = await query.limit(limit).get();
    
    const invoices: Invoice[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      paidAt: doc.data().paidAt?.toDate(),
    })) as Invoice[];

    const response: ApiResponse<Invoice[]> = {
      success: true,
      data: invoices,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}
