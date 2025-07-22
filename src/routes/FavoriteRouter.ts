import express from "express";
import {
  addFavorite,
  removeFavorite,
} from "../controllers/PatientFavoritesController";
import { authenticate } from "../middlewares/auth"; 

const router = express.Router();

router.post("/patient/favorites", authenticate, addFavorite);
router.delete("/patient/favorites/:providerId", authenticate, removeFavorite);

export default router;
