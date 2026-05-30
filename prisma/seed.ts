import { PrismaClient, PublicationCategory, ResearchStatus, RoleCode, ReviewRecommendation, NotificationType, DocumentType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Password123!", 10);

  const roles = await Promise.all([
    prisma.role.upsert({
      where: { code: RoleCode.SUPER_ADMIN },
      update: {},
      create: {
        code: RoleCode.SUPER_ADMIN,
        name: "Super Admin",
        description: "Full access to all modules",
        permissions: ["*"]
      }
    }),
    prisma.role.upsert({
      where: { code: RoleCode.ADMIN_LPPM },
      update: {},
      create: {
        code: RoleCode.ADMIN_LPPM,
        name: "Admin LPPM",
        description: "Manage research, reviewers, and publications",
        permissions: ["research:*", "review:*", "publication:*"]
      }
    }),
    prisma.role.upsert({
      where: { code: RoleCode.REVIEWER },
      update: {},
      create: {
        code: RoleCode.REVIEWER,
        name: "Reviewer",
        description: "Review research proposals",
        permissions: ["review:read", "review:write"]
      }
    }),
    prisma.role.upsert({
      where: { code: RoleCode.KAPRODI },
      update: {},
      create: {
        code: RoleCode.KAPRODI,
        name: "Ketua Program Studi",
        description: "View department dashboard",
        permissions: ["dashboard:prodi"]
      }
    }),
    prisma.role.upsert({
      where: { code: RoleCode.DOSEN },
      update: {},
      create: {
        code: RoleCode.DOSEN,
        name: "Dosen",
        description: "Manage own research and publication",
        permissions: ["research:own", "publication:own", "dashboard:personal"]
      }
    })
  ]);

  const superAdminRole = roles[0];
  const adminRole = roles[1];
  const reviewerRole = roles[2];
  const kaprodiRole = roles[3];
  const dosenRole = roles[4];

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "superadmin@researchhub.local" },
      update: {},
      create: {
        roleId: superAdminRole.id,
        name: "Super Admin",
        email: "superadmin@researchhub.local",
        passwordHash: adminPassword,
        nidn: "00000001",
        department: "LPPM",
        prodi: "-"
      }
    }),
    prisma.user.upsert({
      where: { email: "lppm@researchhub.local" },
      update: {},
      create: {
        roleId: adminRole.id,
        name: "Admin LPPM",
        email: "lppm@researchhub.local",
        passwordHash: adminPassword,
        nidn: "00000002",
        department: "LPPM",
        prodi: "-"
      }
    }),
    prisma.user.upsert({
      where: { email: "reviewer@researchhub.local" },
      update: {},
      create: {
        roleId: reviewerRole.id,
        name: "Reviewer Satu",
        email: "reviewer@researchhub.local",
        passwordHash: adminPassword,
        nidn: "00000003",
        department: "Fakultas Teknik",
        prodi: "Informatika"
      }
    }),
    prisma.user.upsert({
      where: { email: "kaprodi@researchhub.local" },
      update: {},
      create: {
        roleId: kaprodiRole.id,
        name: "Kaprodi Informatika",
        email: "kaprodi@researchhub.local",
        passwordHash: adminPassword,
        nidn: "00000004",
        department: "Fakultas Teknik",
        prodi: "Informatika"
      }
    }),
    prisma.user.upsert({
      where: { email: "dosen@researchhub.local" },
      update: {},
      create: {
        roleId: dosenRole.id,
        name: "Dosen Peneliti",
        email: "dosen@researchhub.local",
        passwordHash: adminPassword,
        nidn: "00000005",
        department: "Fakultas Teknik",
        prodi: "Informatika"
      }
    })
  ]);

  const [superAdmin, lppmAdmin, reviewer, kaprodi, dosen] = users;

  await prisma.scholarProfile.upsert({
    where: { userId: dosen.id },
    update: {
      scholarId: "mock-scholar-001",
      hIndex: 14,
      i10Index: 22,
      citationCount: 136,
      provider: "mock",
      syncedAt: new Date(),
      rawData: {
        source: "mock",
        profileUrl: "https://scholar.google.com/mock-profile"
      }
    },
    create: {
      userId: dosen.id,
      scholarId: "mock-scholar-001",
      hIndex: 14,
      i10Index: 22,
      citationCount: 136,
      provider: "mock",
      syncedAt: new Date(),
      rawData: {
        source: "mock",
        profileUrl: "https://scholar.google.com/mock-profile"
      }
    }
  });

  const research = await prisma.research.create({
    data: {
      title: "AI untuk Monitoring Luaran Penelitian Kampus",
      abstract: "Pengembangan platform untuk memantau penelitian, publikasi, dan luaran dosen secara terpusat.",
      year: 2026,
      budget: 125000000,
      scheme: "Penelitian Dasar Unggulan Perguruan Tinggi",
      status: ResearchStatus.UNDER_REVIEW,
      progress: 42,
      leaderId: dosen.id,
      members: {
        create: [
          {
            userId: dosen.id,
            roleInResearch: "Ketua Peneliti",
            isLeader: true,
            contributionPct: 60,
            createdById: superAdmin.id,
            updatedById: superAdmin.id
          },
          {
            userId: reviewer.id,
            roleInResearch: "Anggota",
            isLeader: false,
            contributionPct: 40,
            createdById: superAdmin.id,
            updatedById: superAdmin.id
          }
        ]
      },
      documents: {
        create: [
          {
            type: DocumentType.PROPOSAL,
            title: "Proposal Penelitian",
            fileName: "proposal-ai-monitoring.pdf",
            filePath: "/uploads/research/proposal-ai-monitoring.pdf",
            mimeType: "application/pdf",
            size: 125000,
            uploadedById: dosen.id,
            createdById: dosen.id,
            updatedById: dosen.id
          }
        ]
      },
      createdById: dosen.id,
      updatedById: dosen.id
    }
  });

  const review = await prisma.review.create({
    data: {
      researchId: research.id,
      reviewerId: reviewer.id,
      assignedById: lppmAdmin.id,
      totalScore: 87.5,
      recommendation: ReviewRecommendation.APPROVED,
      comment: "Proposal layak dilanjutkan dengan penyempurnaan minor.",
      reviewedAt: new Date(),
      criteria: {
        create: [
          { criterionKey: "novelty", criterionName: "Kebaruan", score: 22.5, weight: 25, notes: "Cukup inovatif" },
          { criterionKey: "methodology", criterionName: "Metodologi", score: 21.0, weight: 25, notes: "Metode jelas" },
          { criterionKey: "outputs", criterionName: "Luaran", score: 21.5, weight: 25, notes: "Target luaran realistis" },
          { criterionKey: "budget", criterionName: "Kelayakan Anggaran", score: 22.5, weight: 25, notes: "Anggaran proporsional" }
        ]
      },
      createdById: reviewer.id,
      updatedById: reviewer.id
    }
  });

  await prisma.publication.create({
    data: {
      title: "ResearchHub Campus: Centralized Research Management Platform",
      doi: "10.1234/rhc.2026.001",
      journal: "Journal of Campus Digital Innovation",
      publisher: "ResearchHub Press",
      year: 2026,
      quartile: "Q2",
      indexing: "Scopus, Crossref",
      citationCount: 12,
      category: PublicationCategory.SCOPUS,
      fileName: "researchhub-campus-publication.pdf",
      filePath: "/uploads/publications/researchhub-campus-publication.pdf",
      fileMimeType: "application/pdf",
      fileSize: 84000,
      authors: {
        create: [
          { userId: dosen.id, authorName: dosen.name, affiliation: dosen.department, orderIndex: 1, createdById: dosen.id, updatedById: dosen.id },
          { userId: reviewer.id, authorName: reviewer.name, affiliation: reviewer.department, orderIndex: 2, createdById: dosen.id, updatedById: dosen.id }
        ]
      },
      createdById: dosen.id,
      updatedById: dosen.id
    }
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: dosen.id,
        type: NotificationType.PROPOSAL_APPROVED,
        title: "Proposal disetujui",
        message: "Proposal penelitian Anda telah disetujui dan siap dilanjutkan ke tahap berikutnya.",
        actionUrl: "/dashboard/research",
        researchId: research.id,
        createdById: reviewer.id,
        updatedById: reviewer.id
      },
      {
        userId: reviewer.id,
        type: NotificationType.REVIEWER_ASSIGNED,
        title: "Review baru ditugaskan",
        message: "Anda mendapat penugasan review untuk proposal AI Monitoring.",
        actionUrl: "/dashboard/reviews",
        researchId: research.id,
        createdById: lppmAdmin.id,
        updatedById: lppmAdmin.id
      }
    ]
  });

  console.log({
    roles: roles.length,
    users: users.length,
    researchId: research.id,
    reviewId: review.id
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
