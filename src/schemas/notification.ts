import { z } from "zod";

export const notificationTypeSchema = z.enum([
  "PROPOSAL_APPROVED",
  "PROPOSAL_REVISED",
  "DEADLINE_REMINDER",
  "REVIEWER_ASSIGNED",
  "GENERAL"
]);

export const notificationUpsertSchema = z.object({
  userId: z.string().uuid(),
  researchId: z.string().uuid().optional(),
  type: notificationTypeSchema,
  title: z.string().min(3),
  message: z.string().min(3),
  actionUrl: z.string().optional(),
  payload: z.record(z.string(), z.unknown()).optional()
});
