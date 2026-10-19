# learning-program-L2-H-N

This is personal learning program for L2 Engineer — a six-month roadmap from Hardware & Networking to modern
infrastructure engineering, with progress tracking, Hindi video resources, tablet-friendly practice links and tests.

## Stack

Next.js 16 (App Router), MongoDB Atlas via Mongoose, Tailwind CSS 4.

## Setup

```bash
pnpm install
cp .env.example .env.local   # then set MONGODB_URI to your Atlas connection string
pnpm seed                    # load roadmap content and test questions (safe to re-run; keeps progress)
pnpm dev                     # http://localhost:3000
```

Restart `pnpm dev` after changing a Mongoose schema — the running server keeps the old model cached.

## Editing content

- Roadmap, projects, competencies, interview questions: `scripts/roadmapData.ts`
- Week resources and practice tools: `scripts/resourceData.ts`
- Test questions (correct answer listed first): `scripts/questionData.ts`

Run `pnpm seed` after any change.
