"use server";

import { refresh } from "next/cache";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/db";
import { Competency } from "@/models/Competency";
import { InterviewQuestion } from "@/models/InterviewQuestion";
import { Question } from "@/models/Question";
import { QuizAttempt, type QuizKind } from "@/models/QuizAttempt";
import { PASS_PERCENT, RANDOM_TEST_SIZES, weeksInMonth } from "@/lib/quizRules";
import { COMPETENCY_LEVELS, CompetencyProgress, WeekProgress } from "@/models/Progress";

const TOTAL_WEEKS = 24;
const MAX_TOPICS_PER_WEEK = 50;
const MAX_NOTES_LENGTH = 5000;

// Server Actions are reachable by direct POST, so every argument is validated here.
function assertWeek(week: number) {
  if (!Number.isInteger(week) || week < 1 || week > TOTAL_WEEKS) {
    throw new Error("Invalid week");
  }
}

export async function toggleTopic(week: number, topicIndex: number) {
  assertWeek(week);
  if (!Number.isInteger(topicIndex) || topicIndex < 0 || topicIndex >= MAX_TOPICS_PER_WEEK) {
    throw new Error("Invalid topic");
  }
  await connectDB();
  const existing = await WeekProgress.findOne({ week }).lean();
  const isDone = existing?.completedTopics.includes(topicIndex) ?? false;
  await WeekProgress.updateOne(
    { week },
    isDone
      ? { $pull: { completedTopics: topicIndex } }
      : { $addToSet: { completedTopics: topicIndex } },
    { upsert: true },
  );
  refresh();
}

export async function toggleExercise(week: number) {
  assertWeek(week);
  await connectDB();
  const existing = await WeekProgress.findOne({ week }).lean();
  await WeekProgress.updateOne(
    { week },
    { $set: { exerciseDone: !existing?.exerciseDone } },
    { upsert: true },
  );
  refresh();
}

export async function saveNotes(week: number, formData: FormData) {
  assertWeek(week);
  const notes = String(formData.get("notes") ?? "").slice(0, MAX_NOTES_LENGTH);
  await connectDB();
  await WeekProgress.updateOne({ week }, { $set: { notes } }, { upsert: true });
  refresh();
}

export async function setCompetencyLevel(competency: string, formData: FormData) {
  const level = String(formData.get("level"));
  if (!COMPETENCY_LEVELS.includes(level as (typeof COMPETENCY_LEVELS)[number])) {
    throw new Error("Invalid level");
  }
  await connectDB();
  if (!(await Competency.exists({ name: competency }))) throw new Error("Unknown competency");
  await CompetencyProgress.updateOne({ competency }, { $set: { level } }, { upsert: true });
  refresh();
}

export async function toggleQuestionPracticed(questionId: string) {
  if (!isValidObjectId(questionId)) throw new Error("Invalid question");
  await connectDB();
  const question = await InterviewQuestion.findById(questionId);
  if (!question) throw new Error("Question not found");
  question.practiced = !question.practiced;
  await question.save();
  refresh();
}

const TOTAL_MONTHS = 6;
const UNANSWERED = -1;

export type QuizSubmission = {
  kind: QuizKind;
  week?: number;
  month?: number | null;
  questionIds: string[];
  answers: number[];
};

function assertSubmissionShape(submission: QuizSubmission) {
  const { kind, questionIds, answers } = submission;
  const maxSize = Math.max(...RANDOM_TEST_SIZES);
  if (kind !== "week" && kind !== "random") throw new Error("Invalid test type");
  if (!Array.isArray(questionIds) || questionIds.length === 0 || questionIds.length > maxSize) {
    throw new Error("Invalid questions");
  }
  if (new Set(questionIds).size !== questionIds.length || !questionIds.every(isValidObjectId)) {
    throw new Error("Invalid questions");
  }
  if (!Array.isArray(answers) || answers.length !== questionIds.length) throw new Error("Invalid answers");
  if (!answers.every((answer) => Number.isInteger(answer) && answer >= UNANSWERED)) {
    throw new Error("Invalid answers");
  }
}

// Scoring happens here, against the DB, so the client never decides what is correct.
export async function submitQuiz(submission: QuizSubmission) {
  assertSubmissionShape(submission);
  const { kind, questionIds, answers } = submission;
  await connectDB();

  const questions = await Question.find({ _id: { $in: questionIds } }).lean();
  if (questions.length !== questionIds.length) throw new Error("Unknown question");
  const byId = new Map(questions.map((question) => [String(question._id), question]));

  let week: number | undefined;
  let month: number | undefined;
  if (kind === "week") {
    week = Number(submission.week);
    assertWeek(week);
    const weekQuestionCount = await Question.countDocuments({ week });
    if (questions.some((question) => question.week !== week) || questions.length !== weekQuestionCount) {
      throw new Error("A week test must include every question for that week");
    }
  } else if (submission.month != null) {
    month = Number(submission.month);
    if (!Number.isInteger(month) || month < 1 || month > TOTAL_MONTHS) throw new Error("Invalid month");
    const allowedWeeks = new Set(weeksInMonth(month));
    if (questions.some((question) => !allowedWeeks.has(question.week))) throw new Error("Invalid question scope");
  }

  const items = questionIds.map((id, i) => {
    const question = byId.get(id)!;
    const chosenIndex = answers[i] < question.options.length ? answers[i] : UNANSWERED;
    return {
      questionId: question._id,
      week: question.week,
      prompt: question.prompt,
      options: question.options,
      answerIndex: question.answerIndex,
      chosenIndex,
      explanation: question.explanation,
    };
  });
  const correct = items.filter((item) => item.chosenIndex === item.answerIndex).length;
  const percent = Math.round((correct / items.length) * 100);
  const passed = percent >= PASS_PERCENT;

  const attempt = await QuizAttempt.create({
    kind,
    week,
    month,
    items,
    correct,
    total: items.length,
    percent,
    passed,
  });

  if (kind === "week") {
    await WeekProgress.updateOne(
      { week },
      { $max: { bestTestPercent: percent }, ...(passed ? { $set: { testPassed: true } } : {}) },
      { upsert: true },
    );
  }

  return { attemptId: String(attempt._id) };
}
