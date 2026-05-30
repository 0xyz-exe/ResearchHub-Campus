import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { changePasswordSchema } from "@/schemas/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const payload = changePasswordSchema.parse(body);

    const user = await prisma.user.findFirst({ where: { id: session.user.id, deletedAt: null } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const passwordMatches = await bcrypt.compare(payload.currentPassword, user.passwordHash);
    if (!passwordMatches) {
      return NextResponse.json({ message: "Current password is invalid" }, { status: 400 });
    }

    const nextHash = await bcrypt.hash(payload.newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: nextHash, updatedById: user.id }
    });

    return NextResponse.json({ message: "Password updated" });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: String(error) }, { status: 400 });
  }
}
