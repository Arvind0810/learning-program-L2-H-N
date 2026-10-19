import mongoose from "mongoose";
import { connectDB } from "../src/lib/db";
import { Phase } from "../src/models/Phase";
import { Project } from "../src/models/Project";
import { Competency } from "../src/models/Competency";
import { InterviewQuestion } from "../src/models/InterviewQuestion";
import { PracticeTool } from "../src/models/PracticeTool";
import { Question } from "../src/models/Question";
import { questionBank, type QuestionSeed } from "./questionData";
import { competencies, interviewQuestions, phases, projects } from "./roadmapData";
import { practiceTools, weekResources } from "./resourceData";

// Correct answers are authored first; rotate deterministically so the right option isn't always "A"
// and stays in the same position across re-seeds.
function toQuestionDoc(week: number, seed: QuestionSeed) {
  const all = [seed.correct, ...seed.wrong];
  const offset = [...seed.prompt].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % all.length;
  const options = all.map((_, i) => all[(i + offset) % all.length]);
  return {
    week,
    prompt: seed.prompt,
    options,
    answerIndex: options.indexOf(seed.correct),
    explanation: seed.explanation,
  };
}

// Upserts by natural key so re-running refreshes content without touching progress.
async function seed() {
  await connectDB();

  const phasesWithResources = phases.map((phase) => ({
    ...phase,
    weeks: phase.weeks.map((week) => ({ ...week, resources: weekResources[week.number] ?? [] })),
  }));

  await Phase.bulkWrite(
    phasesWithResources.map((phase) => ({
      updateOne: { filter: { month: phase.month }, update: { $set: phase }, upsert: true },
    })),
  );
  await Project.bulkWrite(
    projects.map((project) => ({
      updateOne: { filter: { order: project.order }, update: { $set: project }, upsert: true },
    })),
  );
  await Competency.bulkWrite(
    competencies.map((competency) => ({
      updateOne: { filter: { name: competency.name }, update: { $set: competency }, upsert: true },
    })),
  );
  await InterviewQuestion.bulkWrite(
    Object.entries(interviewQuestions).flatMap(([category, questions]) =>
      questions.map((question) => ({
        updateOne: {
          filter: { question },
          update: { $set: { category, question } },
          upsert: true,
        },
      })),
    ),
  );

  await PracticeTool.bulkWrite(
    practiceTools.map((tool) => ({
      updateOne: { filter: { name: tool.name }, update: { $set: tool }, upsert: true },
    })),
  );

  const questionDocs = Object.entries(questionBank).flatMap(([week, seeds]) =>
    seeds.map((seed) => toQuestionDoc(Number(week), seed)),
  );
  await Question.bulkWrite(
    questionDocs.map((question) => ({
      updateOne: {
        filter: { week: question.week, prompt: question.prompt },
        update: { $set: question },
        upsert: true,
      },
    })),
  );
  await Question.deleteMany({
    $nor: questionDocs.map(({ week, prompt }) => ({ week, prompt })),
  });

  console.log(
    `Seeded ${phases.length} phases, ${projects.length} projects, ${competencies.length} competencies, ${practiceTools.length} practice tools, ${questionDocs.length} questions.`,
  );
}

seed()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
