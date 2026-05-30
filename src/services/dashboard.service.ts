import { prisma } from "@/lib/prisma";

export async function getDosenDashboard(userId: string) {
  const [totalResearch, activeResearch, totalPublications, scholarProfile] = await Promise.all([
    prisma.research.count({ where: { leaderId: userId, deletedAt: null } }),
    prisma.research.count({ where: { leaderId: userId, deletedAt: null, status: { in: ["SUBMITTED", "UNDER_REVIEW", "REVISION", "APPROVED"] } } }),
    prisma.publication.count({ where: { authors: { some: { userId } }, deletedAt: null } }),
    prisma.scholarProfile.findUnique({ where: { userId } })
  ]);

  return {
    cards: {
      totalResearch,
      activeResearch,
      totalPublications,
      citations: scholarProfile?.citationCount ?? 0,
      hIndex: scholarProfile?.hIndex ?? 0
    }
  };
}

export async function getKaprodiDashboard(prodi?: string) {
  const [totalDosen, totalResearch, totalPublications, totalHki] = await Promise.all([
    prisma.user.count({ where: { prodi: prodi ?? undefined, deletedAt: null } }),
    prisma.research.count({ where: { deletedAt: null } }),
    prisma.publication.count({ where: { deletedAt: null } }),
    prisma.publication.count({ where: { deletedAt: null, category: "HKI" } })
  ]);

  return { totalDosen, totalResearch, totalPublications, totalHki };
}

export async function getLppmDashboard() {
  const [proposalMasuk, underReview, approved, rejected, totalBudget] = await Promise.all([
    prisma.research.count({ where: { deletedAt: null, status: "SUBMITTED" } }),
    prisma.research.count({ where: { deletedAt: null, status: "UNDER_REVIEW" } }),
    prisma.research.count({ where: { deletedAt: null, status: "APPROVED" } }),
    prisma.research.count({ where: { deletedAt: null, status: "REJECTED" } }),
    prisma.research.aggregate({ _sum: { budget: true }, where: { deletedAt: null } })
  ]);

  return {
    proposalMasuk,
    underReview,
    approved,
    rejected,
    totalBudget: Number(totalBudget._sum.budget ?? 0)
  };
}
