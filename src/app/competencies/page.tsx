import { Suspense } from "react";
import { connection } from "next/server";
import PageFallback from "@/components/PageFallback";
import { getCompetenciesWithLevel } from "@/lib/roadmap";
import { setCompetencyLevel } from "@/app/actions";
import { COMPETENCY_LEVELS, type CompetencyLevel } from "@/models/Progress";

const LEVEL_LABELS: Record<CompetencyLevel, string> = {
  "not-started": "Not started",
  beginner: "Beginner",
  "job-ready": "Job-ready",
};

export default function CompetenciesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gradient">Competency tracker</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Job-ready means practical evidence you can demonstrate and explain — not a certificate.
      </p>
      <Suspense fallback={<PageFallback />}>
        <CompetencyList />
      </Suspense>
    </>
  );
}

async function CompetencyList() {
  await connection();
  const competencies = await getCompetenciesWithLevel();
  return (
    <ul className="mt-8 space-y-3">
      {competencies.map((competency) => (
        <li key={competency.name} className="glass-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold">{competency.name}</h2>
            <form action={setCompetencyLevel.bind(null, competency.name)} className="flex gap-1">
              {COMPETENCY_LEVELS.map((level) => (
                <button
                  key={level}
                  type="submit"
                  name="level"
                  value={level}
                  aria-pressed={competency.level === level}
                  className={`rounded-full px-3 py-1 text-xs ${
                    competency.level === level
                      ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md shadow-fuchsia-500/30"
                      : "glass text-zinc-600 hover:bg-white/60 dark:text-zinc-300 dark:hover:bg-white/10"
                  }`}
                >
                  {LEVEL_LABELS[level]}
                </button>
              ))}
            </form>
          </div>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-zinc-500">Beginner milestone</dt>
              <dd>{competency.beginnerMilestone}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Job-ready evidence</dt>
              <dd>{competency.jobReadyEvidence}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
