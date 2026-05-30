import { NextRequest, NextResponse } from "next/server";
import { createResearchItem, getResearchList } from "@/services/research.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filters = {
    query: searchParams.get("query") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    year: searchParams.get("year") ?? undefined
  };

  const data = await getResearchList(filters);
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const createdById = body.createdById as string | undefined;
    const data = await createResearchItem(body, createdById);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: String(error) }, { status: 400 });
  }
}
