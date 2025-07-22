import { Schema, model, Types, Document } from "mongoose";

export interface IMedicalReport extends Document {
  lab: Types.ObjectId;
  patient: Types.ObjectId;
  booking?: Types.ObjectId;
  testName: string;
  price: number;
  reportURL: string;
  createdAt?: Date;
  analysis?: string;
  uploadedBy?: Types.ObjectId;
  status?: "Pending" | "In Progress" | "Completed" | "Sent";
  notes?: string;
  validUntil?: Date;
}

const medicalReportSchema = new Schema<IMedicalReport>(
  {
    lab: {
      type: Schema.Types.ObjectId,
      ref: "Lab",
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: false,
    },
    testName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    reportURL: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: () => new Date(),
    },
    analysis: {
      type: String,
      required: false,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "HealthCareProvider", // must have role: Lab
      required: false,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Sent"],
      default: "Pending",
    },
    notes: {
      type: String,
    },
    validUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default model<IMedicalReport>("MedicalReport", medicalReportSchema);