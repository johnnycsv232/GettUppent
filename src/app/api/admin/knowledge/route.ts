import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '@/lib/auth-api';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { KnowledgeNode } from '@/types/knowledge';

// 🔐 GET - Fetch all knowledge nodes (requires auth)
export async function GET(req: NextRequest) {
    // Validate authentication
    const authResult = await validateAuth(req);
    if (!authResult.success) {
        return authResult.response;
    }

    try {
        const snapshot = await getDocs(collection(db, 'knowledge_base'));
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

        const docRef = await addDoc(collection(db, 'knowledge_base'), newNode);
        
        return NextResponse.json({ 
            success: true, 
            node: { id: docRef.id, ...newNode } 
        });

    } catch (error) {
        console.error('Error creating knowledge node:', error);
        return NextResponse.json({ success: false, error: 'Failed to create node' }, { status: 500 });
    }
}
