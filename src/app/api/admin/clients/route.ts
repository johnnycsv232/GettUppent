export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';
import { Client, ClientStatus, ClientTier, ApiResponse } from '@/types';

const COLLECTION = 'clients';

/**
 * GET /api/admin/clients
 * List all clients with optional filtering
 */
export async function GET(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as ClientStatus | null;
    const tier = searchParams.get('tier') as ClientTier | null;
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = adminDb().collection(COLLECTION).orderBy('createdAt', 'desc');

    if (status) {
      query = query.where('status', '==', status);
    }
    if (tier) {
      query = query.where('tier', '==', tier);
    }

    const snapshot = await query.limit(limit).get();
    
    const clients: Client[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      convertedAt: doc.data().convertedAt?.toDate(),
    })) as Client[];

    const response: ApiResponse<Client[]> = {
      success: true,
      data: clients,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/clients
 * Create a new client (typically from lead conversion)
 */
export async function POST(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const body = await req.json();
    
    // Validate required fields
    const { name, email, tier, source } = body;
    if (!name || !email || !tier) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, tier' },
        { status: 400 }
      );
    }

    // Validate tier
    const validTiers: ClientTier[] = ['pilot', 't1', 't2', 'vip'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { success: false, error: `Invalid tier. Must be one of: ${validTiers.join(', ')}` },
        { status: 400 }
      );
    }

    const now = new Date();
    const clientData: Omit<Client, 'id'> = {
      name,
      email,
      phone: body.phone || null,
      instagram: body.instagram || null,
      tier,
      status: 'pending',
      amountPaid: 0,
      stripeCustomerId: body.stripeCustomerId || null,
      leadId: body.leadId || null,
      source: source || 'direct',
      notes: body.notes || null,
      createdAt: now,
      updatedAt: now,
      convertedAt: body.leadId ? now : undefined,
    };

    const docRef = await adminDb().collection(COLLECTION).add(clientData);

    // If this was a lead conversion, update the lead status
    if (body.leadId) {
      await adminDb().collection('leads').doc(body.leadId).update({
        status: 'converted',
        convertedToClientId: docRef.id,
        updatedAt: now,
      });
    }

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: docRef.id },
      message: 'Client created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create client' },
      { status: 500 }
    );
  }
}
