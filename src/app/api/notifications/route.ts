import { NextRequest, NextResponse } from "next/server";
import { createNotificationItem, getNotifications } from "@/services/notification.service";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") ?? undefined;
  const data = await getNotifications(userId);
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await createNotificationItem(body, body.createdById as string | undefined);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: String(error) }, { status: 400 });
  }
}
