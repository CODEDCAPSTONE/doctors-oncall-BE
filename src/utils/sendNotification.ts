import Notification from "../models/Notification";
import { Types } from "mongoose";

export const sendNotification = async (
  patientId: Types.ObjectId,
  message: string,
  type: "booking confirmation" | "reminder" | "cancellation"
) => {
  await Notification.create({ patientId, message, type });
};
