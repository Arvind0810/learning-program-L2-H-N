import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import PageFallback from "@/components/PageFallback";
import QuizRunner from "@/components/QuizRunner";
import { getRandomTestQuestions } from "@/lib/quiz";
import { DEFAULT_RANDOM_TEST_SIZE, RANDOM_TEST_SIZES } from "@/lib/quizRules";

const TOTAL_MONTHS = 6;

function parseSize(raw: string | string[] | undefined): number {
  const size = Number(raw);
  return (RANDOM_TEST_SIZES as readonly number[]).includes(size) ? size : DEFAULT_RANDOM_TEST_SIZE;
}

function parseMonth(raw: string | string[] | undefined): number | null {
  const month = Number(raw);
  return Number.isInteger(month) && month >= 1 && month <= TOTAL_MONTHS ? month : null;
}

export default function RandomTestPage({ searchParams }: PageProps<"/tests/random">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <RandomTest searchParams={searchParams} />
    </Suspense>
  );
}

async function RandomTest({ searchParams }: Pick<PageProps<"/tests/random">, "searchParams">) {
  await connection();
  const params = await searchParams;
  const size = parseSize(params.size);
  const month = parseMonth(params.month);
  const questions = await getRandomTestQuestions(size, month);

  return (
    <>
      <Link href="/tests" className="text-sm text-zinc-500 hover:text-foreground">
        ← Tests
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-gradient">Random skill test</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        {questions.length} random questions from {month ? `month ${month}` : "the whole roadmap"}.
      </p>
      {questions.length === 0 ? (
        <p className="glass-card mt-6 p-5 text-sm">
          No questions found. Run <code className="font-mono">pnpm seed</code> first.
        </p>
      ) : (
        <QuizRunner questions={questions} meta={{ kind: "random", month }} />
      )}
    </>
  );
}
