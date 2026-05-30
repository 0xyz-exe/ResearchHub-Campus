import { prisma } from "@/lib/prisma";

export async function listReviews() {
  return prisma.review.findMany({
    where: { deletedAt: null },
    include: { criteria: true, reviewer: true, research: true },
    orderBy: { updatedAt: "desc" }
  });
}

export async function createReview(data: Parameters<typeof prisma.review.create>[0]["data"]) {
  return prisma.review.create({ data, include: { criteria: true } });
}

export async function updateReview(id: string, data: Parameters<typeof prisma.review.update>[0]["data"]) {
  return prisma.review.update({ where: { id }, data, include: { criteria: true } });
}

export async function softDeleteReview(id: string, deletedById?: string) {
  return prisma.review.update({
    where: { id },
    data: { deletedAt: new Date(), deletedById }
  });
}
