import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
      return res.status(400).json({ message: "Validation error", errors });
    }
    req.body = result.data;
    next();
  };
};
