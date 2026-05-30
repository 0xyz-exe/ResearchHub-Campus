import { prisma } from "@/lib/prisma";
import { publicationFilterSchema, publicationUpsertSchema } from "@/schemas/publication";
import { createPublication, findPublicationById, listPublications, softDeletePublication, updatePublication } from "@/repositories/publication.repository";

export async function getPublicationList(input?: unknown) {
  const filters = publicationFilterSchema.parse(input ?? {});
  const publications = await listPublications();

  return publications.filter((publication) => {
    const matchesQuery = filters.query
      ? publication.title.toLowerCase().includes(filters.query.toLowerCase()) || (publication.journal ?? "").toLowerCase().includes(filters.query.toLowerCase())
      : true;
    const matchesCategory = filters.category ? publication.category === filters.category : true;
    const matchesYear = filters.year ? publication.year === filters.year : true;
    return matchesQuery && matchesCategory && matchesYear;
  });
}

export async function createPublicationItem(input: unknown, createdById?: string) {
  const payload = publicationUpsertSchema.parse(input);

  return createPublication({
    title: payload.title,
    doi: payload.doi,
    journal: payload.journal,
    publisher: payload.publisher,
    year: payload.year,
    quartile: payload.quartile,
    indexing: payload.indexing,
    citationCount: payload.citationCount,
    category: payload.category,
    fileName: payload.fileName,
    filePath: payload.filePath,
    fileMimeType: payload.fileMimeType,
    fileSize: payload.fileSize,
    createdById,
    updatedById: createdById,
    authors: {
      create: payload.authors.map((author) => ({
        ...author,
        createdById,
        updatedById: createdById
      }))
    }
  });
}

export async function updatePublicationItem(id: string, input: unknown, updatedById?: string) {
  const payload = publicationUpsertSchema.partial().parse(input);

  const { authors, ...scalarFields } = payload;

  return updatePublication(id, {
    ...scalarFields,
    updatedById,
    ...(authors
      ? {
          authors: {
            deleteMany: {},
            create: authors.map((author) => ({
              ...author,
              createdById: updatedById,
              updatedById
            }))
          }
        }
      : {})
  });
}

export async function removePublicationItem(id: string, deletedById?: string) {
  return softDeletePublication(id, deletedById);
}

export async function getPublicationDetail(id: string) {
  return findPublicationById(id);
}

export async function attachPublicationFile(id: string, filePath: string, fileName: string, mimeType: string, fileSize: number, updatedById?: string) {
  return prisma.publication.update({
    where: { id },
    data: {
      filePath,
      fileName,
      fileMimeType: mimeType,
      fileSize,
      updatedById
    }
  });
}
