import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import ProgressBar from "@/components/ProgressBar";
import PageFallback from "@/components/PageFallback";
import { getPhases, getWeekProgressMap, weekCompletion } from "@/lib/roadmap";

export default function Home() {
  return (
    <>
      <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">Abel&apos;s 6-month plan</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
        Modern Hardware &amp; Network Engineer
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Hardware &amp; Networking → Network Engineer L2 → Network Security / Infrastructure → Cloud Network Engineer.
        About 10–12 hours per week: understand, implement, break, troubleshoot, explain, document.
      </p>
      <Suspense fallback={<PageFallback />}>
        <Overview />
      </Suspense>
    </>
  );
}

async function Overview() {
  await connection();
  const [phases, progressByWeek] = await Promise.all([getPhases(), getWeekProgressMap()]);

  if (phases.length === 0) {
    return (
      <p className="mt-8 glass-card p-5 text-sm">
        No roadmap data yet. Run <code className="font-mono">pnpm seed</code> to load it into MongoDB.
      </p>
    );
  }

  const phaseStats = phases.map((phase) => {
    const totals = phase.weeks.reduce(
      (acc, week) => {
        const stats = weekCompletion(week.topics.length, progressByWeek.get(week.number));
        return { done: acc.done + stats.done, total: acc.total + stats.total };
      },
      { done: 0, total: 0 },
    );
    const weeksPassed = phase.weeks.filter(
      (week) => weekCompletion(week.topics.length, progressByWeek.get(week.number)).complete,
    ).length;
    return { phase, ...totals, weeksPassed, percent: Math.round((totals.done / totals.total) * 100) };
  });

  const allWeeks = phases.flatMap((phase) => phase.weeks);
  const totalWeeks = allWeeks.length;
  const weeksCompleted = allWeeks.filter(
    (week) => weekCompletion(week.topics.length, progressByWeek.get(week.number)).complete,
  ).length;
  const done = phaseStats.reduce((sum, s) => sum + s.done, 0);
  const total = phaseStats.reduce((sum, s) => sum + s.total, 0);

  return (
    <>
      <section className="glass-card mt-8 p-6">
        <div className="mb-5 grid grid-cols-3 gap-4 text-center">
          <Stat value={`${Math.round((done / total) * 100)}%`} label="Overall" />
          <Stat value={`${weeksCompleted}/${totalWeeks}`} label="Weeks passed" />
          <Stat value={`${done}`} label="Items checked" />
        </div>
        <ProgressBar percent={Math.round((done / total) * 100)} label="Overall progress" />
      </section>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2">
        {phaseStats.map(({ phase, percent, weeksPassed }) => (
          <li key={phase.month}>
            <Link
              href={`/phases/${phase.month}`}
              className="block h-full glass-card glass-interactive p-5"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/20">
                {phase.month}
              </span>
              <h3 className="mt-3 font-semibold">{phase.title}</h3>
              <p className="mt-1 mb-3 text-sm text-zinc-600 dark:text-zinc-400">{phase.objective}</p>
              <ProgressBar percent={percent} label={`Month ${phase.month} progress`} />
              <p className="mt-2 text-xs text-zinc-500">
                {weeksPassed}/{phase.weeks.length} week tests passed
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-gradient sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">{label}</p>
    </div>
  );
}
