import { Schema, model } from "mongoose";

// this model is to determine the available schedule for all health care providers
const avalScheduleSchema = new Schema(
  {
    date: { type: Date, required: true }, // date of the appointment, for each date there will be slots available
    // this model represents the available schedule for a health care provider for each day specified by date
    time: { type: String, required: true }, // time of the appointment in HH:mm format
    slotsNum: { type: Number, required: true }, // number of available slots
    healthCareProvider: {
      ref: "HealthCareProvider",
      type: Schema.Types.ObjectId,
    }, // HealthCareProvider: doctor or nurse or physio or labs
  },
  {
    timestamps: true, // automatically manage createdAt and updatedAt fields
  }
);

const AvailableSchedule = model("AvailableSchedule", avalScheduleSchema);
export default AvailableSchedule;
