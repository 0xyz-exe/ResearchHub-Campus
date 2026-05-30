-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "RoleCode" AS ENUM ('SUPER_ADMIN', 'ADMIN_LPPM', 'REVIEWER', 'KAPRODI', 'DOSEN');

-- CreateEnum
CREATE TYPE "ResearchStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'REVISION', 'APPROVED', 'REJECTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('PROPOSAL', 'PROGRESS_REPORT', 'FINAL_REPORT', 'PUBLICATION_PDF', 'OTHER');

-- CreateEnum
CREATE TYPE "ReviewRecommendation" AS ENUM ('APPROVED', 'REVISION', 'REJECTED');

-- CreateEnum
CREATE TYPE "PublicationCategory" AS ENUM ('JURNAL_NASIONAL', 'JURNAL_INTERNASIONAL', 'SCOPUS', 'WOS', 'PROSIDING', 'BUKU', 'HKI');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PROPOSAL_APPROVED', 'PROPOSAL_REVISED', 'DEADLINE_REMINDER', 'REVIEWER_ASSIGNED', 'GENERAL');

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "code" "RoleCode" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "permissions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "nidn" TEXT,
    "department" TEXT,
    "prodi" TEXT,
    "avatarUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarProfile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "scholarId" TEXT NOT NULL,
    "hIndex" INTEGER NOT NULL DEFAULT 0,
    "i10Index" INTEGER NOT NULL DEFAULT 0,
    "citationCount" INTEGER NOT NULL DEFAULT 0,
    "provider" TEXT NOT NULL DEFAULT 'mock',
    "rawData" JSONB,
    "syncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "ScholarProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Research" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "budget" DECIMAL(18,2) NOT NULL,
    "scheme" TEXT NOT NULL,
    "status" "ResearchStatus" NOT NULL DEFAULT 'DRAFT',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "leaderId" UUID NOT NULL,
    "timeline" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "Research_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchMember" (
    "id" UUID NOT NULL,
    "researchId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "roleInResearch" TEXT NOT NULL,
    "isLeader" BOOLEAN NOT NULL DEFAULT false,
    "contributionPct" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "ResearchMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchDocument" (
    "id" UUID NOT NULL,
    "researchId" UUID NOT NULL,
    "type" "DocumentType" NOT NULL,
    "title" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "uploadedById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "ResearchDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" UUID NOT NULL,
    "researchId" UUID NOT NULL,
    "reviewerId" UUID NOT NULL,
    "assignedById" UUID,
    "totalScore" DECIMAL(5,2) NOT NULL,
    "recommendation" "ReviewRecommendation" NOT NULL,
    "comment" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewCriteria" (
    "id" UUID NOT NULL,
    "reviewId" UUID NOT NULL,
    "criterionKey" TEXT NOT NULL,
    "criterionName" TEXT NOT NULL,
    "score" DECIMAL(5,2) NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "ReviewCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "doi" TEXT,
    "journal" TEXT,
    "publisher" TEXT,
    "year" INTEGER NOT NULL,
    "quartile" TEXT,
    "indexing" TEXT,
    "citationCount" INTEGER NOT NULL DEFAULT 0,
    "category" "PublicationCategory" NOT NULL,
    "fileName" TEXT,
    "filePath" TEXT,
    "fileMimeType" TEXT,
    "fileSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicationAuthor" (
    "id" UUID NOT NULL,
    "publicationId" UUID NOT NULL,
    "userId" UUID,
    "authorName" TEXT NOT NULL,
    "affiliation" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "PublicationAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "researchId" UUID,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "actionUrl" TEXT,
    "payload" JSONB,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" UUID,
    "deletedAt" TIMESTAMP(3),
    "deletedById" UUID,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_code_key" ON "Role"("code");

-- CreateIndex
CREATE INDEX "Role_deletedAt_idx" ON "Role"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nidn_key" ON "User"("nidn");

-- CreateIndex
CREATE INDEX "User_roleId_idx" ON "User"("roleId");

-- CreateIndex
CREATE INDEX "User_deletedAt_idx" ON "User"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarProfile_userId_key" ON "ScholarProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarProfile_scholarId_key" ON "ScholarProfile"("scholarId");

-- CreateIndex
CREATE INDEX "ScholarProfile_deletedAt_idx" ON "ScholarProfile"("deletedAt");

-- CreateIndex
CREATE INDEX "Research_leaderId_idx" ON "Research"("leaderId");

-- CreateIndex
CREATE INDEX "Research_status_idx" ON "Research"("status");

-- CreateIndex
CREATE INDEX "Research_year_idx" ON "Research"("year");

-- CreateIndex
CREATE INDEX "Research_deletedAt_idx" ON "Research"("deletedAt");

-- CreateIndex
CREATE INDEX "ResearchMember_researchId_idx" ON "ResearchMember"("researchId");

-- CreateIndex
CREATE INDEX "ResearchMember_userId_idx" ON "ResearchMember"("userId");

-- CreateIndex
CREATE INDEX "ResearchMember_deletedAt_idx" ON "ResearchMember"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ResearchMember_researchId_userId_key" ON "ResearchMember"("researchId", "userId");

-- CreateIndex
CREATE INDEX "ResearchDocument_researchId_idx" ON "ResearchDocument"("researchId");

-- CreateIndex
CREATE INDEX "ResearchDocument_type_idx" ON "ResearchDocument"("type");

-- CreateIndex
CREATE INDEX "ResearchDocument_deletedAt_idx" ON "ResearchDocument"("deletedAt");

-- CreateIndex
CREATE INDEX "Review_researchId_idx" ON "Review"("researchId");

-- CreateIndex
CREATE INDEX "Review_reviewerId_idx" ON "Review"("reviewerId");

-- CreateIndex
CREATE INDEX "Review_deletedAt_idx" ON "Review"("deletedAt");

-- CreateIndex
CREATE INDEX "ReviewCriteria_reviewId_idx" ON "ReviewCriteria"("reviewId");

-- CreateIndex
CREATE INDEX "ReviewCriteria_deletedAt_idx" ON "ReviewCriteria"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Publication_doi_key" ON "Publication"("doi");

-- CreateIndex
CREATE INDEX "Publication_category_idx" ON "Publication"("category");

-- CreateIndex
CREATE INDEX "Publication_year_idx" ON "Publication"("year");

-- CreateIndex
CREATE INDEX "Publication_deletedAt_idx" ON "Publication"("deletedAt");

-- CreateIndex
CREATE INDEX "PublicationAuthor_publicationId_idx" ON "PublicationAuthor"("publicationId");

-- CreateIndex
CREATE INDEX "PublicationAuthor_userId_idx" ON "PublicationAuthor"("userId");

-- CreateIndex
CREATE INDEX "PublicationAuthor_deletedAt_idx" ON "PublicationAuthor"("deletedAt");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_type_idx" ON "Notification"("type");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "Notification"("isRead");

-- CreateIndex
CREATE INDEX "Notification_deletedAt_idx" ON "Notification"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE INDEX "PasswordResetToken_deletedAt_idx" ON "PasswordResetToken"("deletedAt");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarProfile" ADD CONSTRAINT "ScholarProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Research" ADD CONSTRAINT "Research_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchMember" ADD CONSTRAINT "ResearchMember_researchId_fkey" FOREIGN KEY ("researchId") REFERENCES "Research"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchMember" ADD CONSTRAINT "ResearchMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchDocument" ADD CONSTRAINT "ResearchDocument_researchId_fkey" FOREIGN KEY ("researchId") REFERENCES "Research"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchDocument" ADD CONSTRAINT "ResearchDocument_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_researchId_fkey" FOREIGN KEY ("researchId") REFERENCES "Research"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewCriteria" ADD CONSTRAINT "ReviewCriteria_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationAuthor" ADD CONSTRAINT "PublicationAuthor_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationAuthor" ADD CONSTRAINT "PublicationAuthor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_researchId_fkey" FOREIGN KEY ("researchId") REFERENCES "Research"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

