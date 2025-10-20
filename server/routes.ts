import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDiagnosisSchema, insertHealthRecordSchema, insertClinicalAnalysisSchema, insertUserSchema, loginSchema } from "@shared/schema";
import { medicalTranslator } from "./medical-translator";
import { authenticateToken, optionalAuth, generateToken, type AuthRequest } from "./auth";
import bcrypt from "bcryptjs";
import multer from "multer";
import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'text/csv', 'application/vnd.ms-excel'];
    if (allowedTypes.includes(file.mimetype) || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF y CSV'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ========== AUTH ROUTES ==========
  
  // Register new user
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "El email ya está registrado" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role || "patient",
      });

      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({
        user: userWithoutPassword,
        token,
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Datos de registro inválidos", errors: error.errors });
      }
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  });

  // Login user
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Email o contraseña incorrectos" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Email o contraseña incorrectos" });
      }

      // Update last login
      await storage.updateUserLastLogin(user.id);

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role || "patient",
      });

      // Don't send password back
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        user: userWithoutPassword,
        token,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Datos de login inválidos" });
      }
      res.status(500).json({ message: "Error al iniciar sesión" });
    }
  });

  // Get current user
  app.get("/api/auth/me", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Error al obtener usuario" });
    }
  });

  // ========== TRANSLATION ROUTES ==========
  
  // Translate medical diagnosis using ClinicalBERT algorithm (NO requiere auth - funciona sin login)
  app.post("/api/translate", optionalAuth, async (req: AuthRequest, res) => {
    try {
      const { originalText } = req.body;
      
      if (!originalText || typeof originalText !== 'string') {
        return res.status(400).json({ message: "El texto original es requerido" });
      }

      // Usar algoritmo ClinicalBERT local para traducción médica
      const result = medicalTranslator.translate(originalText);
      
      // Guardar con userId si está autenticado, null si es anónimo
      const diagnosis = await storage.createDiagnosis({
        originalText,
        translatedText: result.translatedText,
        confidence: result.confidence,
      }, req.userId || undefined);

      res.json(diagnosis);
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ message: "Error al traducir el diagnóstico" });
    }
  });

  // Get all diagnoses (translation history)
  app.get("/api/diagnoses", async (req, res) => {
    try {
      const diagnoses = await storage.getDiagnoses();
      res.json(diagnoses);
    } catch (error) {
      console.error("Error fetching diagnoses:", error);
      res.status(500).json({ message: "Failed to fetch diagnoses" });
    }
  });

  // Get single diagnosis
  app.get("/api/diagnoses/:id", async (req, res) => {
    try {
      const diagnosis = await storage.getDiagnosis(req.params.id);
      if (!diagnosis) {
        return res.status(404).json({ message: "Diagnosis not found" });
      }
      res.json(diagnosis);
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
      res.status(500).json({ message: "Failed to fetch diagnosis" });
    }
  });

  // Get quick translations
  app.get("/api/quick-translations", async (req, res) => {
    try {
      const translations = await storage.getQuickTranslations();
      res.json(translations);
    } catch (error) {
      console.error("Error fetching quick translations:", error);
      res.status(500).json({ message: "Failed to fetch quick translations" });
    }
  });

  // Get health record (assuming single patient for MVP)
  app.get("/api/health-record", async (req, res) => {
    try {
      const records = Array.from((storage as any).healthRecords.values());
      const healthRecord = records[0]; // Get first (sample) record
      if (!healthRecord) {
        return res.status(404).json({ message: "Health record not found" });
      }
      res.json(healthRecord);
    } catch (error) {
      console.error("Error fetching health record:", error);
      res.status(500).json({ message: "Failed to fetch health record" });
    }
  });

  // Update health record
  app.patch("/api/health-record/:id", async (req, res) => {
    try {
      const validatedData = insertHealthRecordSchema.partial().parse(req.body);
      const updated = await storage.updateHealthRecord(req.params.id, validatedData);
      
      if (!updated) {
        return res.status(404).json({ message: "Health record not found" });
      }
      
      res.json(updated);
    } catch (error) {
      console.error("Error updating health record:", error);
      res.status(500).json({ message: "Failed to update health record" });
    }
  });

  // Upload and analyze clinical file
  app.post("/api/upload-clinical-file", upload.single('clinicalFile'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No se ha subido ningún archivo" });
      }

      const filePath = req.file.path;
      const fileName = req.file.originalname;
      const fileType = path.extname(fileName).toLowerCase();
      
      let fileContent = "";
      
      // Process file based on type
      if (fileType === '.pdf') {
        try {
          const dataBuffer = fs.readFileSync(filePath);
          // Usar require en lugar de import dinámico para evitar bug de pdf-parse
          const pdfParse = require('pdf-parse');
          const pdfData = await pdfParse(dataBuffer);
          fileContent = pdfData.text;
        } catch (pdfError: any) {
          console.error("Error parsing PDF:", pdfError);
          fs.unlinkSync(filePath);
          return res.status(500).json({ 
            message: "Error al procesar el PDF. Verifica que el archivo no esté dañado o protegido." 
          });
        }
      } else if (fileType === '.csv' || req.file.mimetype.includes('csv')) {
        const csvContent = fs.readFileSync(filePath, 'utf8');
        const parsed = Papa.parse(csvContent, { header: true });
        fileContent = JSON.stringify(parsed.data, null, 2);
      } else {
        // Cleanup uploaded file
        fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Tipo de archivo no soportado" });
      }

      // Analizar con algoritmo ClinicalBERT local
      const analysisResult = medicalTranslator.analyzeClinicalFile(
        fileContent, 
        fileType === '.pdf' ? 'pdf' : 'csv'
      );
      
      // Save analysis to storage
      const clinicalAnalysis = await storage.createClinicalAnalysis({
        fileName,
        fileType: fileType === '.pdf' ? 'pdf' : 'csv',
        originalContent: fileContent.substring(0, 10000), // Store first 10k chars
        analysis: analysisResult.analysis,
        keyFindings: analysisResult.keyFindings,
        confidence: analysisResult.confidence,
      });

      // Cleanup uploaded file
      fs.unlinkSync(filePath);

      res.json(clinicalAnalysis);
    } catch (error) {
      console.error("Error analyzing clinical file:", error);
      // Cleanup file if exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ message: "Error al analizar el archivo médico" });
    }
  });

  // Get all clinical analyses
  app.get("/api/clinical-analyses", async (req, res) => {
    try {
      const analyses = await storage.getClinicalAnalyses();
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching clinical analyses:", error);
      res.status(500).json({ message: "Failed to fetch clinical analyses" });
    }
  });

  // Get single clinical analysis
  app.get("/api/clinical-analyses/:id", async (req, res) => {
    try {
      const analysis = await storage.getClinicalAnalysis(req.params.id);
      if (!analysis) {
        return res.status(404).json({ message: "Clinical analysis not found" });
      }
      res.json(analysis);
    } catch (error) {
      console.error("Error fetching clinical analysis:", error);
      res.status(500).json({ message: "Failed to fetch clinical analysis" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
