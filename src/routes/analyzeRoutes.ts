import express from "express";
import multer from "multer";
import { analyzePdf } from "../controllers/analyzeReport.controller";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("pdf"), analyzePdf);

export default router;
