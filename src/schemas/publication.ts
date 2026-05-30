import { z } from "zod";

export const publicationCategorySchema = z.enum([
  "JURNAL_NASIONAL",
  "JURNAL_INTERNASIONAL",
  "SCOPUS",
  "WOS",
  "PROSIDING",
  "BUKU",
  "HKI"
]);

export const publicationUpsertSchema = z.object({
  title: z.string().min(3),
  authors: z.array(
    z.object({
      userId: z.string().uuid().optional(),
      authorName: z.string().min(2),
      affiliation: z.string().optional(),
      orderIndex: z.coerce.number().int().min(0)
    })
  ).min(1),
  doi: z.string().optional(),
  journal: z.string().optional(),
  publisher: z.string().optional(),
  year: z.coerce.number().int().min(1900).max(2100),
  quartile: z.string().optional(),
  indexing: z.string().optional(),
  citationCount: z.coerce.number().int().min(0).default(0),
  category: publicationCategorySchema,
  fileName: z.string().optional(),
  filePath: z.string().optional(),
  fileMimeType: z.string().optional(),
  fileSize: z.coerce.number().int().positive().optional()
});

export const publicationFilterSchema = z.object({
  query: z.string().optional(),
  category: publicationCategorySchema.optional(),
  year: z.coerce.number().int().optional()
});
