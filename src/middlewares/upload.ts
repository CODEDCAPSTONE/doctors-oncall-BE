import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";
import fs from "fs";

// Ensure directories exist
const imageDir = path.join(__dirname, "../../uploads/images");
const documentDir = path.join(__dirname, "../../uploads/documents");

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

if (!fs.existsSync(documentDir)) {
  fs.mkdirSync(documentDir, { recursive: true });
}

// storage for profile images
const profileImageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, imageDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// storage for PDFs
const pdfStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, documentDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// file filter for both (optional: you can even split if needed)
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpg, png) or PDFs are allowed!"));
  }
};

// 5MB limit
const limits = { fileSize: 5 * 1024 * 1024 };

// create instances
export const uploadImage = multer({
  storage: profileImageStorage,
  fileFilter,
  limits,
});

export const uploadPDF = multer({
  storage: pdfStorage,
  fileFilter,
  limits,
});

export default multer({
  storage: profileImageStorage,
  fileFilter,
  limits,
});
