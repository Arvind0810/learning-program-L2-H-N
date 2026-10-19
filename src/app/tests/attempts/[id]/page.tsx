import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import PageFallback from "@/components/PageFallback";
import { getAttempt } from "@/lib/quiz";
import { PASS_PERCENT } from "@/lib/quizRules";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];
const UNANSWERED = -1;

export default function AttemptPage({ params }: PageProps<"/tests/attempts/[id]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <AttemptReview params={params} />
    </Suspense>
  );
}

async function AttemptReview({ params }: Pick<PageProps<"/tests/attempts/[id]">, "params">) {
  await connection();
  const attempt = await getAttempt((await params).id);
  if (!attempt) notFound();

  const retakeHref = attempt.kind === "week" ? `/tests/week/${attempt.week}` : `/tests/random?size=${attempt.total}${attempt.month ? `&month=${attempt.month}` : ""}`;
  const title = attempt.kind === "week" ? `Week ${attempt.week} test` : `Random test${attempt.month ? ` · Month ${attempt.month}` : ""}`;

  return (
    <>
      <Link href="/tests" className="text-sm text-zinc-500 hover:text-foreground">
        ← All tests
      </Link>

      <section className="glass-card mt-4 p-6 text-center">
        <p className="text-sm uppercase tracking-wide text-zinc-500">{title}</p>
        <p className="mt-3 text-6xl font-bold text-gradient">{attempt.percent}%</p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {attempt.correct} of {attempt.total} correct ·{" "}
          {attempt.createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
        </p>
        <p
          className={`mx-auto mt-4 inline-block rounded-full px-4 py-1 text-sm font-medium text-white ${
            attempt.passed ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gradient-to-r from-rose-500 to-orange-500"
          }`}
        >
          {attempt.passed
            ? attempt.kind === "week"
              ? `Passed — week ${attempt.week} complete ✓`
              : "Passed"
            : `Below ${PASS_PERCENT}% — review and try again`}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={retakeHref}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30"
          >
            {attempt.kind === "week" ? "Retake test" : "New random test"}
          </Link>
          {attempt.kind === "week" && (
            <Link href={`/weeks/${attempt.week}`} className="glass rounded-xl px-5 py-2 text-sm">
              Back to week {attempt.week}
            </Link>
          )}
        </div>
      </section>

      <ol className="mt-6 space-y-4">
        {attempt.items.map((item, index) => {
          const isCorrect = item.chosenIndex === item.answerIndex;
          return (
            <li key={String(item.questionId)} className="glass-card p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium">
                  {index + 1}. {item.prompt}
                </p>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${
                    isCorrect ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                >
                  {isCorrect ? "Correct" : item.chosenIndex === UNANSWERED ? "Skipped" : "Wrong"}
                </span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {item.options.map((option, optionIndex) => {
                  const isAnswer = optionIndex === item.answerIndex;
                  const isChosen = optionIndex === item.chosenIndex;
                  return (
                    <li
                      key={option}
                      className={`rounded-lg px-3 py-2 ${
                        isAnswer
                          ? "bg-emerald-500/15 font-medium text-emerald-800 dark:text-emerald-300"
                          : isChosen
                            ? "bg-rose-500/15 text-rose-800 line-through dark:text-rose-300"
                            : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {OPTION_LETTERS[optionIndex]}. {option}
                      {isChosen && !isAnswer && " (your answer)"}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-medium text-foreground">Why: </span>
                {item.explanation}
              </p>
              {!isCorrect && (
                <Link href={`/weeks/${item.week}`} className="mt-2 inline-block text-sm text-indigo-700 underline dark:text-indigo-300">
                  Revise week {item.week} topics &amp; Hindi videos →
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </>
  );
}
