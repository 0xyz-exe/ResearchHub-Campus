import { NextRequest, NextResponse } from "next/server";
import { createPublicationItem, getPublicationList } from "@/services/publication.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filters = {
    query: searchParams.get("query") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    year: searchParams.get("year") ?? undefined
  };

  const data = await getPublicationList(filters);
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await createPublicationItem(body, body.createdById as string | undefined);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: String(error) }, { status: 400 });
  }
}
