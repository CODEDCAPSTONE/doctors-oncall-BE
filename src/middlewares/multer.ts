import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpg|png|pdf/;
    const extValid = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeValid = allowedTypes.test(file.mimetype);

    if (extValid && mimeValid) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only .jpg and .png files are allowed!") as any, false); // Reject the file
    }
  },
});

export default upload;
