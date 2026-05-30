import { NextRequest, NextResponse } from "next/server";
import { getResearchDetail, removeResearchItem, updateResearchItem } from "@/services/research.service";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const data = await getResearchDetail(id);
  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updatedById = body.updatedById as string | undefined;
    const data = await updateResearchItem(id, body, updatedById);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: String(error) }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  const deletedById = body.deletedById as string | undefined;
  const data = await removeResearchItem(id, deletedById);
  return NextResponse.json({ data });
}
