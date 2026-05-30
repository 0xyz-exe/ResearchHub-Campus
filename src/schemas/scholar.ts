import { z } from "zod";

export const scholarProfileSchema = z.object({
  userId: z.string().uuid(),
  scholarId: z.string().min(3),
  hIndex: z.coerce.number().int().min(0),
  i10Index: z.coerce.number().int().min(0),
  citationCount: z.coerce.number().int().min(0),
  provider: z.string().default("mock")
});
