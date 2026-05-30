import { prisma } from "@/lib/prisma";

export async function listNotifications(userId?: string) {
  return prisma.notification.findMany({
    where: {
      deletedAt: null,
      ...(userId ? { userId } : {})
    },
    include: { research: true, user: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function createNotification(data: Parameters<typeof prisma.notification.create>[0]["data"]) {
  return prisma.notification.create({ data });
}

export async function markNotificationRead(id: string) {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true, readAt: new Date() }
  });
}
