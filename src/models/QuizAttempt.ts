import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

export const QUIZ_KINDS = ["week", "random"] as const;
export type QuizKind = (typeof QUIZ_KINDS)[number];

// Each item snapshots the question so history stays readable if the bank is edited or re-seeded.
const attemptItemSchema = new Schema(
  {
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    week: { type: Number, required: true },
    prompt: { type: String, required: true },
    options: { type: [String], required: true },
    answerIndex: { type: Number, required: true },
    chosenIndex: { type: Number, required: true },
    explanation: { type: String, required: true },
  },
  { _id: false },
);

const quizAttemptSchema = new Schema(
  {
    kind: { type: String, enum: QUIZ_KINDS, required: true },
    week: { type: Number },
    month: { type: Number },
    items: { type: [attemptItemSchema], default: [] },
    correct: { type: Number, required: true },
    total: { type: Number, required: true },
    percent: { type: Number, required: true },
    passed: { type: Boolean, required: true },
  },
  { timestamps: true },
);

quizAttemptSchema.index({ createdAt: -1 });

export type QuizAttemptDoc = InferSchemaType<typeof quizAttemptSchema>;

export const QuizAttempt: Model<QuizAttemptDoc> =
  models.QuizAttempt ?? model<QuizAttemptDoc>("QuizAttempt", quizAttemptSchema);
