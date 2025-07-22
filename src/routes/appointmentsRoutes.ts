// import express from "express";
// import { authenticate, authorizeRole } from "../middlewares/auth";
// import {
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
// } from "../controllers/appointment.controller";

// const router = express.Router();

// /**
//  * 🔷 ADMIN: Get all appointments
//  */
// router.get("/", authenticate,authorizeRole(["admin"]),getAllAppointments);

// /**
//  * 🔷 PATIENT: Get their own appointments
//  */
// router.get("/patient", authenticate, authorizeRole(["patient"]),getAppointmentsByPatientId);

// /**
//  * 🔷 DOCTOR: Get their own appointments
//  */
// router.get("/doctor",authenticate,authorizeRole(["HealthcareProvider"]),getAppointmentsByDoctorId);

// /**
//  * 🔷 PATIENT: Create a new appointment with doctor
//  */
// router.post("/create/:doctorID",authenticate,authorizeRole(["patient"]),makeAppointment);

// /**
//  * 🔷 PATIENT: Update appointment fields (date, time, type)
//  */
// router.put("/:appointmentID/date",authenticate,authorizeRole(["patient"]),updateDateAppointment);

// router.put(
//   "/:appointmentID/time",
//   authenticate,
//   authorizeRole(["patient"]),
//   updateTimeAppointment
// );

// router.put(
//   "/:appointmentID/type",
//   authenticate,
//   authorizeRole(["patient"]),
//   updateTypeAppointment
// );

// /**
//  * 🔷 PATIENT: Delete appointment
//  */
// router.delete(
//   "/:appointmentID",
//   authenticate,
//   authorizeRole(["patient"]),
//   deleteAppointment
// );

// /**
//  * 🔷 DOCTOR: Update appointment fields (status, price, duration)
//  */
// router.put(
//   "/:appointmentID/status",
//   authenticate,
//   authorizeRole(["HealthcareProvider"]),
//   updateStatusAppointment
// );

// router.put(
//   "/:appointmentID/price",
//   authenticate,
//   authorizeRole(["HealthcareProvider"]),
//   updatePriceAppointment
// );

// router.put(
//   "/:appointmentID/duration",
//   authenticate,
//   authorizeRole(["HealthcareProvider"]),
//   updateDurationAppointment
// );


// export default router;


import express from "express";
import { authenticate, authorizeRole } from "../middlewares/auth";
import {
  getAllAppointments, getAppointmentsByPatientId, getAppointmentsByDoctorId,
  makeAppointment, updateDateAppointment, updateTimeAppointment, updateStatusAppointment,
  updateTypeAppointment, updatePriceAppointment, updateDurationAppointment, deleteAppointment
} from "../controllers/appointment.controller";

const router = express.Router();

// 📌 Admin: Get all appointments
router.get("/", authenticate, /* authorizeRole(["admin"]), */ getAllAppointments);

// 📌 Patient: Get own appointments
router.get("/patient", authenticate, /* authorizeRole(["patient"]), */ getAppointmentsByPatientId);

// 📌 Doctor: Get own appointments
router.get("/doctor", authenticate, /* authorizeRole(["doctor"]), */ getAppointmentsByDoctorId);

// 📌 Create appointment
router.post("/create/:doctorID", authenticate, /* authorizeRole(["patient"]), */ makeAppointment);

// 📌 Update fields
router.put("/:appointmentID/time", authenticate, /* authorizeRole(["patient"]), */ updateTimeAppointment);
router.put("/:appointmentID/date", authenticate, /* authorizeRole(["patient"]), */ updateDateAppointment);
router.put("/:appointmentID/status", authenticate, updateStatusAppointment);
router.put("/:appointmentID/type", authenticate, /* authorizeRole(["patient"]), */ updateTypeAppointment);
router.put("/:appointmentID/price", authenticate, /* authorizeRole(["doctor"]), */ updatePriceAppointment);
router.put("/:appointmentID/duration", authenticate, /* authorizeRole(["doctor"]), */ updateDurationAppointment);

// 📌 Delete appointment
router.delete("/:appointmentID", authenticate, /* authorizeRole(["patient"]), */ deleteAppointment);

export default router;
