import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { KnowledgeNode } from '@/types/knowledge';

// Path to the JSON file
const DATA_FILE_PATH = path.join(process.cwd(), 'GETTUPP_MASTER_UNIFIED_Q4_2025_FULL_with_GettUpp_Girls.json');

// Helper to read data
function readData(): KnowledgeNode[] {
    try {
        const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf8');
        return JSON.parse(fileContents) as KnowledgeNode[];
    } catch (error) {
        console.error('Error reading knowledge base:', error);
        return [];
    }
}

// Helper to write data
function writeData(data: KnowledgeNode[]) {
    try {
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing knowledge base:', error);
        return false;
    }
}

export async function GET() {
    const data = readData();
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = readData();

        // Generate a simple ID if not provided (or better, use UUID)
        // For now, we'll just use a timestamp-based ID for simplicity
        const newId = `node_${Date.now()}`;

        const newNode: KnowledgeNode = {
            ...body,
            id: newId,
            timestamp_added: new Date().toISOString(),
            // Default fields if missing
            legacy_id: null,
            relevance_score: 1.0,
            status: 'active',
            version: 1,
            __source_file: 'manual_entry'
        };

        data.push(newNode);

        if (writeData(data)) {
            return NextResponse.json({ success: true, node: newNode });
        } else {
            return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
        }

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
}
