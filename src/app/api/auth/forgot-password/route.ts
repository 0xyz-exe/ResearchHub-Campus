import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/schemas/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = forgotPasswordSchema.parse(body);
    const user = await prisma.user.findFirst({ where: { email: payload.email, deletedAt: null } });

    if (user) {
      const token = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt
        }
      });
    }

    return NextResponse.json({ message: "If the email exists, a reset link has been generated." });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error: String(error) }, { status: 400 });
  }
}
