import { prisma } from "@/lib/prisma";
import { reportFilterSchema } from "@/schemas/report";

export async function getResearchReport(input: unknown) {
  const filters = reportFilterSchema.parse(input);

  const data = await prisma.research.findMany({
    where: {
      deletedAt: null,
      ...(filters.year ? { year: filters.year } : {}),
      ...(filters.from || filters.to
        ? {
            createdAt: {
              gte: filters.from,
              lte: filters.to
            }
          }
        : {})
    },
    include: { leader: true }
  });

  return data;
}
