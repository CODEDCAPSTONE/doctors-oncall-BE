import { Router } from "express";
import { register, login } from "../controllers/AuthController";
import { authenticate } from "../middlewares/auth";
import { getPatientProfile } from "../controllers/PatientController";

const router = Router();

/**
 * @route   POST /auth/register
 * @desc    Register a new patient
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /auth/login
 * @desc    Login as patient
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   GET /auth/me
 * @desc    Get logged-in patient's profile
 * @access  Private
 */
router.get("/me", authenticate, getPatientProfile);

export default router;
