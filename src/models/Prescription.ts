import { Schema, model, Types, Document } from "mongoose";
export interface IPrescription extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  dependencies?: Types.ObjectId[];
  appointment?: Types.ObjectId; 
  nameAndUsage: string[];
  photoURL?: string;
  validUntil?: Date;
}
const prescriptionSchema = new Schema<IPrescription>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "HealthCareProvider",
      required: true,
    },
    dependencies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dependent",
      },
    ],
    appointment: {      
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: false,
    },
    nameAndUsage: [
      {
        type: String,
        required: true,
      },
    ],
    photoURL: {
      type: String,
    },
    validUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);
export default model<IPrescription>("Prescription", prescriptionSchema);
