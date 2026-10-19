import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import CheckButton from "@/components/CheckButton";
import ProgressBar from "@/components/ProgressBar";
import ResourceList from "@/components/ResourceList";
import PageFallback from "@/components/PageFallback";
import { getWeek, getWeekProgressMap, weekCompletion } from "@/lib/roadmap";
import { PASS_PERCENT } from "@/lib/quizRules";
import { saveNotes, toggleExercise, toggleTopic } from "@/app/actions";

const TOTAL_WEEKS = 24;

export default function WeekPage({ params }: PageProps<"/weeks/[week]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <WeekContent params={params} />
    </Suspense>
  );
}

async function WeekContent({ params }: Pick<PageProps<"/weeks/[week]">, "params">) {
  await connection();
  const weekNumber = Number((await params).week);
  const [found, progressByWeek] = await Promise.all([getWeek(weekNumber), getWeekProgressMap()]);
  if (!found) notFound();

  const { phase, week } = found;
  const progress = progressByWeek.get(week.number);
  const completed = new Set(progress?.completedTopics ?? []);
  const stats = weekCompletion(week.topics.length, progress);

  return (
    <>
      <Link href={`/phases/${phase.month}`} className="text-sm text-zinc-500 hover:text-foreground">
        ← Month {phase.month}: {phase.title}
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-gradient">
        Week {week.number}: {week.title}
      </h1>
      <div className="mt-4">
        <ProgressBar percent={stats.percent} label="Study progress" />
      </div>

      <section className="glass-card mt-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-semibold">
            Week test {stats.complete && <span className="ml-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 py-0.5 text-xs text-white">Complete ✓</span>}
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {stats.complete
              ? `Passed · best score ${progress?.bestTestPercent ?? 0}%`
              : progress?.bestTestPercent
                ? `Best score ${progress.bestTestPercent}% — you need ${PASS_PERCENT}% to complete this week`
                : `Score ${PASS_PERCENT}% or more to mark this week complete`}
          </p>
        </div>
        <Link
          href={`/tests/week/${week.number}`}
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30"
        >
          {stats.complete ? "Retake test" : "Take test"}
        </Link>
      </section>

      <section className="glass-card mt-8 p-6">
        <h2 className="mb-2 font-semibold">Study topics</h2>
        <ul className="space-y-0.5">
          {week.topics.map((topic, index) => (
            <li key={topic}>
              <CheckButton action={toggleTopic.bind(null, week.number, index)} checked={completed.has(index)}>
                {topic}
              </CheckButton>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-card mt-6 p-6">
        <h2 className="mb-2 font-semibold">Practical exercise</h2>
        <CheckButton action={toggleExercise.bind(null, week.number)} checked={Boolean(progress?.exerciseDone)}>
          {week.exercise}
        </CheckButton>
      </section>

      {week.resources.length > 0 && (
        <section className="glass-card mt-6 p-6">
          <h2 className="mb-3 font-semibold">Resources</h2>
          <ResourceList resources={week.resources} />
        </section>
      )}

      <section className="glass-card mt-6 p-6">
        <h2 className="mb-2 font-semibold">Notes</h2>
        <form action={saveNotes.bind(null, week.number)} className="space-y-2">
          <textarea
            name="notes"
            defaultValue={progress?.notes ?? ""}
            rows={6}
            maxLength={5000}
            placeholder="Configuration, symptoms, diagnosis, fix…"
            className="glass w-full rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button type="submit" className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 hover:opacity-90">
            Save notes
          </button>
        </form>
      </section>

      <nav className="mt-8 flex justify-between text-sm [&>a]:glass [&>a]:rounded-xl [&>a]:px-4 [&>a]:py-2">
        {week.number > 1 ? <Link href={`/weeks/${week.number - 1}`}>← Week {week.number - 1}</Link> : <span />}
        {week.number < TOTAL_WEEKS && <Link href={`/weeks/${week.number + 1}`}>Week {week.number + 1} →</Link>}
      </nav>
    </>
  );
}
