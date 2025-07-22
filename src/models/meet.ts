import { Schema, model, Document } from "mongoose";

export interface IMeet extends Document {
  title: string;
  description?: string;
  scheduledTime: Date;
  meetLink: string;
  calendarEventId: string;
  createdBy: string; // User ID or email
}

const meetSchema = new Schema<IMeet>({
  title: { type: String, required: true },
  description: { type: String },
  scheduledTime: { type: Date, required: true },
  meetLink: { type: String, required: true },
  calendarEventId: { type: String, required: true },
  createdBy: { type: String, required: true },
});

export default model<IMeet>("Meet", meetSchema);