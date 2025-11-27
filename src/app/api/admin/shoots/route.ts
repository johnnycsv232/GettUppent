import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';
import { Shoot, ShootStatus, ShootType, ApiResponse } from '@/types';

const COLLECTION = 'shoots';

/**
 * GET /api/admin/shoots
 * List all shoots with optional filtering
 */
export async function GET(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as ShootStatus | null;
    const clientId = searchParams.get('clientId');
    const upcoming = searchParams.get('upcoming') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = adminDb().collection(COLLECTION).orderBy('scheduledDate', 'asc');

    if (status) {
      query = query.where('status', '==', status);
    }
    if (clientId) {
      query = query.where('clientId', '==', clientId);
    }
    if (upcoming) {
      query = query.where('scheduledDate', '>=', new Date());
    }

    const snapshot = await query.limit(limit).get();
    
    const shoots: Shoot[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      scheduledDate: doc.data().scheduledDate?.toDate(),
      deliveryDeadline: doc.data().deliveryDeadline?.toDate(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      completedAt: doc.data().completedAt?.toDate(),
    })) as Shoot[];

    const response: ApiResponse<Shoot[]> = {
      success: true,
      data: shoots,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching shoots:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shoots' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/shoots
 * Create a new shoot for a client
 */
export async function POST(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const body = await req.json();
    
    // Validate required fields
    const { clientId, type, scheduledDate } = body;
    if (!clientId || !type || !scheduledDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: clientId, type, scheduledDate' },
        { status: 400 }
      );
    }

    // Validate shoot type
    const validTypes: ShootType[] = ['pilot', 'standard', 'premium', 'vip'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Verify client exists
    const clientDoc = await adminDb().collection('clients').doc(clientId).get();
    if (!clientDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    // Set default values based on shoot type
    const typeDefaults: Record<ShootType, { duration: number; totalImages: number }> = {
      pilot: { duration: 60, totalImages: 10 },
      standard: { duration: 120, totalImages: 25 },
      premium: { duration: 180, totalImages: 50 },
      vip: { duration: 480, totalImages: 100 },
    };

    const defaults = typeDefaults[type as ShootType];
    const now = new Date();
    const scheduled = new Date(scheduledDate);
    
    // Calculate delivery deadline (5 days after shoot by default)
    const deliveryDeadline = body.deliveryDeadline 
      ? new Date(body.deliveryDeadline)
      : new Date(scheduled.getTime() + 5 * 24 * 60 * 60 * 1000);

    const shootData: Omit<Shoot, 'id'> = {
      clientId,
      type,
      status: 'scheduled',
      scheduledDate: scheduled,
      location: body.location || null,
      duration: body.duration || defaults.duration,
      totalImages: body.totalImages || defaults.totalImages,
      deliveredImages: 0,
      deliveryDeadline,
      photographerId: body.photographerId || null,
      photographerName: body.photographerName || null,
      notes: body.notes || null,
      clientNotes: body.clientNotes || null,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await adminDb().collection(COLLECTION).add(shootData);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: docRef.id },
      message: 'Shoot scheduled successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating shoot:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create shoot' },
      { status: 500 }
    );
  }
}
