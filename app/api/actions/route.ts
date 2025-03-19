import { NextRequest, NextResponse } from 'next/server';
import { ACTIONS } from '@/constants/actions.constants';

export async function GET(req: NextRequest) {
    return NextResponse.json(ACTIONS, { status: 200 });
}
