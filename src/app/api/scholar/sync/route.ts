import { NextRequest, NextResponse } from "next/server";
import { syncScholarData } from "@/services/scholar.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await syncScholarData(body.userId as string);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: String(error) }, { status: 400 });
  }
}
