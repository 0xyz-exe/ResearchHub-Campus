import { prisma } from "@/lib/prisma";

export async function listPublications() {
  return prisma.publication.findMany({
    where: { deletedAt: null },
    include: { authors: { include: { user: true } } },
    orderBy: { updatedAt: "desc" }
  });
}

export async function findPublicationById(id: string) {
  return prisma.publication.findFirst({
    where: { id, deletedAt: null },
    include: { authors: { include: { user: true } } }
  });
}

export async function createPublication(data: Parameters<typeof prisma.publication.create>[0]["data"]) {
  return prisma.publication.create({ data });
}

export async function updatePublication(id: string, data: Parameters<typeof prisma.publication.update>[0]["data"]) {
  return prisma.publication.update({ where: { id }, data });
}

export async function softDeletePublication(id: string, deletedById?: string) {
  return prisma.publication.update({
    where: { id },
    data: { deletedAt: new Date(), deletedById }
  });
}
