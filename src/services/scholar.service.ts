import { prisma } from "@/lib/prisma";
import { scholarProfileSchema } from "@/schemas/scholar";

const mockScholarData = {
  scholarId: "mock-scholar-001",
  hIndex: 14,
  i10Index: 22,
  citationCount: 136
};

export async function syncScholarData(userId: string) {
  const payload = {
    userId,
    provider: "mock",
    ...mockScholarData
  };

  const parsed = scholarProfileSchema.parse(payload);

  return prisma.scholarProfile.upsert({
    where: { userId },
    update: {
      scholarId: parsed.scholarId,
      hIndex: parsed.hIndex,
      i10Index: parsed.i10Index,
      citationCount: parsed.citationCount,
      provider: parsed.provider,
      syncedAt: new Date(),
      rawData: { source: "mock" }
    },
    create: {
      userId,
      scholarId: parsed.scholarId,
      hIndex: parsed.hIndex,
      i10Index: parsed.i10Index,
      citationCount: parsed.citationCount,
      provider: parsed.provider,
      syncedAt: new Date(),
      rawData: { source: "mock" }
    }
  });
}

export async function getCitationCount(userId: string) {
  const profile = await prisma.scholarProfile.findUnique({ where: { userId } });
  return profile?.citationCount ?? mockScholarData.citationCount;
}

export async function getHIndex(userId: string) {
  const profile = await prisma.scholarProfile.findUnique({ where: { userId } });
  return profile?.hIndex ?? mockScholarData.hIndex;
}
