import { prisma } from "@/lib/prisma";

export async function listResearches() {
  return prisma.research.findMany({
    where: { deletedAt: null },
    include: {
      leader: true,
      members: { include: { user: true } },
      documents: true,
      reviews: { include: { criteria: true } }
    },
    orderBy: { updatedAt: "desc" }
  });
}

export async function findResearchById(id: string) {
  return prisma.research.findFirst({
    where: { id, deletedAt: null },
    include: {
      leader: true,
      members: { include: { user: true } },
      documents: true,
      reviews: { include: { criteria: true, reviewer: true } }
    }
  });
}

export async function createResearch(data: Parameters<typeof prisma.research.create>[0]["data"]) {
  return prisma.research.create({ data });
}

export async function updateResearch(id: string, data: Parameters<typeof prisma.research.update>[0]["data"]) {
  return prisma.research.update({ where: { id }, data });
}

export async function softDeleteResearch(id: string, deletedById?: string) {
  return prisma.research.update({
    where: { id },
    data: { deletedAt: new Date(), deletedById }
  });
}
