import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";
import PageFallback from "@/components/PageFallback";
import QuizRunner from "@/components/QuizRunner";
import { getWeek } from "@/lib/roadmap";
import { getWeekTestQuestions } from "@/lib/quiz";
import { PASS_PERCENT } from "@/lib/quizRules";

export default function WeekTestPage({ params }: PageProps<"/tests/week/[week]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <WeekTest params={params} />
    </Suspense>
  );
}

async function WeekTest({ params }: Pick<PageProps<"/tests/week/[week]">, "params">) {
  await connection();
  const weekNumber = Number((await params).week);
  const [found, questions] = await Promise.all([getWeek(weekNumber), getWeekTestQuestions(weekNumber)]);
  if (!found || questions.length === 0) notFound();

  return (
    <>
      <Link href={`/weeks/${weekNumber}`} className="text-sm text-zinc-500 hover:text-foreground">
        ← Week {weekNumber}: {found.week.title}
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-gradient">Week {weekNumber} test</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {questions.length} questions · score {PASS_PERCENT}% or more to complete the week. Retake as often as you like.
      </p>
      <QuizRunner questions={questions} meta={{ kind: "week", week: weekNumber }} />
    </>
  );
}
