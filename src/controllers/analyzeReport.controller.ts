import { Request, Response, NextFunction } from "express";
import pdfParse from "pdf-parse";
import fs from "fs";
import { OpenAI } from "openai";
import MedicalReport from "../models/MedicalReport";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

console.log("✅ Ready for production!");

export const analyzePdf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { labID } = req.params;

    // Find medical report in DB
    const medicalReport = await MedicalReport.findById(labID);
    if (!medicalReport) {
      return res.status(404).json({ message: "Medical report not found" });
    }

    const filePath = medicalReport.reportURL;
    if (!filePath || !fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Report PDF file not found on server" });
    }

    // Read and parse PDF
    const pdfBuffer = await fs.promises.readFile(filePath);
    const data = await pdfParse(pdfBuffer);

    const prompt = `
You are a medical assistant. Analyze the following medical report and provide a concise summary and highlight any abnormal values or concerns.

Medical Report Content:
${data.text}
    `;

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const analysisText = completion.choices[0].message.content;

    // Update DB with analysis
    const savedReport = await MedicalReport.findByIdAndUpdate(
      labID,
      { analysis: analysisText },
      { new: true }
    );

    res.json({
      message: "✅ PDF analyzed successfully",
      analysis: savedReport?.analysis,
    });
  } catch (error) {
    console.error("❌ Error analyzing PDF:", error);
    next(error);
  }
};
