import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

export const PRACTICE_PLATFORMS = ["browser", "android-app"] as const;

const practiceToolSchema = new Schema(
  {
    order: { type: Number, required: true },
    name: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    platform: { type: String, enum: PRACTICE_PLATFORMS, required: true },
    category: { type: String, required: true },
    useFor: { type: String, required: true },
  },
  { timestamps: true },
);

export type PracticeToolDoc = InferSchemaType<typeof practiceToolSchema>;

export const PracticeTool: Model<PracticeToolDoc> =
  models.PracticeTool ?? model<PracticeToolDoc>("PracticeTool", practiceToolSchema);
