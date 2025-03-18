import { NextRequest, NextResponse } from 'next/server';
import { events } from '@/utils/events.constants';

export async function GET(req: NextRequest) {
  return NextResponse.json(events, { status: 200 });
}