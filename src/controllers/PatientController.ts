import { Request, Response } from "express";
import Patient from "../models/Patients";

/**
 * ✅ Get logged-in patient profile
 */
export const getPatientProfile = async (req: Request, res: Response) => {
  const patientId = (req as any).user.id;

  try {
    const patient = await Patient.findById(patientId)
      .populate("dependents")
      .lean();

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ patient });
  } catch (err) {
    console.error("[getPatientProfile]", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ✅ Get a patient by ID (for doctor/admin)
 */
export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id)
      .populate("dependents")
      .lean();

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ patient });
  } catch (err) {
    console.error("[getPatientById]", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ✅ Get patient full history (appointments, reports, dependents)
 */
export const getPatientHistory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id)
      .populate({
        path: "appointments",
        populate: { path: "doctor", select: "name specialization" },
      })
      .populate("dependents")
      .lean();

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      patient,
      historyReports: patient.historyReports || [],
      initialCheckup: patient.initialCheckup || [],
    });
  } catch (err) {
    console.error("[getPatientHistory]", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ✅ Update patient profile
 */
export const updatePatientProfile = async (req: Request, res: Response) => {
  const patientId = req.body.patientId || req.params.id;
  const updates = req.body;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, updates, {
      new: true,
    }).lean();

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ patient: updatedPatient });
  } catch (err) {
    console.error("[updatePatientProfile]", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ✅ Upload profile image
 */
export const uploadProfileImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.profileImage = req.file.path;
    await patient.save();

    res.status(200).json({ message: "Profile image uploaded", patient });
  } catch (err) {
    console.error("[uploadProfileImage]", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ✅ Upload PDF document
 */
export const uploadPDFDoc = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: "No document uploaded" });
  }

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.documentPath = req.file.path;
    await patient.save();

    res.status(200).json({ message: "Document uploaded", patient });
  } catch (err) {
    console.error("[uploadPDFDoc]", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ✅ Delete patient
 */
export const deletePatient = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (patient.dependents && patient.dependents.length > 0) {
      return res.status(400).json({
        message: "Cannot delete patient with active dependents",
      });
    }

    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.error("[deletePatient]", err);
    res.status(500).json({ message: "Server error" });
  }
};
