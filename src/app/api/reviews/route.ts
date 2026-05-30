import { NextRequest, NextResponse } from "next/server";
import { createReviewItem, getReviewList } from "@/services/review.service";

export async function GET() {
  const data = await getReviewList();
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await createReviewItem(body, body.createdById as string | undefined);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: String(error) }, { status: 400 });
  }
}
