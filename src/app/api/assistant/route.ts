export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        return NextResponse.json(
            { message: 'Assistant endpoint - implementation in progress' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
