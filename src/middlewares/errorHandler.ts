import { NextFunction, Request, Response } from "express";

const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Global Error Handler:", err.stack || err);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message || "Unknown error",
    stack: err.stack || "No stack trace"
  });
};

export default ErrorHandler;
