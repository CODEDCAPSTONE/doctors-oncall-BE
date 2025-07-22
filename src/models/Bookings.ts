import { Schema, model, Types, Document } from "mongoose";

export interface IBooking extends Document {
  patient: Types.ObjectId;
  serviceProvider: Types.ObjectId;
  type?: "transport" | "equipment" | "nurse";
  date: Date;
  time: number;
  location: string;
  notes?: string;
  status?: "upcoming" | "pending" | "done" | "cancelled";
  avgRate?: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    serviceProvider: {
      type: Schema.Types.ObjectId,
      ref: "HealthCareProvider",
      required: true,
    },
    type: {
      type: String,
      enum: ["transport", "equipment", "nurse"],
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["upcoming", "pending", "done", "cancelled"],
      default: "pending",
    },
    avgRate: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Booking = model<IBooking>("Booking", bookingSchema);
export default Booking;
