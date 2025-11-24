import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { KnowledgeNode } from '@/types/knowledge';

const DATA_FILE_PATH = path.join(process.cwd(), 'GETTUPP_MASTER_UNIFIED_Q4_2025_FULL_with_GettUpp_Girls.json');

function readData(): KnowledgeNode[] {
    try {
        const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf8');
        return JSON.parse(fileContents) as KnowledgeNode[];
    } catch (error) {
        console.error('Error reading knowledge base:', error);
        return [];
    }
}

function writeData(data: KnowledgeNode[]) {
    try {
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing knowledge base:', error);
        return false;
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const body = await req.json();
        const data = readData();

        const index = data.findIndex(n => n.id === id);
        if (index === -1) {
            return NextResponse.json({ success: false, error: 'Node not found' }, { status: 404 });
        }

        // Update the node
        data[index] = { ...data[index], ...body };

        if (writeData(data)) {
            return NextResponse.json({ success: true, node: data[index] });
        } else {
            return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    let data = readData();

    const initialLength = data.length;
    data = data.filter(n => n.id !== id);

    if (data.length === initialLength) {
        return NextResponse.json({ success: false, error: 'Node not found' }, { status: 404 });
    }

    if (writeData(data)) {
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
    }
}
