import { Suspense } from "react";
import { connection } from "next/server";
import CheckButton from "@/components/CheckButton";
import PageFallback from "@/components/PageFallback";
import { getInterviewQuestions } from "@/lib/roadmap";
import { toggleQuestionPracticed } from "@/app/actions";

export default function InterviewPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gradient">Interview prep</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Answer every question as: symptoms → investigation → root cause → corrective action → prevention.
      </p>
      <Suspense fallback={<PageFallback />}>
        <QuestionBank />
      </Suspense>
    </>
  );
}

async function QuestionBank() {
  await connection();
  const questions = await getInterviewQuestions();
  const byCategory = Map.groupBy(questions, (question) => question.category);

  return (
    <div className="mt-8 space-y-6">
      {[...byCategory].map(([category, categoryQuestions]) => (
        <section key={category} className="glass-card p-6">
          <h2 className="mb-2 font-semibold">{category}</h2>
          <ul className="space-y-0.5">
            {categoryQuestions.map((question) => (
              <li key={String(question._id)}>
                <CheckButton
                  action={toggleQuestionPracticed.bind(null, String(question._id))}
                  checked={question.practiced}
                >
                  {question.question}
                </CheckButton>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
