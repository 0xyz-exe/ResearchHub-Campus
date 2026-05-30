import { prisma } from "@/lib/prisma";
import { researchDocumentSchema, researchFilterSchema, researchUpsertSchema } from "@/schemas/research";
import { createResearch, findResearchById, listResearches, softDeleteResearch, updateResearch } from "@/repositories/research.repository";

export async function getResearchList(input?: unknown) {
  const filters = researchFilterSchema.parse(input ?? {});
  const researches = await listResearches();

  return researches.filter((research) => {
    const matchesQuery = filters.query
      ? research.title.toLowerCase().includes(filters.query.toLowerCase()) || research.abstract.toLowerCase().includes(filters.query.toLowerCase())
      : true;
    const matchesStatus = filters.status ? research.status === filters.status : true;
    const matchesYear = filters.year ? research.year === filters.year : true;
    return matchesQuery && matchesStatus && matchesYear;
  });
}

export async function createResearchItem(input: unknown, createdById?: string) {
  const payload = researchUpsertSchema.parse(input);

  return createResearch({
    title: payload.title,
    abstract: payload.abstract,
    year: payload.year,
    budget: payload.budget,
    scheme: payload.scheme,
    status: payload.status,
    progress: payload.progress,
    leaderId: payload.leaderId,
    createdById,
    updatedById: createdById,
    members: {
      create: payload.memberIds.map((userId) => ({
        userId,
        roleInResearch: userId === payload.leaderId ? "Ketua Peneliti" : "Anggota",
        isLeader: userId === payload.leaderId,
        createdById,
        updatedById: createdById
      }))
    }
  });
}

export async function updateResearchItem(id: string, input: unknown, updatedById?: string) {
  const payload = researchUpsertSchema.partial().parse(input);

  return updateResearch(id, {
    ...payload,
    updatedById
  });
}

export async function removeResearchItem(id: string, deletedById?: string) {
  return softDeleteResearch(id, deletedById);
}

export async function getResearchDetail(id: string) {
  return findResearchById(id);
}

export async function attachResearchDocument(input: unknown, createdById?: string) {
  const payload = researchDocumentSchema.parse(input);

  return prisma.researchDocument.create({
    data: {
      ...payload,
      createdById,
      updatedById: createdById,
      uploadedById: payload.uploadedById ?? createdById
    }
  });
}
