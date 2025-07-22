import mongoose, { Schema, Types, Document } from "mongoose";

export interface Patient extends Document {
  name: string;
  email?: string;
  phone: string;
  civilID: string;
  password: string;
  roles?: string[];
  dependents?: Types.ObjectId[];
  profileImage?: string;
  documentPath?: string;
  medicalHistoryPath?: string;
  favorites?: Types.ObjectId[];
  appointments?: Types.ObjectId[];
  bookings?: Types.ObjectId[];
  bloodType?: string;
  gender?: string;
  birthDay?: Date;
  weight?: number;
  height?: number;
  historyReports?: string[];
  initialCheckup?: string[];
  isCareGiver?: boolean;
  address?: {
    area?: string;
    block?: number;
    street?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new mongoose.Schema<Patient>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, required: true },
    civilID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      default: ["patient"],
    },
    dependents: [{ type: Schema.Types.ObjectId, ref: "Dependent" }],
    profileImage: { type: String },
    documentPath: { type: String },
    medicalHistoryPath: { type: String },
    favorites: [{ type: Schema.Types.ObjectId, ref: "HealthCareProvider" }],
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    bloodType: { type: String },
    gender: { type: String },
    birthDay: { type: Date },
    weight: { type: Number },
    height: { type: Number },
    historyReports: [{ type: String }],
    initialCheckup: [{ type: String }],
    isCareGiver: { type: Boolean, default: false },
    address: {
      area: { type: String },
      block: { type: Number },
      street: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model<Patient>("Patient", PatientSchema);
