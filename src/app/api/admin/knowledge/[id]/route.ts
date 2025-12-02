export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';
import { KnowledgeNode } from '@/types/knowledge';

// 🔐 PUT - Update knowledge node (requires auth)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    // Validate authentication
    const authResult = await validateAuth(req);
    if (!authResult.success) {
        return authResult.response;
    }

    try {
        const db = adminDb();
        const id = params.id;
        const body = await req.json();
        
        const docRef = db.collection('knowledge_base').doc(id);
        const docSnap = await docRef.get();
        
        if (!docSnap.exists) {
            return NextResponse.json({ success: false, error: 'Node not found' }, { status: 404 });
        }

        // Update the node
        await docRef.update({
            ...body,
            updated_at: new Date().toISOString()
        });
        
        // Fetch updated document
        const updatedSnap = await docRef.get();
        const updatedNode = { id: updatedSnap.id, ...updatedSnap.data() } as KnowledgeNode;

        return NextResponse.json({ success: true, node: updatedNode });

    } catch (error) {
        console.error('Error updating knowledge node:', error);
        return NextResponse.json({ success: false, error: 'Failed to update node' }, { status: 500 });
    }
}

// 🔐 DELETE - Remove knowledge node (requires auth)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    // Validate authentication
    const authResult = await validateAuth(req);
    if (!authResult.success) {
        return authResult.response;
    }

    try {
        const db = adminDb();
        const id = params.id;
        const docRef = db.collection('knowledge_base').doc(id);
        const docSnap = await docRef.get();
        
        if (!docSnap.exists) {
            return NextResponse.json({ success: false, error: 'Node not found' }, { status: 404 });
        }

        await docRef.delete();
        
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error deleting knowledge node:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete node' }, { status: 500 });
    }
}
