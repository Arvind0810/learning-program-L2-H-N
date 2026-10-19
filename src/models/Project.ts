import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const projectSchema = new Schema(
  {
    order: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    scenario: { type: String, required: true },
    requirements: { type: [String], default: [] },
    demonstrates: { type: String, required: true },
  },
  { timestamps: true },
);

export type ProjectDoc = InferSchemaType<typeof projectSchema>;

export const Project: Model<ProjectDoc> =
  models.Project ?? model<ProjectDoc>("Project", projectSchema);
