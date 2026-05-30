import { NextRequest, NextResponse } from "next/server";
import { getPublicationDetail, removePublicationItem, updatePublicationItem } from "@/services/publication.service";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const data = await getPublicationDetail(id);
  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const data = await updatePublicationItem(id, body, body.updatedById as string | undefined);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: String(error) }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = await request.json().catch(() => ({}));
  const data = await removePublicationItem(id, body.deletedById as string | undefined);
  return NextResponse.json({ data });
}
