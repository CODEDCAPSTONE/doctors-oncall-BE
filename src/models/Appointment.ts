// // import { model, Schema, Document, Types } from "mongoose";
// // import autopopulate from "mongoose-autopopulate";

// // export interface IAppointment extends Document {
// //   patient: Types.ObjectId;
// //   doctor: Types.ObjectId;
// //   type: string;
// //   status: string;
// //   price?: number;
// //   date: Date;
// //   time: number;
// //   duration: number;
// //   AItranscript?: Types.ObjectId;
// //   notes?: string[];
// // }

// // const appointmentSchema = new Schema<IAppointment>(
// //   {
// //     patient: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Patient",
// //       required: true,
// //       autopopulate: {
// //         select: `
// //           name 
// //           email 
// //           phone 
// //           civilID 
// //           profileImage 
// //           bloodType 
// //           gender 
// //           birthDay 
// //           weight 
// //           height 
// //           historyReports 
// //           initialCheckup 
// //         `, // 🔷 doctor can see medical history directly
// //       },
// //     },
// //     doctor: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Doctor",
// //       required: true,
// //       autopopulate: {
// //         select: "name speciality licenseNum",
// //       },
// //     },
// //     type: { type: String, required: true }, // online, offline, emergency
// //     status: {
// //       type: String,
// //       enum: ["pending", "upcoming", "done", "cancelled", "confirmed", "completed"],
// //       default: "pending",
// //     },
// //     price: { type: Number },
// //     date: { type: Date, required: true },
// //     time: { type: Number, required: true }, // hour of day
// //     duration: { type: Number, required: true }, // in minutes
// //     AItranscript: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Transcript",
// //     },
// //     notes: { type: [String] },
// //   },
// //   { timestamps: true }
// // );

// // appointmentSchema.plugin(autopopulate);

// // const Appointment = model<IAppointment>("Appointment", appointmentSchema);

// // export default Appointment;


// // import { model, Schema, Document, Types } from "mongoose";
// // import autopopulate from "mongoose-autopopulate";

// // export interface IAppointment extends Document {
// //   patient: Types.ObjectId;
// //   doctor: Types.ObjectId;
// //   type: string;
// //   status?: string;
// //   price?: number;
// //   date: Date;
// //   time: number;
// //   duration: number;
// //   AItranscript?: Types.ObjectId;
// //   notes?: string[];
// // }

// // const appointmentSchema = new Schema<IAppointment>(
// //   {
// //     patient: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Patient",
// //       required: false,
// //       autopopulate: { select: "name" },
// //     },
// //     doctor: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Doctor",
// //       required: false,
// //       autopopulate: { select: "speciality" },
// //     },
// //     type: { type: String, required: true }, // online, offline, emergency
// //     status: { type: String }, // upcoming, pending, done, cancelled
// //     price: { type: Number },
// //     date: { type: Date, required: true },
// //     time: { type: Number, required: true }, // could be hour or timestamp
// //     duration: { type: Number, required: true }, // in minutes: 15, 30, 60
// //     AItranscript: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Transcript",
// //     }, // optional, future feature
// //     notes: { type: [String] },
// //   },
// //   { timestamps: true }
// // );

// // appointmentSchema.plugin(autopopulate);

// // const Appointment = model<IAppointment>("Appointment", appointmentSchema);

// // export default Appointment;

// import { model, Schema, Document, Types } from "mongoose";
// import autopopulate from "mongoose-autopopulate";

// export interface IAppointment extends Document {
//   patient: Types.ObjectId;
//   doctor: Types.ObjectId;
//   type: string;
//   status?: string;
//   price?: number;
//   date: Date;
//   time: number;
//   duration: number;
//   AItranscript?: Types.ObjectId;
//   notes?: string[];
//   meetLink?: string;
//   calendarEventId?: string;
// }

// const appointmentSchema = new Schema<IAppointment>(
//   {
//     patient: {
//       type: Schema.Types.ObjectId,
//       ref: "Patient",
//       required: true,
//       autopopulate: {
//         select: "name email phoneNum", // ✅ include patient info
//       },
//     },
//     doctor: {
//       type: Schema.Types.ObjectId,
//       ref: "Doctor",
//       required: true,
//       autopopulate: {
//         select: "name speciality licenseNum", // ✅ include doctor info
//       },
//     },
//     type: { type: String, required: true }, // online, offline, emergency
//     status: { type: String, default: "pending" }, // upcoming, pending, done, cancelled
//     price: { type: Number },
//     date: { type: Date, required: true },
//     time: { type: Number, required: true }, // hour of day
//     duration: { type: Number, required: true }, // in minutes
//     AItranscript: {
//       type: Schema.Types.ObjectId,
//       ref: "Transcript",
//     }, // optional
//     notes: { type: [String] },
//     meetLink: { type: String },
//     calendarEventId: { type: String },
//   },
//   { timestamps: true }
// );

// appointmentSchema.plugin(autopopulate);

// const Appointment = model<IAppointment>("Appointment", appointmentSchema);

// export default Appointment;


import { model, Schema, Document, Types } from "mongoose";
import autopopulate from "mongoose-autopopulate";

export interface IAppointment extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  type: string;           // e.g., online, offline, emergency
  status?: string;        // pending, upcoming, done, cancelled
  price?: number;
  date: Date;             // appointment date (YYYY-MM-DD)
  time: number;           // appointment start hour (0–23)
  duration: number;       // appointment duration (in minutes, e.g., 15, 30)
  AItranscript?: Types.ObjectId;
  notes?: string[];
  meetLink?: string;
  calendarEventId?: string;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      autopopulate: {
        select: `
          name 
          email 
          phoneNum 
          gender 
          birthDay
        `,
      },
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      autopopulate: {
        select: `
          name 
          speciality 
          licenseNum
        `,
      },
    },
    type: {
      type: String,
      required: true,
      enum: ["online", "offline", "emergency"],
    },
    status: {
      type: String,
      enum: ["pending", "upcoming", "done", "cancelled", "confirmed", "completed"],
      default: "pending",
    },
    price: {
      type: Number,
      min: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Number,
      required: true,
      min: 0,
      max: 23,
    },
    duration: {
      type: Number,
      required: true,
      enum: [15, 30, 45, 60], // optional: only allow standard slots
      default: 30,
    },
    AItranscript: {
      type: Schema.Types.ObjectId,
      ref: "Transcript",
    },
    notes: {
      type: [String],
      default: [],
    },
    meetLink: {
      type: String,
    },
    calendarEventId: {
      type: String,
    },
  },
  { timestamps: true }
);

appointmentSchema.plugin(autopopulate);

const Appointment = model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;
