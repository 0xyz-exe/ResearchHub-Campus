import { Prisma } from "@prisma/client";
import { notificationUpsertSchema } from "@/schemas/notification";
import { createNotification, listNotifications, markNotificationRead } from "@/repositories/notification.repository";

export async function getNotifications(userId?: string) {
  return listNotifications(userId);
}

export async function createNotificationItem(input: unknown, createdById?: string) {
  const payload = notificationUpsertSchema.parse(input);

  return createNotification({
    userId: payload.userId,
    researchId: payload.researchId,
    type: payload.type,
    title: payload.title,
    message: payload.message,
    actionUrl: payload.actionUrl,
    payload: payload.payload as Prisma.InputJsonValue,
    createdById,
    updatedById: createdById
  });
}

export async function readNotification(id: string) {
  return markNotificationRead(id);
}
