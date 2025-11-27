import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';
import { Shoot, ShootStatus, ShootType, ApiResponse } from '@/types';

const COLLECTION = 'shoots';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/shoots/[id]
 * Get a single shoot by ID
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { id } = await params;
    const doc = await adminDb().collection(COLLECTION).doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Shoot not found' },
        { status: 404 }
      );
    }

    const data = doc.data();
    const shoot: Shoot = {
      id: doc.id,
      ...data,
      scheduledDate: data?.scheduledDate?.toDate(),
      deliveryDeadline: data?.deliveryDeadline?.toDate(),
      createdAt: data?.createdAt?.toDate(),
      updatedAt: data?.updatedAt?.toDate(),
      completedAt: data?.completedAt?.toDate(),
    } as Shoot;

    const response: ApiResponse<Shoot> = {
      success: true,
      data: shoot,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching shoot:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shoot' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/shoots/[id]
 * Update a shoot
 */
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { id } = await params;
    const body = await req.json();

    // Check if shoot exists
    const docRef = adminDb().collection(COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, error: 'Shoot not found' },
        { status: 404 }
      );
    }

    // Validate status if provided
    if (body.status) {
      const validStatuses: ShootStatus[] = [
        'scheduled', 'confirmed', 'in_progress', 'completed', 'delivered', 'cancelled'
      ];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Validate type if provided
    if (body.type) {
      const validTypes: ShootType[] = ['pilot', 'standard', 'premium', 'vip'];
      if (!validTypes.includes(body.type)) {
        return NextResponse.json(
          { success: false, error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Build update object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    const allowedFields = [
      'status', 'type', 'scheduledDate', 'location', 'duration',
      'totalImages', 'deliveredImages', 'deliveryDeadline',
      'photographerId', 'photographerName', 'notes', 'clientNotes'
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        // Convert date strings to Date objects
        if (['scheduledDate', 'deliveryDeadline'].includes(field) && body[field]) {
          updateData[field] = new Date(body[field]);
        } else {
          updateData[field] = body[field];
        }
      }
    }

    // Set completedAt if status is being set to completed or delivered
    if (body.status === 'completed' || body.status === 'delivered') {
      const currentData = doc.data();
      if (!currentData?.completedAt) {
        updateData.completedAt = new Date();
      }
    }

    await docRef.update(updateData);

    const response: ApiResponse = {
      success: true,
      message: 'Shoot updated successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating shoot:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update shoot' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/shoots/[id]
 * Cancel a shoot
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
        { success: false, error: 'Shoot not found' },
        { status: 404 }
      );
    }

    // Soft delete: mark as cancelled
    await docRef.update({
      status: 'cancelled',
      updatedAt: new Date(),
    });

    const response: ApiResponse = {
      success: true,
      message: 'Shoot cancelled successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error cancelling shoot:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel shoot' },
      { status: 500 }
    );
  }
}
