import "server-only";
import { connectDB } from "@/lib/db";
import { Phase } from "@/models/Phase";
import { Project } from "@/models/Project";
import { Competency } from "@/models/Competency";
import { InterviewQuestion } from "@/models/InterviewQuestion";
import { PracticeTool } from "@/models/PracticeTool";
import { CompetencyProgress, WeekProgress, type CompetencyLevel } from "@/models/Progress";

export async function getPhases() {
  await connectDB();
  return Phase.find().sort({ month: 1 }).lean();
}

export async function getPhase(month: number) {
  await connectDB();
  return Phase.findOne({ month }).lean();
}

export async function getWeek(weekNumber: number) {
  await connectDB();
  const phase = await Phase.findOne({ "weeks.number": weekNumber }).lean();
  const week = phase?.weeks.find((w) => w.number === weekNumber);
  if (!phase || !week) return null;
  return { phase, week };
}

export async function getWeekProgressMap() {
  await connectDB();
  const rows = await WeekProgress.find().lean();
  return new Map(rows.map((row) => [row.week, row]));
}

export async function getProjects() {
  await connectDB();
  return Project.find().sort({ order: 1 }).lean();
}

export async function getCompetenciesWithLevel() {
  await connectDB();
  const [competencies, progressRows] = await Promise.all([
    Competency.find().sort({ order: 1 }).lean(),
    CompetencyProgress.find().lean(),
  ]);
  const levelByName = new Map(progressRows.map((row) => [row.competency, row.level]));
  return competencies.map((competency) => ({
    ...competency,
    level: (levelByName.get(competency.name) ?? "not-started") as CompetencyLevel,
  }));
}

export async function getInterviewQuestions() {
  await connectDB();
  return InterviewQuestion.find().sort({ category: 1, createdAt: 1 }).lean();
}

export async function getPracticeTools() {
  await connectDB();
  return PracticeTool.find().sort({ order: 1 }).lean();
}

// Ticking topics tracks study; a week only counts as complete once its test is passed.
export function weekCompletion(
  topicCount: number,
  progress: { completedTopics: number[]; exerciseDone: boolean; testPassed?: boolean } | undefined,
) {
  const total = topicCount + 1;
  const done = (progress?.completedTopics.length ?? 0) + (progress?.exerciseDone ? 1 : 0);
  return {
    done,
    total,
    percent: Math.round((done / total) * 100),
    complete: Boolean(progress?.testPassed),
  };
}
