import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

export const COMPETENCY_LEVELS = ["not-started", "beginner", "job-ready"] as const;
export type CompetencyLevel = (typeof COMPETENCY_LEVELS)[number];

// Progress lives apart from the roadmap content so re-seeding never wipes it.
const weekProgressSchema = new Schema(
  {
    week: { type: Number, required: true, unique: true },
    completedTopics: { type: [Number], default: [] },
    exerciseDone: { type: Boolean, default: false },
    testPassed: { type: Boolean, default: false },
    bestTestPercent: { type: Number, default: 0 },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

const competencyProgressSchema = new Schema(
  {
    competency: { type: String, required: true, unique: true },
    level: { type: String, enum: COMPETENCY_LEVELS, default: "not-started" },
  },
  { timestamps: true },
);

export type WeekProgressDoc = InferSchemaType<typeof weekProgressSchema>;
export type CompetencyProgressDoc = InferSchemaType<typeof competencyProgressSchema>;

export const WeekProgress: Model<WeekProgressDoc> =
  models.WeekProgress ?? model<WeekProgressDoc>("WeekProgress", weekProgressSchema);

export const CompetencyProgress: Model<CompetencyProgressDoc> =
  models.CompetencyProgress ??
  model<CompetencyProgressDoc>("CompetencyProgress", competencyProgressSchema);
