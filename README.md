# ResearchHub Campus

ResearchHub Campus is an MVP-grade research and publication management system for higher education institutions.

Repository: https://github.com/0xyz-exe/ResearchHub-Campus

## Screenshots

### Campus Research Dashboard & Analytics
![Research dashboard](docs/screenshots/01_dashboard.png)

### Research Proposals & Peer Review Lifecycle
![Research proposals](docs/screenshots/02_research_proposals.png)

### Institutional Publication Repository
![Publications](docs/screenshots/03_publications.png)

### Scholar Profiles & Metrics Export
![Scholar profiles](docs/screenshots/04_scholar_profiles.png)

### Institutional Authentication
![Authentication](docs/screenshots/05_login.png)

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth/Auth.js (JWT + RBAC)
- React Hook Form + Zod
- TanStack Query
- Recharts
- Docker + Docker Compose

## Features

- Authentication and session management
- Role-based access control
- Research CRUD with documents and review flow
- Publication repository with download-ready file metadata
- Scholar profile abstraction for Google Scholar, ORCID, and Crossref
- Notifications stored in the database
- Reporting export to PDF and Excel
- Responsive dashboard experience with dark/light mode

## Local Setup

1. Copy `.env.example` to `.env.local` or use the provided local file.
2. Start PostgreSQL with Docker:

```bash
docker compose up -d db
```

3. Install dependencies:

```bash
npm install
```

4. Generate Prisma client and migrate database:

```bash
npm run prisma:generate
npx prisma migrate deploy
npm run seed
```

If you are using Docker Compose, the web container performs those database steps automatically on start. See [docs/docker-runbook.md](docs/docker-runbook.md) for the end-to-end flow.

5. Run the app:

```bash
npm run dev
```

## Demo Accounts

All demo accounts use the password `Password123!`.

- `superadmin@researchhub.local`
- `lppm@researchhub.local`
- `reviewer@researchhub.local`
- `kaprodi@researchhub.local`
- `dosen@researchhub.local`

## Important Paths

- Prisma schema: `prisma/schema.prisma`
- Initial migration: `prisma/migrations/20260530_init/migration.sql`
- Auth config: `src/auth.ts`
- Dashboard shell: `src/components/layout/app-shell.tsx`
- Research service: `src/services/research.service.ts`
- Publication service: `src/services/publication.service.ts`
- Reporting route: `src/app/api/reports/route.ts`

## Notes

- The scholar integration is mocked but isolated behind a service layer so it can be swapped with Google Scholar, ORCID, or Crossref adapters later.
- The upload subsystem currently stores file metadata and uses a local-path abstraction that can be migrated to MinIO or S3 later.
- The initial migration is committed under `prisma/migrations/20260530_init/migration.sql`.
