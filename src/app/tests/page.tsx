import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import PageFallback from "@/components/PageFallback";
import { getAttemptHistory } from "@/lib/quiz";
import { DEFAULT_RANDOM_TEST_SIZE, PASS_PERCENT, RANDOM_TEST_SIZES } from "@/lib/quizRules";

const MONTH_OPTIONS = [
  { value: "", label: "Whole roadmap" },
  { value: "1", label: "Month 1 · Networking" },
  { value: "2", label: "Month 2 · Network security" },
  { value: "3", label: "Month 3 · Windows & identity" },
  { value: "4", label: "Month 4 · Cloud networking" },
  { value: "5", label: "Month 5 · Automation & monitoring" },
  { value: "6", label: "Month 6 · Portfolio & career" },
];
const RECENT_TREND_SIZE = 10;

export default function TestsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gradient">Tests</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Weekly tests unlock completion at {PASS_PERCENT}%. Random tests can be taken anytime to check overall skill.
      </p>

      <section className="glass-card mt-8 p-6">
        <h2 className="font-semibold">Start a random test</h2>
        <form action="/tests/random" className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="text-sm">
            <span className="mb-1 block text-zinc-500">Topics</span>
            <select name="month" className="glass w-full rounded-xl px-3 py-2.5">
              {MONTH_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-zinc-500">Questions</span>
            <select name="size" defaultValue={DEFAULT_RANDOM_TEST_SIZE} className="glass w-full rounded-xl px-3 py-2.5">
              {RANDOM_TEST_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30"
          >
            Start test
          </button>
        </form>
      </section>

      <Suspense fallback={<PageFallback />}>
        <History />
      </Suspense>
    </>
  );
}

async function History() {
  await connection();
  const attempts = await getAttemptHistory();

  if (attempts.length === 0) {
    return <p className="glass-card mt-6 p-5 text-sm text-zinc-600 dark:text-zinc-400">No tests taken yet.</p>;
  }

  const randomAttempts = attempts.filter((attempt) => attempt.kind === "random");
  const recent = randomAttempts.slice(0, RECENT_TREND_SIZE);
  const average = recent.length ? Math.round(recent.reduce((sum, a) => sum + a.percent, 0) / recent.length) : null;
  const best = randomAttempts.length ? Math.max(...randomAttempts.map((a) => a.percent)) : null;
  const weeksPassed = new Set(attempts.filter((a) => a.kind === "week" && a.passed).map((a) => a.week)).size;

  return (
    <>
      <section className="glass-card mt-6 grid grid-cols-3 gap-4 p-6 text-center">
        <Stat value={average === null ? "—" : `${average}%`} label={`Random avg (last ${RECENT_TREND_SIZE})`} />
        <Stat value={best === null ? "—" : `${best}%`} label="Best random" />
        <Stat value={`${weeksPassed}/24`} label="Week tests passed" />
      </section>

      {recent.length > 1 && (
        <section className="glass-card mt-6 p-6">
          <h2 className="mb-4 font-semibold">Random test trend</h2>
          <div className="flex h-32 items-end gap-2" role="img" aria-label="Scores of recent random tests, oldest to newest">
            {[...recent].reverse().map((attempt) => (
              <div key={String(attempt._id)} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[11px] tabular-nums text-zinc-500">{attempt.percent}</span>
                <div
                  className={`w-full rounded-t-md ${
                    attempt.passed ? "bg-gradient-to-t from-indigo-500 to-fuchsia-500" : "bg-rose-400/70"
                  }`}
                  style={{ height: `${Math.max(attempt.percent, 4)}%` }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="glass-card mt-6 p-6">
        <h2 className="mb-3 font-semibold">History</h2>
        <ul className="divide-y divide-black/5 dark:divide-white/10">
          {attempts.map((attempt) => (
            <li key={String(attempt._id)}>
              <Link
                href={`/tests/attempts/${attempt._id}`}
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 hover:bg-white/40 dark:hover:bg-white/5"
              >
                <span>
                  <span className="block text-sm font-medium">
                    {attempt.kind === "week"
                      ? `Week ${attempt.week} test`
                      : `Random · ${attempt.month ? `Month ${attempt.month}` : "All topics"}`}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {attempt.createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} ·{" "}
                    {attempt.correct}/{attempt.total}
                  </span>
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold tabular-nums text-white ${
                    attempt.passed ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-rose-500 to-orange-500"
                  }`}
                >
                  {attempt.percent}%
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
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
