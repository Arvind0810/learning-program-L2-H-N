"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitQuiz, type QuizSubmission } from "@/app/actions";
import type { ClientQuestion } from "@/lib/quiz";
import ProgressBar from "@/components/ProgressBar";

const UNANSWERED = -1;
const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

type Props = {
  questions: ClientQuestion[];
  meta: Omit<QuizSubmission, "questionIds" | "answers">;
};

export default function QuizRunner({ questions, meta }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => UNANSWERED));
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const question = questions[current];
  const answeredCount = answers.filter((answer) => answer !== UNANSWERED).length;
  const isLast = current === questions.length - 1;

  function choose(optionIndex: number) {
    setAnswers((prev) => prev.map((answer, i) => (i === current ? optionIndex : answer)));
  }

  function submit() {
    const unanswered = questions.length - answeredCount;
    if (unanswered > 0 && !window.confirm(`${unanswered} question(s) unanswered. They will count as wrong. Submit anyway?`)) {
      return;
    }
    setError(null);
    startTransition(async () => {
      try {
        const { attemptId } = await submitQuiz({ ...meta, questionIds: questions.map((q) => q.id), answers });
        router.push(`/tests/attempts/${attemptId}`);
      } catch {
        setError("Could not submit the test. Check your connection and try again.");
      }
    });
  }

  return (
    <div className="mt-6 space-y-5">
      <div className="glass-card p-5">
        <div className="mb-2 flex justify-between text-sm text-zinc-500">
          <span>
            Question {current + 1} of {questions.length}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <ProgressBar percent={Math.round(((current + 1) / questions.length) * 100)} label="Test position" />
      </div>

      <div className="glass-card p-6">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Week {question.week}</p>
        <h2 className="mt-2 text-lg font-semibold leading-snug">{question.prompt}</h2>
        <ul className="mt-5 space-y-3" role="radiogroup" aria-label="Answer options">
          {question.options.map((option, optionIndex) => {
            const selected = answers[current] === optionIndex;
            return (
              <li key={option}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => choose(optionIndex)}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                    selected
                      ? "border-transparent bg-gradient-to-r from-indigo-500/90 to-fuchsia-500/90 text-white shadow-lg shadow-fuchsia-500/20"
                      : "glass hover:bg-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                      selected ? "bg-white/25" : "bg-black/5 dark:bg-white/10"
                    }`}
                  >
                    {OPTION_LETTERS[optionIndex]}
                  </span>
                  <span className="pt-0.5">{option}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {error && <p className="glass-card p-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCurrent((i) => i - 1)}
          disabled={current === 0}
          className="glass rounded-xl px-5 py-2.5 text-sm disabled:opacity-40"
        >
          ← Previous
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={submit}
            disabled={isPending}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 disabled:opacity-60"
          >
            {isPending ? "Scoring…" : "Submit test"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrent((i) => i + 1)}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30"
          >
            Next →
          </button>
        )}
      </div>

      <nav aria-label="Jump to question" className="glass-card flex flex-wrap gap-2 p-4">
        {questions.map((q, i) => (
          <button
            key={q.id}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Question ${i + 1}${answers[i] === UNANSWERED ? ", unanswered" : ", answered"}`}
            className={`size-9 rounded-lg text-sm font-medium ${
              i === current
                ? "bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white"
                : answers[i] === UNANSWERED
                  ? "glass text-zinc-500"
                  : "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </nav>
    </div>
  );
}
