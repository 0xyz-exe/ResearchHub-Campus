import { prisma } from "@/lib/prisma";
import { reviewUpsertSchema } from "@/schemas/review";
import { createReview, listReviews, softDeleteReview, updateReview } from "@/repositories/review.repository";

export async function getReviewList() {
  return listReviews();
}

export async function createReviewItem(input: unknown, createdById?: string) {
  const payload = reviewUpsertSchema.parse(input);

  const review = await createReview({
    researchId: payload.researchId,
    reviewerId: payload.reviewerId,
    assignedById: payload.assignedById,
    totalScore: payload.totalScore,
    recommendation: payload.recommendation,
    comment: payload.comment,
    reviewedAt: new Date(),
    createdById,
    updatedById: createdById,
    criteria: {
      create: payload.criteria.map((criterion) => ({
        ...criterion,
        createdById,
        updatedById: createdById
      }))
    }
  });

  await prisma.research.update({
    where: { id: payload.researchId },
    data: {
      status: payload.recommendation === "APPROVED" ? "APPROVED" : payload.recommendation === "REVISION" ? "REVISION" : "REJECTED"
    }
  });

  return review;
}

export async function updateReviewItem(id: string, input: unknown, updatedById?: string) {
  const payload = reviewUpsertSchema.partial().parse(input);

  const { criteria, ...scalarFields } = payload;

  return updateReview(id, {
    ...scalarFields,
    updatedById,
    ...(criteria
      ? {
          criteria: {
            deleteMany: {},
            create: criteria.map((criterion) => ({
              ...criterion,
              createdById: updatedById,
              updatedById
            }))
          }
        }
      : {})
  });
}

export async function removeReviewItem(id: string, deletedById?: string) {
  return softDeleteReview(id, deletedById);
}
