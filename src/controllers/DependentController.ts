import { Request, Response } from "express";
import Dependent from "../models/Dependent";
import Patient from "../models/Patients";

const addDependent = async (req: Request, res: Response) => {
  try {
    const { name, age, relationship } = req.body;
    const patientId = req.body.patientId;

    if (!name || !age || !relationship || !patientId) {
      return res.status(422).json({
        message:
          "Dependent name, age, relationship, and patientId are required",
      });
    }

    const dependent = new Dependent({
      name,
      age,
      relationship,
      careGiver: patientId, // 🔷 FIXED
    });

    await dependent.save();

    await Patient.findByIdAndUpdate(patientId, {
      $push: { dependents: dependent._id },
    });

    res.status(201).json({ dependent });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    console.error("❌ Error adding dependent:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDependents = async (req: Request, res: Response) => {
  const patientId = req.body.patientId;

  const dependents = await Dependent.find({ careGiver: patientId }); // 🔷 FIXED
  res.status(200).json({ dependents });
};

const updateDependent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, relationship } = req.body;

  const updated = await Dependent.findByIdAndUpdate(
    id,
    { name, age, relationship },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Dependent not found" });

  res.status(200).json({ dependent: updated });
};

const deleteDependent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const dependent = await Dependent.findById(id);
  if (!dependent) {
    return res.status(404).json({ message: "Dependent not found" });
  } else {
    if (dependent.hasActivePrescription || dependent.hasActiveAppointment) {
      return res.status(400).json({
        message:
          "Cannot delete dependent with active prescriptions or appointments",
      });
    }

    await Dependent.findByIdAndDelete(id);

    await Patient.findByIdAndUpdate(dependent.careGiver, { // 🔷 FIXED
      $pull: { dependents: id },
    });

    res.status(200).json({ message: "Dependent deleted successfully" });
  }
};

export { addDependent, deleteDependent, updateDependent, getDependents };
