import express from "express";
import {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription
} from "../controllers/prescriptionController";
import { authenticate } from "../middlewares/auth";
import upload from "../middlewares/upload";

const router = express.Router();

router.post("/", authenticate, upload.single("image"), createPrescription);
router.get("/", authenticate, getAllPrescriptions);
router.get("/:id", authenticate, getPrescriptionById);
router.put("/:id", authenticate, upload.single("image"), updatePrescription);
router.delete("/:id", authenticate, deletePrescription);

export default router;
