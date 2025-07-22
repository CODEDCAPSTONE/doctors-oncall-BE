import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  providerId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema = new Schema(
  {
    providerId: {
      type: Schema.Types.ObjectId,
      ref: "HealthcareProvider",
      required: true,
    },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    rating: {
      type: Number,
      required: true,
      min: [1, "Minimum rating is 1"],
      max: [5, "Maximum rating is 5"],
    },
    comment: { type: String },
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>("Review", reviewSchema);
