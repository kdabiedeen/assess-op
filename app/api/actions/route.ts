import { NextRequest, NextResponse } from 'next/server';
import { actions } from '@/utils/actions.constants';

export async function GET(req: NextRequest) {
  return NextResponse.json(actions, { status: 200 });
}