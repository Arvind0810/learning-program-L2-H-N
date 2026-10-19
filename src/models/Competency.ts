import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const competencySchema = new Schema(
  {
    order: { type: Number, required: true },
    name: { type: String, required: true, unique: true },
    beginnerMilestone: { type: String, required: true },
    jobReadyEvidence: { type: String, required: true },
  },
  { timestamps: true },
);

export type CompetencyDoc = InferSchemaType<typeof competencySchema>;

export const Competency: Model<CompetencyDoc> =
  models.Competency ?? model<CompetencyDoc>("Competency", competencySchema);
