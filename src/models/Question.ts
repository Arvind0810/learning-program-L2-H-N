import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const questionSchema = new Schema(
  {
    week: { type: Number, required: true, index: true },
    prompt: { type: String, required: true },
    options: { type: [String], required: true },
    answerIndex: { type: Number, required: true },
    explanation: { type: String, required: true },
  },
  { timestamps: true },
);

questionSchema.index({ week: 1, prompt: 1 }, { unique: true });

export type QuestionDoc = InferSchemaType<typeof questionSchema>;

export const Question: Model<QuestionDoc> =
  models.Question ?? model<QuestionDoc>("Question", questionSchema);
