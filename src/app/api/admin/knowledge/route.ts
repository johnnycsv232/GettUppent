import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/auth-api';
import { adminDb } from '@/lib/firebase-admin';
import { KnowledgeNode } from '@/types/knowledge';

// 🔐 GET - Fetch all knowledge nodes (requires auth)
export async function GET(req: NextRequest) {
    // Validate authentication
    const authResult = await validateAuth(req);
    if (!authResult.success) {
        return authResult.response;
    }

    try {
        const db = adminDb();
        const snapshot = await db.collection('knowledge_base').get();
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as KnowledgeNode[];
        
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching knowledge base:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

// 🔐 POST - Create new knowledge node (requires auth)
export async function POST(req: NextRequest) {
    // Validate authentication
    const authResult = await validateAuth(req);
    if (!authResult.success) {
        return authResult.response;
    }

    try {
        const db = adminDb();
        const body = await req.json();

        const newNode: Omit<KnowledgeNode, 'id'> = {
            ...body,
            timestamp_added: new Date().toISOString(),
            legacy_id: body.legacy_id || null,
            relevance_score: body.relevance_score || 1.0,
            status: body.status || 'active',
            version: body.version || 1,
            __source_file: 'admin_panel'
        };

        const docRef = await db.collection('knowledge_base').add(newNode);
        
        return NextResponse.json({ 
            success: true, 
            node: { id: docRef.id, ...newNode } 
        });

    } catch (error) {
        console.error('Error creating knowledge node:', error);
        return NextResponse.json({ success: false, error: 'Failed to create node' }, { status: 500 });
    }
}
