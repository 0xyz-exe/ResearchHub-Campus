import { NextRequest, NextResponse } from "next/server";
import { attachResearchDocument } from "@/services/research.service";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const data = await attachResearchDocument({ ...body, researchId: id }, body.createdById as string | undefined);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: String(error) }, { status: 400 });
  }
}
