import { NextRequest, NextResponse } from "next/server";

const items = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  name: `item ${index + 1}`,
}));

export type Item = (typeof items)[number];

const LIMIT = 10;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "0");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const start = page * LIMIT;
  const end = start + LIMIT;

  const data = items.slice(start, end);

  return NextResponse.json({
    data,
    nextPage: end < items.length ? page + 1 : null,
  });
}
