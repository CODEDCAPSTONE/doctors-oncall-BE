import { Request, Response } from "express";
import Patient from "../models/Patients";
import HealthCareProvider from "../models/HealthCareProvider";
import mongoose from "mongoose";

export const addFavorite = async (req: Request, res: Response) => {
  const { patientId, providerId } = req.body;

  const patient = await Patient.findById(patientId);
  if (!patient) {
    res.status(404).json({ message: "Patient not found" });
  } else {
    const provider = await HealthCareProvider.findById(providerId);
    if (!provider) {
      res.status(404).json({ message: "Provider not found" });
    } else {
      if (patient.favorites?.includes(providerId)) {
        res.status(409).json({ message: "Provider already in favorites" });
      } else {
        patient.favorites?.push(providerId);
        await patient.save();

        res.status(201).json({
          message: "Provider added to favorites",
          favorites: patient.favorites,
        });
      }
    }
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  const { patientId } = req.body;
  const { providerId } = req.params;

  const providerObjectId = new mongoose.Types.ObjectId(providerId);

  const patient = await Patient.findById(patientId);
  if (!patient) {
    res.status(404).json({ message: "Patient not found" });
  } else {
    const wasRemoved = patient.favorites?.includes(providerObjectId);
    if (!wasRemoved) {
      res.status(404).json({ message: "Favorite does not exist" });
    } else {
      patient.favorites = patient.favorites?.filter(
        (id) => id.toString() !== providerId
      );
      await patient.save();

      res.status(200).json({ message: "Provider removed from favorites" });
    }
  }
};


