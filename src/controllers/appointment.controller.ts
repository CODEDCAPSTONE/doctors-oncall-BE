// import { Request, NextFunction, Response } from "express";
// import Appointment from "../models/Appointment";
// import Doctor from "../models/Doctor";
// import Patient from "../models/Patients";

// // Helper: calculate age from birthDay
// const calculateAge = (birthDay: Date | undefined) => {
//   if (!birthDay) return null;
//   const today = new Date();
//   const birth = new Date(birthDay);
//   let age = today.getFullYear() - birth.getFullYear();
//   const m = today.getMonth() - birth.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
//     age--;
//   }
//   return age;
// };

// // Get all appointments
// const getAllAppointments = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const appointments = await Appointment.find()
//       .populate("patient", "name gender birthDay")
//       .populate("doctor", "name speciality");

//     const enriched = appointments.map((app) => {
//       const appObj = app.toObject();
//       const patient = appObj.patient as any;
//       if (patient) {
//         patient.age = calculateAge(patient.birthDay);
//         delete patient.birthDay;
//       }
//       return appObj;
//     });

//     res.status(200).json(enriched);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get appointments by patient ID
// const getAppointmentsByPatientId = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const patientID = (req as any).user.id;

//     const appointments = await Appointment.find({ patient: patientID })
//       .populate("doctor", "name speciality")
//       .populate("patient", "name gender birthDay");

//     const enriched = appointments.map((app) => {
//       const appObj = app.toObject();
//       const patient = appObj.patient as any;
//       if (patient) {
//         patient.age = calculateAge(patient.birthDay);
//         delete patient.birthDay;
//       }
//       return appObj;
//     });

//     res.status(200).json(enriched);
//   } catch (error) {
//     next(error);
//   }
// };

// // ✅ Get appointments by doctor ID (fixed)
// const getAppointmentsByDoctorId = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const providerId = (req as any).user.id;

//     const doctorDoc = await Doctor.findOne({ provider: providerId });
//     if (!doctorDoc) {
//       return res.status(404).json({ message: "Doctor profile not found" });
//     }

//     const appointments = await Appointment.find({ doctor: doctorDoc._id })
//       .populate("patient", "name gender birthDay")
//       .populate("doctor", "name speciality");

//     const enriched = appointments.map((app) => {
//       const appObj = app.toObject();
//       const patient = appObj.patient as any;
//       if (patient) {
//         patient.age = calculateAge(patient.birthDay);
//         delete patient.birthDay;
//       }
//       return appObj;
//     });

//     res.status(200).json(enriched);
//   } catch (error) {
//     next(error);
//   }
// };

// // (Remaining functions unchanged)

// const makeAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { type, date, time, duration } = req.body;
//     const { doctorID } = req.params;
//     const patientID = (req as any).user.id;

//     const newAppointment = await Appointment.create({
//       type,
//       date,
//       status: "Pending",
//       time,
//       duration,
//       patient: patientID,
//       doctor: doctorID,
//     });

//     await Patient.findByIdAndUpdate(patientID, {
//       $push: { appointments: newAppointment._id },
//     });
//     await Doctor.findByIdAndUpdate(doctorID, {
//       $push: { appointments: newAppointment._id },
//     });

//     res.status(201).json(newAppointment);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateDateAppointment = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { date } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(appointmentId, { date }, { new: true });
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateTimeAppointment = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { time } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(appointmentId, { time }, { new: true });
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateStatusAppointment = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { status } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateTypeAppointment = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { type } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(appointmentId, { type }, { new: true });
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const updatePriceAppointment = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { price } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(appointmentId, { price }, { new: true });
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateDurationAppointment = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { duration } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(appointmentId, { duration }, { new: true });
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { appointmentId } = req.params;
//     await Appointment.findByIdAndDelete(appointmentId);
//     res.status(200).json({ message: "Appointment deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// export {
//   getAllAppointments,
//   getAppointmentsByPatientId,
//   getAppointmentsByDoctorId,
//   makeAppointment,
//   updateDateAppointment,
//   updateTimeAppointment,
//   updateStatusAppointment,
//   updateTypeAppointment,
//   updatePriceAppointment,
//   updateDurationAppointment,
//   deleteAppointment,
// };


// import { Request, NextFunction, Response, Express } from "express";
// import Appointment from "../models/Appointment";
// import Doctor from "../models/Doctor";
// import Pateint from "../models/Patients";

// // CRUD for appointments
// // 1st. Read >> GET
// // get all appointments for both patients and doctors
// const getAllAppointments = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const appointments = await Appointment.find();
//     res.status(200).json(appointments);
//   } catch (error) {
//     next(error);
//   }
// };

// // get appointments by patient ID
// const getAppointmentsByPatientId = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // first get patient ID from req.user, why? because the patient is logged in
//     // const { patientId } = req.params;
//     const { pateintID } = (req as any).user.id; // assuming user is the logged in patient
//     // then findOne by patientID
//     const patientAppointments = await Appointment.find(pateintID).populate(
//       "doctor"
//     );
//     res.status(200).json(patientAppointments);
//   } catch (error) {
//     next(error);
//   }
// };

// // get appointments by doctor ID
// const getAppointmentsByDoctorId = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // first get doctor ID from req.user, why? because the patient is logged in
//     // const { doctortId } = req.params;
//     const { doctortId } = (req as any).user.id; // assuming user is the logged in doctor
//     // then find by doctortId
//     const doctorAppointments = await Appointment.find(doctortId).populate(
//       "patient"
//     );
//     res.status(200).json(doctorAppointments);
//   } catch (error) {
//     next(error);
//   }
// };

// // 2nd. Create >> POST
// // create a new appointment
// const makeAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // get appointment data from request body
//     const { type, date, time, duration } = req.body;
//     // type: online, offline, emergency
//     // status: upcoming, pending, done, cancelled
//     const { doctorID } = req.params; // user is the logged in health care provider
//     const { pateintID } = (req as any).user.id; // assuming user is the logged in patient
//     // create a new appointment
//     const newAppointment = await Appointment.create({
//       type,
//       date,
//       status: "Pending", // default status, it will show under pending appointments for the doctor they will accept or reject in FE
//       time,
//       duration,
//       // pateint: pateintID,
//       // doctor: doctorID,
//     });
//     const pateint = await Pateint.findByIdAndUpdate(pateintID, {
//       $push: { appointment: newAppointment._id },
//     });
//     const doctor = await Doctor.findByIdAndUpdate(doctorID, {
//       $push: { appointment: newAppointment._id },
//     });
//     const updatedApp = await Appointment.findByIdAndUpdate(newAppointment._id, {
//       $set: {
//         pateint: pateintID,
//         doctor: doctorID,
//       },
//     });
//     res.status(201).json(updatedApp);
//   } catch (error) {
//     next(error);
//   }
// };

// // 3rd. Update >> PUT
// // update an appointment date
// const updateDateAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { date } = req.body;
//     const { appointmentId } = req.params; // user is the logged in
//     // const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { date: date }
//     );
//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     next(error);
//   }
// };
// // update an appointment time
// const updateTimeAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { time } = req.body;
//     const { appointmentId } = req.params; // user is the logged in
//     // const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { time: time }
//     );
//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     next(error);
//   }
// };
// // update an appointment status
// const updateStatusAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { status } = req.body;
//     const { appointmentId } = req.params; // user is the logged in
//     // const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { status: status }
//     );
//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     next(error);
//   }
// };
// // update an appointment type: // online, offline
// const updateTypeAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { type } = req.body;
//     const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { type: type }
//     );
//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     next(error);
//   }
// };
// // update an appointment price, based on the type of appointment: online: 25KD, Offline 35KD or whatever we decide
// const updatePriceAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { price } = req.body;
//     const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { price: price }
//     );
//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     next(error);
//   }
// };
// const updateDurationAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { duratoin } = req.body;
//     const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { duratoin: duratoin }
//     );
//     res.status(200).json(updatedAppointment);
//   } catch (error) {
//     next(error);
//   }
// };
// // 4th. Delete >> DELETE
// // delete an appointment
// const deleteAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { appointmentId } = (req as any).user.appointments._id; // assuming user is the logged in patient
//     const deletedAppointment = await Appointment.findByIdAndDelete(
//       appointmentId
//     );
//     res.status(200).json({
//       message: "Appointment deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export {
//   getAllAppointments,
//   getAppointmentsByPatientId,
//   getAppointmentsByDoctorId,
//   makeAppointment,
//   updateDateAppointment,
//   updateTimeAppointment,
//   updateStatusAppointment,
//   updateTypeAppointment,
//   updatePriceAppointment,
//   updateDurationAppointment,
//   deleteAppointment,
// };

// import { Request, Response, NextFunction } from "express";
// import Appointment from "../models/Appointment";
// import Doctor from "../models/Doctor";
// import Patient from "../models/Patients";
// import { calendar } from "../config/googleAuth";

// // 🔷 Helper: calculate age
// const calculateAge = (birthDay?: Date) => {
//   if (!birthDay) return null;
//   const today = new Date();
//   const birth = new Date(birthDay);
//   let age = today.getFullYear() - birth.getFullYear();
//   const m = today.getMonth() - birth.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
//   return age;
// };

// // ✅ Get all appointments
// const getAllAppointments = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const appointments = await Appointment.find()
//       .populate("patient", "name gender birthDay")
//       .populate("doctor", "name speciality");

//     appointments.forEach(app => {
//       if (app.patient && "birthDay" in app.patient) {
//         (app.patient as any).age = calculateAge((app.patient as any).birthDay);
//         delete (app.patient as any).birthDay;
//       }
//     });

//     res.status(200).json(appointments);
//   } catch (error) {
//     next(error);
//   }
// };

// // ✅ Get appointments by logged-in patient
// const getAppointmentsByPatientId = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const patientID = (req as any).user.id;

//     const appointments = await Appointment.find({ patient: patientID })
//       .populate("doctor", "name speciality")
//       .populate("patient", "name gender birthDay");

//     appointments.forEach(app => {
//       if (app.patient && "birthDay" in app.patient) {
//         (app.patient as any).age = calculateAge((app.patient as any).birthDay);
//         delete (app.patient as any).birthDay;
//       }
//     });

//     res.status(200).json(appointments);
//   } catch (error) {
//     next(error);
//   }
// };

// // ✅ Get appointments by logged-in doctor
// const getAppointmentsByDoctorId = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const doctorID = (req as any).user.id;

//     const appointments = await Appointment.find({ doctor: doctorID })
//       .populate("patient", "name gender birthDay")
//       .populate("doctor", "name speciality");

//     appointments.forEach(app => {
//       if (app.patient && "birthDay" in app.patient) {
//         (app.patient as any).age = calculateAge((app.patient as any).birthDay);
//         delete (app.patient as any).birthDay;
//       }
//     });

//     res.status(200).json(appointments);
//   } catch (error) {
//     next(error);
//   }
// };
// // Make a new appointment & generate Google Mee
// const makeAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { type, date, time, duration } = req.body;
//     const { doctorID } = req.params;
//     const patientID = (req as any).user.id;

//     // 🔷 Validate doctorID and patientID
//     const doctor = await Doctor.findById(doctorID);
//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }

//     const patient = await Patient.findById(patientID);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const appointmentData: any = {
//       type,
//       date,
//       status: "Pending",
//       time,
//       duration,
//       patient: patientID,
//       doctor: doctorID,
//     };

//     if (type === "online") {
//       const hourString = time.toString().padStart(2, "0");
//       const startDateTimeString = `${date}T${hourString}:00:00`;
//       const startDateTime = new Date(startDateTimeString);
//       if (isNaN(startDateTime.getTime())) {
//         throw new Error("Invalid date or time format");
//       }

//       const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

//       const scheduledDateTimeISO = startDateTime.toISOString();

//       const event = await calendar.events.insert({
//         calendarId: "primary",
//         requestBody: {
//           summary: "Doctor Appointment",
//           attendees: [
//             { email: "f.n.zamanan@gmail.com" },
//             { email: "janaalhamad21@gmail.com" },
//             { email: "oncallapptesting@gmail.com" },
//           ],
//           start: {
//             dateTime: scheduledDateTimeISO,
//             timeZone: "Asia/Kuwait",
//           },
//           end: {
//             dateTime: endDateTime.toISOString(),
//             timeZone: "Asia/Kuwait",
//           },
//           conferenceData: {
//             createRequest: {
//               requestId: `meet-${Date.now()}`,
//               conferenceSolutionKey: { type: "hangoutsMeet" },
//             },
//           },
//         },
//         conferenceDataVersion: 1,
//       });

//       appointmentData.meetLink =
//         event.data.conferenceData?.entryPoints?.[0]?.uri || "";
//       appointmentData.calendarEventId = event.data.id;
//     }

//     const newAppointment = await Appointment.create(appointmentData);

//     // 🔷 Use $addToSet to avoid duplicates
//     await Patient.findByIdAndUpdate(patientID, {
//       $addToSet: { appointments: newAppointment._id },
//     });
//     await Doctor.findByIdAndUpdate(doctorID, {
//       $addToSet: { appointments: newAppointment._id },
//     });

//     res.status(201).json(newAppointment);
//   } catch (error) {
//     console.log("make appointment error:", error);
//     next(error);
//   }
// };


// // Update appointment fields
// const updateDateAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { date } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { date },
//       { new: true }
//     );
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateTimeAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { time } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { time },
//       { new: true }
//     );
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateStatusAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { status } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { status },
//       { new: true }
//     );
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateTypeAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { type } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { type },
//       { new: true }
//     );
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const updatePriceAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { price } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { price },
//       { new: true }
//     );
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateDurationAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { duration } = req.body;
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { duration },
//       { new: true }
//     );
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteAppointment = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { appointmentId } = req.params;
//     await Appointment.findByIdAndDelete(appointmentId);
//     res.status(200).json({ message: "Appointment deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// export {
//   getAllAppointments,
//   getAppointmentsByPatientId,
//   getAppointmentsByDoctorId,
//   makeAppointment,
//   updateDateAppointment,
//   updateTimeAppointment,
//   updateStatusAppointment,
//   updateTypeAppointment,
//   updatePriceAppointment,
//   updateDurationAppointment,
//   deleteAppointment,
// };

// import { Request, NextFunction, Response } from "express";
// import Appointment from "../models/Appointment";
// import Doctor from "../models/Doctor";
// import Patient from "../models/Patients";
// import { calendar } from "../config/googleAuth";

// // Helper: calculate age
// const calculateAge = (birthDay?: Date) => {
//   if (!birthDay) return null;
//   const today = new Date();
//   const birth = new Date(birthDay);
//   let age = today.getFullYear() - birth.getFullYear();
//   const m = today.getMonth() - birth.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
//     age--;
//   }
//   return age;
// };

// // Common: enrich appointments with patient age
// const enrichAppointments = (appointments: any[]) =>
//   appointments.map(app => {
//     const appObj = app.toObject();
//     const patient = appObj.patient as any;
//     if (patient) {
//       patient.age = calculateAge(patient.birthDay);
//       delete patient.birthDay;
//     }
//     return appObj;
//   });

// // Get all appointments
// const getAllAppointments = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const appointments = await Appointment.find()
//       .populate("patient", "name gender birthDay")
//       .populate("doctor", "name speciality");
//     res.status(200).json(enrichAppointments(appointments));
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

// // Get appointments by logged-in patient
// const getAppointmentsByPatientId = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const patientID = (req as any).user.id;
//     const appointments = await Appointment.find({ patient: patientID })
//       .populate("doctor", "name speciality")
//       .populate("patient", "name gender birthDay");
//     res.status(200).json(enrichAppointments(appointments));
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

// // Get appointments by logged-in doctor
// const getAppointmentsByDoctorId = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const doctorID = (req as any).user.id;
//     const appointments = await Appointment.find({ doctor: doctorID })
//       .populate("patient", "name gender birthDay")
//       .populate("doctor", "name speciality");
//     res.status(200).json(enrichAppointments(appointments));
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

// // Create new appointment & generate Meet link if online
// const makeAppointment = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { type, date, time, duration } = req.body;
//     const { doctorID } = req.params;
//     const patientID = (req as any).user.id;

//     const appointmentData: any = {
//       type,
//       date,
//       time,
//       duration,
//       status: "Pending",
//       patient: patientID,
//       doctor: doctorID,
//     };

//     if (type === "online") {
//       const hourString = time.toString().padStart(2, "0");
//       const startDateTime = new Date(`${date}T${hourString}:00:00`);
//       if (isNaN(startDateTime.getTime())) throw new Error("Invalid date or time format");

//       const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

//       const event = await calendar.events.insert({
//         calendarId: "primary",
//         requestBody: {
//           summary: "Doctor Appointment",
//           attendees: [
//             { email: "f.n.zamanan@gmail.com" },
//             { email: "janaalhamad21@gmail.com" },
//             { email: "oncallapptesting@gmail.com" },
//           ],
//           start: { dateTime: startDateTime.toISOString(), timeZone: "Asia/Kuwait" },
//           end: { dateTime: endDateTime.toISOString(), timeZone: "Asia/Kuwait" },
//           conferenceData: {
//             createRequest: {
//               requestId: `meet-${Date.now()}`,
//               conferenceSolutionKey: { type: "hangoutsMeet" },
//             },
//           },
//         },
//         conferenceDataVersion: 1,
//       });

//       appointmentData.meetLink = event.data.conferenceData?.entryPoints?.[0]?.uri || "";
//       appointmentData.calendarEventId = event.data.id;
//     }

//     const newAppointment = await Appointment.create(appointmentData);

//     await Patient.findByIdAndUpdate(patientID, { $push: { appointments: newAppointment._id } });
//     await Doctor.findByIdAndUpdate(doctorID, { $push: { appointments: newAppointment._id } });

//     res.status(201).json(newAppointment);
//   } catch (err) {
//     console.error("makeAppointment error:", err);
//     next(err);
//   }
// };

// // Update helpers
// const updateField = async (field: string, req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { appointmentId } = req.params;
//     const updated = await Appointment.findByIdAndUpdate(
//       appointmentId,
//       { [field]: req.body[field] },
//       { new: true }
//     );
//     res.status(200).json(updated);
//   } catch (err) {
//     next(err);
//   }
// };

// const updateDateAppointment = (req: Request, res: Response, next: NextFunction) =>
//   updateField("date", req, res, next);

// const updateTimeAppointment = (req: Request, res: Response, next: NextFunction) =>
//   updateField("time", req, res, next);

// const updateStatusAppointment = (req: Request, res: Response, next: NextFunction) =>
//   updateField("status", req, res, next);

// const updateTypeAppointment = (req: Request, res: Response, next: NextFunction) =>
//   updateField("type", req, res, next);

// const updatePriceAppointment = (req: Request, res: Response, next: NextFunction) =>
//   updateField("price", req, res, next);

// const updateDurationAppointment = (req: Request, res: Response, next: NextFunction) =>
//   updateField("duration", req, res, next);

// const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { appointmentId } = req.params;
//     await Appointment.findByIdAndDelete(appointmentId);
//     res.status(200).json({ message: "Appointment deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// };

// export {
//   getAllAppointments,
//   getAppointmentsByPatientId,
//   getAppointmentsByDoctorId,
//   makeAppointment,
//   updateDateAppointment,
//   updateTimeAppointment,
//   updateStatusAppointment,
//   updateTypeAppointment,
//   updatePriceAppointment,
//   updateDurationAppointment,
//   deleteAppointment,
// };

import { Request, Response, NextFunction } from "express";
import Appointment from "../models/Appointment";
import Doctor from "../models/Doctor";
import Patient from "../models/Patients";
import { calendar } from "../config/googleAuth";

// 🔷 Helper: calculate age
const calculateAge = (birthDay?: Date) => {
  if (!birthDay) return null;
  const today = new Date();
  const birth = new Date(birthDay);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

// ✅ Get all appointments
const getAllAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name gender birthDay")
      .populate("doctor", "name speciality");

    appointments.forEach(app => {
      if (app.patient && "birthDay" in app.patient) {
        (app.patient as any).age = calculateAge((app.patient as any).birthDay);
        delete (app.patient as any).birthDay;
      }
    });

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// ✅ Get appointments by logged-in patient
const getAppointmentsByPatientId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patientID = (req as any).user.id;

    const appointments = await Appointment.find({ patient: patientID })
      .populate("doctor", "name speciality")
      .populate("patient", "name gender birthDay");

    appointments.forEach(app => {
      if (app.patient && "birthDay" in app.patient) {
        (app.patient as any).age = calculateAge((app.patient as any).birthDay);
        delete (app.patient as any).birthDay;
      }
    });

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// ✅ Get appointments by logged-in doctor
const getAppointmentsByDoctorId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctorID = (req as any).user.id;

    const appointments = await Appointment.find({ doctor: doctorID })
      .populate("patient", "name gender birthDay")
      .populate("doctor", "name speciality");

    appointments.forEach(app => {
      if (app.patient && "birthDay" in app.patient) {
        (app.patient as any).age = calculateAge((app.patient as any).birthDay);
        delete (app.patient as any).birthDay;
      }
    });

    // 🔷 Force fresh data (disable cache)
    res.setHeader("Cache-Control", "no-store");

    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// ✅ Make a new appointment & generate Google Meet
const makeAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, date, time, duration } = req.body;
    const { doctorID } = req.params;
    const patientID = (req as any).user.id;

    const doctor = await Doctor.findById(doctorID);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointmentData: any = {
      type,
      date,
      status: "Pending",
      time,
      duration,
      patient: patientID,
      doctor: doctorID,
    };

    if (type === "online") {
      const hourString = time.toString().padStart(2, "0");
      const startDateTimeString = `${date}T${hourString}:00:00`;
      const startDateTime = new Date(startDateTimeString);
      if (isNaN(startDateTime.getTime())) {
        throw new Error("Invalid date or time format");
      }

      const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

      const scheduledDateTimeISO = startDateTime.toISOString();

      const event = await calendar.events.insert({
        calendarId: "primary",
        requestBody: {
          summary: "Doctor Appointment",
          attendees: [
            { email: "f.n.zamanan@gmail.com" },
            { email: "janaalhamad21@gmail.com" },
            { email: "oncallapptesting@gmail.com" },
          ],
          start: {
            dateTime: scheduledDateTimeISO,
            timeZone: "Asia/Kuwait",
          },
          end: {
            dateTime: endDateTime.toISOString(),
            timeZone: "Asia/Kuwait",
          },
          conferenceData: {
            createRequest: {
              requestId: `meet-${Date.now()}`,
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
        },
        conferenceDataVersion: 1,
      });

      appointmentData.meetLink =
        event.data.conferenceData?.entryPoints?.[0]?.uri || "";
      appointmentData.calendarEventId = event.data.id;
    }

    const newAppointment = await Appointment.create(appointmentData);

    await Patient.findByIdAndUpdate(patientID, {
      $addToSet: { appointments: newAppointment._id },
    });
    await Doctor.findByIdAndUpdate(doctorID, {
      $addToSet: { appointments: newAppointment._id },
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.log("make appointment error:", error);
    next(error);
  }
};

// 🔷 Update appointment fields
const updateDateAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.body;
    const { appointmentId } = req.params;
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { date },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const updateTimeAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { time } = req.body;
    const { appointmentId } = req.params;
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { time },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const updateStatusAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const { appointmentId } = req.params;
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const updateTypeAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.body;
    const { appointmentId } = req.params;
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { type },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const updatePriceAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { price } = req.body;
    const { appointmentId } = req.params;
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { price },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const updateDurationAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { duration } = req.body;
    const { appointmentId } = req.params;
    const updated = await Appointment.findByIdAndUpdate(
      appointmentId,
      { duration },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { appointmentId } = req.params;
    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  getAllAppointments,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  makeAppointment,
  updateDateAppointment,
  updateTimeAppointment,
  updateStatusAppointment,
  updateTypeAppointment,
  updatePriceAppointment,
  updateDurationAppointment,
  deleteAppointment,
};
