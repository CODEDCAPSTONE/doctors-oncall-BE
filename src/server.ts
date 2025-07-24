import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("✅ MONGODB_URI:", process.env.MONGODB_URI); // Add this line
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    await mongoose.connect(uri, {
      dbName: process.env.DB_NAME || "oncall",
    });

    console.log("✅ Connected to MongoDB: OnCall Full Stack");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 OnCall API Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error during DB connection or startup:", err);
    process.exit(1);
  });
