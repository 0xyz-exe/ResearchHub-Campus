# Docker Runbook

This runbook covers the end-to-end setup path for ResearchHub Campus using Docker Compose.

## Prerequisites

- Docker Desktop installed
- `.env.local` present in the project root
- PostgreSQL credentials matching the Compose file or `.env.local`

## Start the Stack

1. Build and start the database and web app:

```bash
docker compose up --build
```

2. The web container runs the following sequence automatically:

```bash
npx prisma migrate deploy
npm run seed
npm start
```

## Manual Database Workflow

Use these commands when you need to run the database steps separately:

```bash
docker compose up -d db
npm run prisma:generate
npx prisma migrate deploy
npm run seed
```

## Reset Local Data

If you want to reset the database volume and start from the seed data again:

```bash
docker compose down -v
docker compose up --build
```

## Verification

Open these endpoints after the stack is running:

- `http://localhost:3000`
- `http://localhost:3000/login`
- `http://localhost:3000/api/health`

## Notes

- The seed script uses upsert-style writes so it is safe to run repeatedly.
- File uploads currently use a local-path abstraction and can be migrated to MinIO or S3 later without changing the domain model.
