import { NextRequest, NextResponse } from 'next/server';
import { EVENTS } from '@/constants/events.constants';

export async function GET(req: NextRequest) {
    return NextResponse.json(EVENTS, { status: 200 });
}
