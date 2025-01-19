import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request interface to include custom properties
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

interface DecodedToken {
  id: string;
  [key: string]: any;
}

export const authMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  
  // More robust token extraction
  const token = authHeader 
    ? authHeader.startsWith("Bearer ") 
      ? authHeader.split(" ")[1] 
      : authHeader
    : undefined;

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT Secret is not defined");
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET
    ) as DecodedToken;

    // Ensure id is a string
    req.userId = String(decoded.id);
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(403).json({ 
      message: "Invalid or expired token",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
};
