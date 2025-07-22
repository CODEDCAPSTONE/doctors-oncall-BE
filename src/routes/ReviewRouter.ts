import express from "express";
import { postReview } from "../controllers/ReviewController";
import { authenticate } from "../middlewares/auth"; // ✅ corrected import name

const router = express.Router();

// POST review (requires authentication)
router.post("/reviews", authenticate, postReview);

export default router;
