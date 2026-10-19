import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const interviewQuestionSchema = new Schema(
  {
    category: { type: String, required: true, index: true },
    question: { type: String, required: true },
    practiced: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type InterviewQuestionDoc = InferSchemaType<typeof interviewQuestionSchema>;

export const InterviewQuestion: Model<InterviewQuestionDoc> =
  models.InterviewQuestion ??
  model<InterviewQuestionDoc>("InterviewQuestion", interviewQuestionSchema);
