import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';
import { Client, ClientStatus, ClientTier, ApiResponse } from '@/types';

const COLLECTION = 'clients';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/clients/[id]
 * Get a single client by ID
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { id } = await params;
    const doc = await adminDb().collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    const data = doc.data();
    const client: Client = {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt?.toDate(),
      updatedAt: data?.updatedAt?.toDate(),
      convertedAt: data?.convertedAt?.toDate(),
    } as Client;

    const response: ApiResponse<Client> = {
      success: true,
      data: client,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching client:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/clients/[id]
 * Update a client
 */
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { id } = await params;
    const body = await req.json();

    // Check if client exists
    const docRef = adminDb().collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    // Validate status if provided
    if (body.status) {
      const validStatuses: ClientStatus[] = ['pending', 'active', 'completed', 'cancelled'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Validate tier if provided
    if (body.tier) {
      const validTiers: ClientTier[] = ['pilot', 't1', 't2', 'vip'];
      if (!validTiers.includes(body.tier)) {
        return NextResponse.json(
          { success: false, error: `Invalid tier. Must be one of: ${validTiers.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Build update object (only include fields that are provided)
    const updateData: Partial<Client> & { updatedAt: Date } = {
      updatedAt: new Date(),
    };

    const allowedFields = [
      'name', 'email', 'phone', 'instagram', 'tier', 'status',
      'amountPaid', 'stripeCustomerId', 'stripePaymentIntentId', 'notes'
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        (updateData as Record<string, unknown>)[field] = body[field];
      }
    }

    await docRef.update(updateData);

    const response: ApiResponse = {
      success: true,
      message: 'Client updated successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating client:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/clients/[id]
 * Delete a client (soft delete by setting status to cancelled)
 */
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { id } = await params;
    const docRef = adminDb().collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    // Soft delete: mark as cancelled rather than actually deleting
    await docRef.update({
      status: 'cancelled',
      updatedAt: new Date(),
    });

    const response: ApiResponse = {
      success: true,
      message: 'Client deleted (marked as cancelled)',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting client:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}
