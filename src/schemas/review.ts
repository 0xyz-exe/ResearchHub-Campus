import { z } from "zod";

export const reviewRecommendationSchema = z.enum(["APPROVED", "REVISION", "REJECTED"]);

export const reviewCriteriaSchema = z.object({
  criterionKey: z.string().min(2),
  criterionName: z.string().min(2),
  score: z.coerce.number().min(0).max(25),
  weight: z.coerce.number().min(0).max(100),
  notes: z.string().optional()
});

export const reviewUpsertSchema = z.object({
  researchId: z.string().uuid(),
  reviewerId: z.string().uuid(),
  assignedById: z.string().uuid().optional(),
  totalScore: z.coerce.number().min(0).max(100),
  recommendation: reviewRecommendationSchema,
  comment: z.string().optional(),
  criteria: z.array(reviewCriteriaSchema).min(1)
});
