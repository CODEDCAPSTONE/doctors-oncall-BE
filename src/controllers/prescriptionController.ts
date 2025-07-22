import { Request, Response } from "express";
import Prescription from "../models/Prescription";
import Patient from "../models/Patients";
import Dependent from "../models/Dependent";
/**
 * Create a new prescription
 */
export const createPrescription = async (req: Request, res: Response): Promise<void> => {
  const doctorId = (req as any).user.id || req.body.doctorId;
  const { patientId, dependentIds, appointmentId, nameAndUsage, photoURL, validUntil } = req.body;

  if (!doctorId) {
    res.status(401).json({ message: "Unauthorized: doctorId missing" });
    return;
  }

  if (!nameAndUsage || !Array.isArray(nameAndUsage) || nameAndUsage.length === 0) {
    res.status(422).json({ message: "Medication name and usage are required" });
    return;
  }

  if (!nameAndUsage.every((item: any) => typeof item === "string")) {
    res.status(422).json({ message: "Each medication entry must be a string" });
    return;
  }

  if (!patientId && (!dependentIds || dependentIds.length === 0)) {
    res.status(422).json({ message: "Patient or dependents ID is required" });
    return;
  }

  try {
    let valid = false;

    if (patientId) {
      const patient = await Patient.findById(patientId);
      if (!patient) {
        res.status(404).json({ message: "Patient not found" });
        return;
      }
      valid = true;
    }

    if (dependentIds && dependentIds.length > 0) {
      const dependents = await Dependent.find({ _id: { $in: dependentIds } });
      if (dependents.length !== dependentIds.length) {
        res.status(404).json({ message: "Some dependents not found" });
        return;
      }
      valid = true;
    }

    if (!valid) {
      res.status(403).json({ message: "Doctor is not allowed to prescribe to this patient or dependents" });
      return;
    }

    // Default validUntil: 30 days from now if not provided
    const defaultValidUntil = new Date();
    defaultValidUntil.setDate(defaultValidUntil.getDate() + 30);

    const prescription = await Prescription.create({
      patient: patientId,
      dependencies: dependentIds,
      appointment: appointmentId,
      doctor: doctorId,
      nameAndUsage,
      photoURL,
      validUntil: validUntil || defaultValidUntil,
    });

    res.status(201).json({ message: "Prescription created", prescription });
  } catch (err) {
    console.error("Error creating prescription:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get all prescriptions
 */
export const getAllPrescriptions = async (_req: Request, res: Response): Promise<void> => {
  try {
    const prescriptions = await Prescription.find()
      .populate("patient doctor dependencies appointment");
    res.status(200).json(prescriptions);
  } catch (err) {
    console.error("Get prescriptions error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get a prescription by ID
 */
export const getPrescriptionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient doctor dependencies appointment");
    if (!prescription) {
      res.status(404).json({ message: "Prescription not found" });
      return;
    }
    res.status(200).json(prescription);
  } catch (err) {
    console.error("Get prescription by ID error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Update a prescription
 */
export const updatePrescription = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("patient doctor dependencies appointment");

    if (!updated) {
      res.status(404).json({ message: "Prescription not found" });
      return;
    }
    res.status(200).json({ message: "Prescription updated", updated });
  } catch (err) {
    console.error("Update prescription error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Delete a prescription
 */
export const deletePrescription = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Prescription.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Prescription not found" });
      return;
    }
    res.status(200).json({ message: "Prescription deleted" });
  } catch (err) {
    console.error("Delete prescription error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};