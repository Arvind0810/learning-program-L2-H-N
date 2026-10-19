import "server-only";
import { Types } from "mongoose";
import { connectDB } from "@/lib/db";
import { weeksInMonth } from "@/lib/quizRules";
import { Question } from "@/models/Question";
import { QuizAttempt } from "@/models/QuizAttempt";

export type ClientQuestion = { id: string; week: number; prompt: string; options: string[] };

const HISTORY_LIMIT = 100;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Never send answerIndex/explanation to the browser before submission.
function toClient(question: { _id: Types.ObjectId; week: number; prompt: string; options: string[] }): ClientQuestion {
  return {
    id: String(question._id),
    week: question.week,
    prompt: question.prompt,
    options: question.options,
  };
}

export async function getWeekTestQuestions(week: number): Promise<ClientQuestion[]> {
  await connectDB();
  const questions = await Question.find({ week }, { prompt: 1, options: 1, week: 1 }).lean();
  return shuffle(questions).map(toClient);
}

export async function getRandomTestQuestions(size: number, month: number | null): Promise<ClientQuestion[]> {
  await connectDB();
  const match = month ? { week: { $in: weeksInMonth(month) } } : {};
  const sampled = await Question.aggregate<{
    _id: Types.ObjectId;
    week: number;
    prompt: string;
    options: string[];
  }>([{ $match: match }, { $sample: { size } }, { $project: { prompt: 1, options: 1, week: 1 } }]);
  return sampled.map(toClient);
}

export async function getAttemptHistory() {
  await connectDB();
  return QuizAttempt.find({}, { items: 0 }).sort({ createdAt: -1 }).limit(HISTORY_LIMIT).lean();
}

export async function getAttempt(id: string) {
  if (!Types.ObjectId.isValid(id)) return null;
  await connectDB();
  return QuizAttempt.findById(id).lean();
}

export async function getWeekAttempts(week: number) {
  await connectDB();
  return QuizAttempt.find({ kind: "week", week }, { items: 0 }).sort({ createdAt: -1 }).limit(5).lean();
}
