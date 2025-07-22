import express from "express";
import {
  getPatientProfile,
  getPatientById,
  updatePatientProfile,
  deletePatient,
  uploadProfileImage,
  uploadPDFDoc,
} from "../controllers/PatientController";

import {
  addDependent,
  getDependents,
  updateDependent,
  deleteDependent,
} from "../controllers/DependentController";

import { uploadImage, uploadPDF } from "../middlewares/upload";
import { authorize } from "../middlewares/auth";

const router = express.Router();

// 👤 Patient: Self-management
router.get("/me", authorize, getPatientProfile);
router.put("/me", authorize, updatePatientProfile);

// 📄 (Optional) Patient: Get by ID (admin/doctor use)
router.get("/:id", authorize, getPatientById);

router.delete("/:id", authorize, deletePatient);

// 🖼️ Uploads
router.post(
  "/:id/upload-profile",
  authorize,
  uploadImage.single("profileImage"),
  uploadProfileImage
);

router.post(
  "/:id/upload-document",
  authorize,
  uploadPDF.single("document"),
  uploadPDFDoc
);

// 👨‍👩‍👧 Dependents
router.post("/dependents", authorize, addDependent);
router.get("/dependents", authorize, getDependents);
router.put("/dependents/:id", authorize, updateDependent);
router.delete("/dependents/:id", authorize, deleteDependent);

export default router;
