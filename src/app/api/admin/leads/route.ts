export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';
import { ApiResponse } from '@/types';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  instagram?: string;
  venue?: string;
  status: string;
  qualificationScore?: number;
  createdAt: Date;
}

/**
 * GET /api/admin/leads
 * List all leads with optional filtering by status
 */
export async function GET(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = adminDb().collection('leads').orderBy('createdAt', 'desc');

    // Map frontend status to backend if needed
    if (status) {
      // Handle both old format (Qualified) and new format (qualified)
      const statusValue = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      query = query.where('status', '==', statusValue);
    }

    const snapshot = await query.limit(limit).get();
    
    const leads: Lead[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Lead[];

    const response: ApiResponse<{ leads: Lead[] }> = {
      success: true,
      data: { leads },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/leads
 * Create a new lead manually
 */
export async function POST(req: NextRequest) {
  const authResult = await validateAuth(req);
  if (!authResult.success) return authResult.response;

  try {
    const body = await req.json();
    
    const { name, email, venue } = body;
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email' },
        { status: 400 }
      );
    }

    const now = new Date();
    const leadData = {
      name,
      email,
      phone: body.phone || null,
      instagram: body.instagram || null,
      venue: venue || body.name,
      status: body.status || 'Pending',
      qualificationScore: body.qualificationScore || 50,
      source: body.source || 'admin_manual',
      notes: body.notes || null,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await adminDb().collection('leads').add(leadData);

    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: docRef.id },
      message: 'Lead created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
