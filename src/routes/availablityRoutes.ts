import express from "express";
import { authenticate, authorizeRole } from "../middlewares/auth";

import {
  getAllAvailableSchedules,
  createAvailableSchedule,
  updateAvailableSchedule,
  updateAvailableTime,
  updateAvailableDate,
  updateAvailableSlotsNum,
  deleteAvailableSchedule,
} from "../controllers/availableSchedule.controller";

const router = express.Router();

// ✅ GET all schedules
router.get("/", getAllAvailableSchedules);

// ✅ POST create schedule
router.post(
  "/createAvailableSchedule",
  authenticate,
  authorizeRole(["healthCareProvider"]),
  createAvailableSchedule
);

// ✅ PUT update full schedule
router.put(
  "/updateAvailableSchedule/:scheduleID",
  authenticate,
  authorizeRole(["healthCareProvider"]),
  updateAvailableSchedule
);

// ✅ PUT update schedule time
router.put(
  "/updateAvailableTime/:scheduleID",
  authenticate,
  authorizeRole(["healthCareProvider"]),
  updateAvailableTime
);

// ✅ PUT update schedule date
router.put(
  "/updateAvailableDate/:scheduleID",
  authenticate,
  authorizeRole(["healthCareProvider"]),
  updateAvailableDate
);

// ✅ PUT update slots number
router.put(
  "/updateAvailableSlotsNum/:scheduleID",
  authenticate,
  authorizeRole(["healthCareProvider"]),
  updateAvailableSlotsNum
);

// ✅ DELETE schedule
router.delete(
  "/deleteAvailableSchedule/:scheduleID",
  authenticate,
  authorizeRole(["healthCareProvider"]),
  deleteAvailableSchedule
);

export default router;
