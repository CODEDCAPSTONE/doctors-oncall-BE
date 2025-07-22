import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Middleware: Verifies JWT and attaches normalized user payload to req.user
 */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided or bad format" });
  }

  const token = header.split(" ")[1];

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "JWT_SECRET not defined" });
  }

  try {
    const payload = jwt.verify(token, secret) as any;

    // Explicitly cast to `any` to satisfy TS
    (req as any).user = {
      id: payload.id || payload.providerId || payload._id,
      role: payload.role?.toLowerCase() || null,
      email: payload.email || null,
    };

    if (!(req as any).user.id) {
      return res.status(401).json({ message: "Invalid token: no user id" });
    }

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * Middleware: Checks if user has at least one of the allowed roles
 */
const authorizeRole = (roles: string[]) => {
  const normalizedRoles = roles.map(r => r.toLowerCase());
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user?.role) {
      return res.status(403).json({ message: "Forbidden: no user role found" });
    }

    const hasRole = normalizedRoles.includes(user.role);

    if (!hasRole) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  };
};

// Alias: `authorize` is the same as `authenticate`
const authorize = authenticate;

export { authenticate, authorize, authorizeRole };
