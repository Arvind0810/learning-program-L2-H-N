import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const resourceSchema = new Schema(
  { label: { type: String, required: true }, url: { type: String, required: true } },
  { _id: false },
);

export const RESOURCE_KINDS = ["video", "practice", "android-app", "docs"] as const;
export type ResourceKind = (typeof RESOURCE_KINDS)[number];

const weekResourceSchema = new Schema(
  {
    kind: { type: String, enum: RESOURCE_KINDS, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    source: { type: String, default: "" },
    language: { type: String, enum: ["hi", "en"], default: "en" },
    tabletFriendly: { type: Boolean, default: false },
    note: { type: String, default: "" },
  },
  { _id: false },
);

const weekSchema = new Schema(
  {
    number: { type: Number, required: true },
    title: { type: String, required: true },
    topics: { type: [String], default: [] },
    exercise: { type: String, default: "" },
    resources: { type: [weekResourceSchema], default: [] },
  },
  { _id: false },
);

const phaseSchema = new Schema(
  {
    month: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    objective: { type: String, required: true },
    weeks: { type: [weekSchema], default: [] },
    deliverable: { type: [String], default: [] },
    resources: { type: [resourceSchema], default: [] },
  },
  { timestamps: true },
);

export type PhaseDoc = InferSchemaType<typeof phaseSchema>;
export type WeekDoc = InferSchemaType<typeof weekSchema>;
export type WeekResourceDoc = InferSchemaType<typeof weekResourceSchema>;

export const Phase: Model<PhaseDoc> = models.Phase ?? model<PhaseDoc>("Phase", phaseSchema);
