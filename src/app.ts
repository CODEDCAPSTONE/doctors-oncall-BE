import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/DataBase";
import patientsRoutes from "./routes/PatientRouter";
import reviewsRoutes from "./routes/ReviewRouter";


// Middlewares
import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";

// API Routes
import appointmentsRoutes from "./routes/appointmentsRoutes";
import bookingsRoutes from "./routes/bookingsRoutes";
import availabilityRoutes from "./routes/availablityRoutes";
// import analyzeRoutes from "./routes/analyzeRoutes";
import providerRoutes from "./routes/providerRoutes";
import medicalReportRoutes from "./routes/medicalReportRoutes";
import prescriptionRoutes from "./routes/prescriptionRoutes";

// 🔷 Load environment variables & connect DB
dotenv.config();
connectDB();

const app = express();

// 🔷 Global Middlewares
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔷 Static Files
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// 🔷 Health Check
app.get("/api/health", (_req, res) => {
  res.status(200).json({ message: "✅ OnCall API is healthy and running" });
});

// 🔷 Mount API Routes
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/availability", availabilityRoutes);
// app.use("/api/analyze", analyzeRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/medicalReport", medicalReportRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/reviews", reviewsRoutes);

// 🔷 Fallback & Errors
app.use(notFound);
app.use(errorHandler);

// 🔷 Start Server
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`🚀 OnCall API running at: http://localhost:${PORT}/api`);
});

export default app;
