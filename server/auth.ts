import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "meditranslate-secret-key-change-in-production";

export interface AuthRequest extends Request {
  userId?: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Token de autenticación requerido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.userId = decoded.userId;
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      fullName: decoded.fullName,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}

export function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      req.userId = decoded.userId;
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        fullName: decoded.fullName,
        role: decoded.role,
      };
    } catch (error) {
      // Token inválido pero no bloqueamos, seguimos sin auth
    }
  }
  
  next();
}

export function generateToken(user: { id: string; email: string; fullName: string; role: string }) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" } // Token válido por 7 días
  );
}
