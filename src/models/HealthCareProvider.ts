import mongoose, { Schema, model, Document, Types } from "mongoose";
export interface IHealthCareProvider extends Document {
  _id: Types.ObjectId;
  name: string;
  age?: number;
  gender?: "Male" | "Female";
  email?: string;
  civilID: string;
  phoneNum: string;
  password: string; // unified name (not passwordHash)
  YOEX: number;
  image?: string;
  licenseNum: string;
  bio?: string;
  specialization: string;
  averageRating?: number;
  reviewCount?: number;
  patient?: Types.ObjectId[];
  appointments?: Types.ObjectId[];
  block?: string;
  street?: string;
  building?: string;
  area?: string;
  doctor?: Types.ObjectId;
  nurse?: Types.ObjectId;
  labs?: Types.ObjectId;
  physiotherapist?: Types.ObjectId;
  avalSchedule?: Types.ObjectId[];
  prescriptions?: Types.ObjectId[];
  onCall?: boolean;
  role: "Doctor" | "Nurse" | "Physiotherapist" | "Lab";
}

const HealthCareProviderSchema = new Schema<IHealthCareProvider>(
  {
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female"] },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    civilID: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{12}$/, "CivilID must be exactly 12 digits"],
    },
    phoneNum: {
      type: String,
      required: true,
      match: [/^\d{8}$/, "Phone number must be exactly 8 digits"],
    },
    password: { type: String, required: true }, 
    YOEX: { type: Number, required: true },
    image: { type: String },
    licenseNum: { type: String, required: true },
    bio: { type: String },
    specialization: { type: String, required: true },

    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },

    patient: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    prescriptions: [{ type: Schema.Types.ObjectId, ref: "Prescription" }],

    block: { type: String },
    street: { type: String },
    building: { type: String },
    area: { type: String },

    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    nurse: { type: Schema.Types.ObjectId, ref: "Nurse" },
    labs: { type: Schema.Types.ObjectId, ref: "Lab" },
    physiotherapist: { type: Schema.Types.ObjectId, ref: "Physiotherapist" },

    avalSchedule: [{ type: Schema.Types.ObjectId, ref: "AvailableSchedule" }],
    onCall: { type: Boolean, default: false },

    role: {
      type: String,
      enum: ["Doctor", "Nurse", "Physiotherapist", "Lab"],
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IHealthCareProvider>("HealthCareProvider", HealthCareProviderSchema);
