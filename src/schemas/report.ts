import { z } from "zod";

export const reportFilterSchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  year: z.coerce.number().int().optional(),
  format: z.enum(["pdf", "xlsx"]).default("pdf")
});
