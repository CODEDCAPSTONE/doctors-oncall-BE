import express from "express";
import { uploadImage } from "../middlewares/upload";
import { validateRequest } from "../middlewares/validateRequest";
import { authenticate } from "../middlewares/auth";
import {
  registerProviderDoctor,
  registerProviderNurse,
  registerProviderLab,
  registerProviderPhysiotherapist,
  loginProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
} from "../controllers/providerAuthController";
import {
  doctorRegistrationSchema,
  nurseRegistrationSchema,
  labRegistrationSchema,
  physiotherapistRegistrationSchema,
} from "../validations/providerValidations";

const router = express.Router();

router.post("/auth/register/doctor", uploadImage.single("profileImage"), validateRequest(doctorRegistrationSchema), registerProviderDoctor);
router.post("/auth/register/nurse", uploadImage.single("profileImage"), validateRequest(nurseRegistrationSchema), registerProviderNurse);
router.post("/auth/register/lab", uploadImage.single("profileImage"), validateRequest(labRegistrationSchema), registerProviderLab);
router.post("/auth/register/physiotherapist", uploadImage.single("profileImage"), validateRequest(physiotherapistRegistrationSchema), registerProviderPhysiotherapist);
router.post("/auth/login", loginProvider);
router.get("/",getAllProviders);
router.get("/:id",getProviderById);
router.put("/:id", authenticate, uploadImage.single("profileImage"), updateProvider);
router.delete("/:id", authenticate, deleteProvider);

export default router;
