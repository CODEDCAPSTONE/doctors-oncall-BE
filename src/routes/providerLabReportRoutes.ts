import express from "express";
import {
  uploadReport,
  getReports,
  getReportById,
  deleteReport,
  updateReportStatus,
  updateReportAnalysis
} from "../controllers/medicalReportController";
import { uploadPDF } from "../middlewares/upload";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/lab/reports",
  authenticate,
  uploadPDF.single("reportFile"),
  uploadReport
);

router.get("/lab/reports", authenticate, getReports);

router.get("/lab/reports/:id", authenticate, getReportById);

router.patch("/lab/reports/:id/status", authenticate, updateReportStatus);

router.patch("/lab/reports/:id/analysis", authenticate, updateReportAnalysis);

router.delete("/lab/reports/:id", authenticate, deleteReport);

export default router;
