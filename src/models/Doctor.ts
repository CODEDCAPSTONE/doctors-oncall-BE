import { Schema, model, Types, Document, models } from "mongoose";
import autopopulate from "mongoose-autopopulate";

export interface IDoctor extends Document {
  provider: Types.ObjectId;

  // Fields duplicated from HealthCareProvider
  name: string;
  email: string;
  civilID: string;
  phoneNum: string;
  YOEX: number;
  licenseNum: string;
  specialization: string;
  image?: string;
  bio?: string;
  gender?: string;
  age?: number;

  // Doctor-specific fields
  hospitalOrClinicName: string;
  speciality?: string;
  isOnCall?: boolean;

  appointments?: Types.ObjectId[];
  prescriptions?: Types.ObjectId[];
}

const doctorSchema = new Schema<IDoctor>(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "HealthCareProvider",
      required: true,
      autopopulate: true,
    },

    // Duplicate fields from HealthCareProvider
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    civilID: { type: String, required: true, trim: true },
    phoneNum: { type: String, required: true, trim: true },
    YOEX: { type: Number, required: true },
    licenseNum: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    image: { type: String },
    bio: { type: String },
    gender: { type: String },
    age: { type: Number },

    // Doctor-specific
    hospitalOrClinicName: { type: String, required: true, trim: true },
    speciality: { type: String },
    isOnCall: { type: Boolean, default: false },

    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    prescriptions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Prescription",
      },
    ],
  },
  { timestamps: true }
);

doctorSchema.plugin(autopopulate);

export default models.Doctor || model<IDoctor>("Doctor", doctorSchema);
