// Vercel serverless function handler
import express from "express";
import { createServer } from "http";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { createRequire } from "module";

// Import your storage and translator
import { storage } from "../server/storage.js";
import { medicalTranslator } from "../server/medical-translator.js";
import { authenticateToken, optionalAuth, generateToken } from "../server/auth.js";

const require = createRequire(import.meta.url);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure multer for serverless
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Auth routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await storage.createUser({
      email,
      password: hashedPassword,
      fullName,
      role: "patient"
    });

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    await storage.updateUserLastLogin(user.id);
    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const user = await storage.getUser(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

// Translation route
app.post("/api/translate", optionalAuth, async (req, res) => {
  try {
    const { originalText } = req.body;
    if (!originalText) {
      return res.status(400).json({ message: "El texto original es requerido" });
    }

    const result = medicalTranslator.translate(originalText);
    const diagnosis = await storage.createDiagnosis({
      originalText,
      translatedText: result.translatedText,
      confidence: result.confidence
    }, req.userId);

    res.json(diagnosis);
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ message: "Error al traducir el diagnóstico" });
  }
});

app.get("/api/diagnoses", async (req, res) => {
  try {
    const diagnoses = await storage.getDiagnoses();
    res.json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch diagnoses" });
  }
});

app.get("/api/quick-translations", async (req, res) => {
  try {
    const translations = await storage.getQuickTranslations();
    res.json(translations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quick translations" });
  }
});

app.get("/api/health-record", async (req, res) => {
  try {
    const records = Array.from(storage.healthRecords.values());
    const healthRecord = records[0];
    if (!healthRecord) {
      return res.status(404).json({ message: "Health record not found" });
    }
    res.json(healthRecord);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch health record" });
  }
});

app.get("/api/clinical-analyses", async (req, res) => {
  try {
    const analyses = await storage.getClinicalAnalyses();
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch clinical analyses" });
  }
});

// Export for Vercel
export default app;
