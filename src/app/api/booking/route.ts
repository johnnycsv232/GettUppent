export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

/**
 * POST /api/booking
 * Public endpoint for submitting booking requests from the schedule form
 * Creates a new lead in Firestore
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const { 
      name, 
      contactName,
      email, 
      phone, 
      tier,
      notes,
      source = 'website_schedule'
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Create lead document
    const leadData = {
      name,
      contactName: contactName || name,
      email,
      phone: phone || null,
      venue: name,
      tier: tier || 'pilot',
      source,
      notes: notes || '',
      status: 'New',
      qualificationScore: tier === 'vip' ? 90 : tier === 't2' ? 75 : tier === 't1' ? 60 : 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await adminDb().collection('leads').add(leadData);

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        message: 'Booking request received! We will contact you within 24 hours.'
      }
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit booking request' },
      { status: 500 }
    );
  }
}
