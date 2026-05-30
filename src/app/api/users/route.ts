import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    where: { deletedAt: null, isActive: true },
    include: { role: true },
    orderBy: { name: "asc" }
  });

  return NextResponse.json({
    data: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.code,
      roleName: user.role.name,
      prodi: user.prodi,
      department: user.department
    }))
  });
}
