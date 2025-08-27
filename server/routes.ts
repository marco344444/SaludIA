import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDiagnosisSchema, insertHealthRecordSchema, insertClinicalAnalysisSchema } from "@shared/schema";
import OpenAI from "openai";
import multer from "multer";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

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
  // Translate medical diagnosis using AI
  app.post("/api/translate", async (req, res) => {
    try {
      const { originalText } = req.body;
      
      if (!originalText || typeof originalText !== 'string') {
        return res.status(400).json({ message: "Original text is required" });
      }

      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are a medical translation expert. Translate complex medical diagnoses into simple, understandable language for patients. Maintain accuracy while using everyday terms. Respond with JSON in this format: { 'translatedText': 'your translation', 'confidence': number_between_0_and_100 }"
          },
          {
            role: "user",
            content: `Please translate this medical diagnosis into simple, patient-friendly language: "${originalText}"`
          }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      const diagnosis = await storage.createDiagnosis({
        originalText,
        translatedText: result.translatedText,
        confidence: result.confidence,
      });

      res.json(diagnosis);
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ message: "Failed to translate diagnosis" });
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
        const dataBuffer = fs.readFileSync(filePath);
        const pdfParse = (await import('pdf-parse')).default;
        const pdfData = await pdfParse(dataBuffer);
        fileContent = pdfData.text;
      } else if (fileType === '.csv' || req.file.mimetype.includes('csv')) {
        const csvContent = fs.readFileSync(filePath, 'utf8');
        const parsed = Papa.parse(csvContent, { header: true });
        fileContent = JSON.stringify(parsed.data, null, 2);
      } else {
        // Cleanup uploaded file
        fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Tipo de archivo no soportado" });
      }

      // Analyze with OpenAI
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      const analysisResponse = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: `Eres un experto médico que analiza historiales clínicos. Analiza el siguiente contenido médico y proporciona:
            1. Un resumen claro y comprensible del estado de salud del paciente
            2. Identifica condiciones médicas principales
            3. Lista medicamentos mencionados
            4. Signos vitales encontrados
            5. Recomendaciones de seguimiento
            
            Responde en JSON con este formato: 
            {
              "analysis": "análisis completo en español simple",
              "keyFindings": {
                "conditions": ["lista de condiciones"],
                "medications": ["lista de medicamentos"],
                "vitals": ["signos vitales encontrados"],
                "recommendations": ["recomendaciones"]
              },
              "confidence": número_entre_0_y_100
            }`
          },
          {
            role: "user",
            content: `Analiza este historial clínico (${fileType === '.pdf' ? 'PDF' : 'CSV'}): ${fileContent.substring(0, 4000)}${fileContent.length > 4000 ? '...' : ''}`
          }
        ],
        response_format: { type: "json_object" },
      });

      const analysisResult = JSON.parse(analysisResponse.choices[0].message.content || '{}');
      
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
