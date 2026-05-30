import { z } from "zod";

export const researchStatusSchema = z.enum([
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "REVISION",
  "APPROVED",
  "REJECTED",
  "COMPLETED"
]);

export const researchDocumentTypeSchema = z.enum([
  "PROPOSAL",
  "PROGRESS_REPORT",
  "FINAL_REPORT",
  "PUBLICATION_PDF",
  "OTHER"
]);

export const researchUpsertSchema = z.object({
  title: z.string().min(3),
  abstract: z.string().min(10),
  year: z.coerce.number().int().min(2000).max(2100),
  budget: z.coerce.number().positive(),
  scheme: z.string().min(2),
  status: researchStatusSchema.default("DRAFT"),
  progress: z.coerce.number().int().min(0).max(100).default(0),
  leaderId: z.string().uuid(),
  memberIds: z.array(z.string().uuid()).default([])
});

export const researchFilterSchema = z.object({
  query: z.string().optional(),
  status: researchStatusSchema.optional(),
  year: z.coerce.number().int().optional()
});

export const researchDocumentSchema = z.object({
  researchId: z.string().uuid(),
  type: researchDocumentTypeSchema,
  title: z.string().min(3),
  fileName: z.string().min(1),
  filePath: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.coerce.number().int().positive(),
  uploadedById: z.string().uuid().optional()
});
