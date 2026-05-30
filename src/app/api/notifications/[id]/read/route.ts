import { NextRequest, NextResponse } from "next/server";
import { readNotification } from "@/services/notification.service";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(_: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const data = await readNotification(id);
  return NextResponse.json({ data });
}
