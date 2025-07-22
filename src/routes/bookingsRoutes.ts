import express from "express";
import { authorize } from "../middlewares/auth";
import {
  getAllBookings,
  getBookingsByPatientId,
  getBookingsByHealthCareProviderId,
  createBooking,
  updateBookingDate,
  updateBookingTime,
  updateBookingStatus,
  deleteBooking
} from "../controllers/bookings.controller";

const router = express.Router();

// ✅ Get all bookings
router.get("/", getAllBookings);

// ✅ Get bookings for logged-in patient
router.get("/patient", authorize, getBookingsByPatientId);

// ✅ Get bookings for logged-in healthcare provider
router.get("/provider", authorize, getBookingsByHealthCareProviderId);

// ✅ Create a booking — single endpoint, provider type in body
router.post("/:serviceProviderId", authorize, createBooking);

// ✅ Update booking fields
router.put("/:bookingId/date", authorize, updateBookingDate);
router.put("/:bookingId/time", authorize, updateBookingTime);
router.put("/:bookingId/status", authorize, updateBookingStatus);

// ✅ Delete booking
router.delete("/:bookingId", authorize, deleteBooking);

export default router;
