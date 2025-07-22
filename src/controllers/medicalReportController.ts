import { Request, Response } from "express";
import MedicalReport from "../models/MedicalReport";
import Lab from "../models/Lab";
import Patient from "../models/Patients";

export const uploadReport = async (req: Request, res: Response) => {
  const {
    patientId,
    bookingId,
    notes,
    testName,
    price,
    analysis,
    validUntil
  } = req.body;

  const reportURL = req.file?.path;

  if (!patientId) {
    res.status(422).json({ message: "patientId is required" });
    return;
  }

  if (!reportURL) {
    res.status(422).json({ message: "reportURL is required" });
    return;
  }

  if (!testName) {
    res.status(422).json({ message: "testName is required" });
    return;
  }

  if (price === undefined || price === null) {
    res.status(422).json({ message: "price is required" });
    return;
  }

  try {
    const providerId = (req as any).user.id;
    const lab = await Lab.findOne({ provider: providerId });
    if (!lab) {
      res.status(404).json({ message: "Lab not found for this provider" });
      return;
    }

    const patientExists = await Patient.exists({ _id: patientId });
    if (!patientExists) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    const report = await MedicalReport.create({
      lab: lab._id,
      patient: patientId,
      booking: bookingId || undefined,
      reportURL,
      notes,
      testName,
      price: Number(price),
      uploadedBy: providerId,
      analysis,
      validUntil,
      status: "Pending"
    });

    res.status(201).json({ message: "Report uploaded", report });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: (err as Error).message });
  }
};

export const updateReportStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updated = await MedicalReport.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Report not found" });
      return;
    }

    res.status(200).json({ message: "Report status updated", report: updated });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: (err as Error).message });
  }
};

export const updateReportAnalysis = async (req: Request, res: Response) => {
  const { analysis } = req.body;
  const { id } = req.params;

  try {
    const updated = await MedicalReport.findByIdAndUpdate(
      id,
      { analysis },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Report not found" });
      return;
    }

    res.status(200).json({ message: "Report analysis updated", report: updated });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: (err as Error).message });
  }
};

export const getReports = async (_req: Request, res: Response) => {
  try {
    const reports = await MedicalReport.find().populate([
      "patient",
      "uploadedBy",
      "lab",
      "booking"
    ]);
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: (err as Error).message });
  }
};

export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await MedicalReport.findById(req.params.id).populate([
      "patient",
      "uploadedBy",
      "lab",
      "booking"
    ]);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: (err as Error).message });
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const report = await MedicalReport.findByIdAndDelete(req.params.id);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    res.status(200).json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: (err as Error).message });
  }
};
