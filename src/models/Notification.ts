// src/models/Notification.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface INotification extends Document {
  patientId: Types.ObjectId;
  message: string;
  type: "confirmation" | "reminder" | "cancellation";
  createdAt: Date;
}

const notificationSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["confirmation", "reminder", "cancellation"],
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
export default Notification;

export const sendNotification = async ({
  patientId,
  message,
  type,
}: {
  patientId: Types.ObjectId | string;
  message: string;
  type: "confirmation" | "reminder" | "cancellation";
}) => {
  const notification = new Notification({ patientId, message, type });
  await notification.save();
};
