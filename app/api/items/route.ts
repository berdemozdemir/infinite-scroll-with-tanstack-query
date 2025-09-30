import { ITEMS, LIMIT } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '0');

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const start = page * LIMIT;
  const end = start + LIMIT;

  const data = ITEMS.slice(start, end);

  return NextResponse.json({
    data,
    nextPage: end < ITEMS.length ? page + 1 : null,
    totalCount: ITEMS.length,
  });
}
