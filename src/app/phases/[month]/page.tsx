import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import ProgressBar from "@/components/ProgressBar";
import PageFallback from "@/components/PageFallback";
import { getPhase, getWeekProgressMap, weekCompletion } from "@/lib/roadmap";

export default function PhasePage({ params }: PageProps<"/phases/[month]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PhaseContent params={params} />
    </Suspense>
  );
}

async function PhaseContent({ params }: Pick<PageProps<"/phases/[month]">, "params">) {
  await connection();
  const { month } = await params;
  const [phase, progressByWeek] = await Promise.all([getPhase(Number(month)), getWeekProgressMap()]);
  if (!phase) notFound();

  return (
    <>
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Month {phase.month}</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-gradient">{phase.title}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{phase.objective}</p>

      <ol className="mt-8 space-y-3">
        {phase.weeks.map((week) => {
          const stats = weekCompletion(week.topics.length, progressByWeek.get(week.number));
          return (
            <li key={week.number}>
              <Link
                href={`/weeks/${week.number}`}
                className="block glass-card glass-interactive p-5"
              >
                <p className="flex items-center justify-between text-xs text-zinc-500">
                  Week {week.number}
                  {stats.complete && (
                    <span className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 py-0.5 text-white">
                      Test passed ✓
                    </span>
                  )}
                </p>
                <h2 className="mb-3 font-semibold">{week.title}</h2>
                <ProgressBar percent={stats.percent} label={`Week ${week.number} progress`} />
              </Link>
            </li>
          );
        })}
      </ol>

      <section className="glass-card mt-10 p-6">
        <h2 className="font-semibold">Month {phase.month} deliverable</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {phase.deliverable.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {phase.resources.length > 0 && (
        <section className="glass-card mt-6 p-6">
          <h2 className="font-semibold">Official resources</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {phase.resources.map((resource) => (
              <li key={resource.url}>
                <a href={resource.url} target="_blank" rel="noreferrer" className="text-indigo-700 underline dark:text-indigo-300">
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
