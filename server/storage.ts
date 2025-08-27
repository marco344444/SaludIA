import { 
  type Diagnosis, 
  type InsertDiagnosis,
  type HealthRecord,
  type InsertHealthRecord,
  type QuickTranslation,
  type InsertQuickTranslation,
  type ClinicalAnalysis,
  type InsertClinicalAnalysis
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Diagnosis operations
  createDiagnosis(diagnosis: InsertDiagnosis): Promise<Diagnosis>;
  getDiagnoses(): Promise<Diagnosis[]>;
  getDiagnosis(id: string): Promise<Diagnosis | undefined>;
  
  // Health record operations
  createHealthRecord(record: InsertHealthRecord): Promise<HealthRecord>;
  getHealthRecord(id: string): Promise<HealthRecord | undefined>;
  updateHealthRecord(id: string, record: Partial<InsertHealthRecord>): Promise<HealthRecord | undefined>;
  
  // Quick translation operations
  getQuickTranslations(): Promise<QuickTranslation[]>;
  createQuickTranslation(translation: InsertQuickTranslation): Promise<QuickTranslation>;
  
  // Clinical analysis operations
  createClinicalAnalysis(analysis: InsertClinicalAnalysis): Promise<ClinicalAnalysis>;
  getClinicalAnalyses(): Promise<ClinicalAnalysis[]>;
  getClinicalAnalysis(id: string): Promise<ClinicalAnalysis | undefined>;
}

export class MemStorage implements IStorage {
  private diagnoses: Map<string, Diagnosis> = new Map();
  private healthRecords: Map<string, HealthRecord> = new Map();
  private quickTranslations: Map<string, QuickTranslation> = new Map();
  private clinicalAnalyses: Map<string, ClinicalAnalysis> = new Map();

  constructor() {
    // Initialize with some quick translations
    const defaultQuickTranslations = [
      { medical: "Hipertensión", simple: "Presión alta", category: "cardiovascular" },
      { medical: "Diabetes Tipo 2", simple: "Azúcar alta", category: "endocrine" },
      { medical: "Migraña", simple: "Dolor de cabeza fuerte", category: "neurological" },
      { medical: "Gastritis", simple: "Inflamación estómago", category: "digestive" },
    ];

    defaultQuickTranslations.forEach(qt => {
      const id = randomUUID();
      this.quickTranslations.set(id, { ...qt, id });
    });

    // Initialize with a sample health record
    const sampleHealthRecord: HealthRecord = {
      id: randomUUID(),
      patientName: "Dr. María García",
      age: 45,
      conditions: ["Hipertensión", "Diabetes Tipo 2"],
      vitalSigns: {
        bloodPressure: { systolic: 120, diastolic: 80, date: new Date().toISOString() },
        glucose: { value: 95, unit: "mg/dL", date: new Date(Date.now() - 86400000).toISOString() },
        weight: { value: 68.5, unit: "kg", date: new Date(Date.now() - 604800000).toISOString() }
      },
      medications: [
        {
          name: "Enalapril 10mg",
          dosage: "10mg",
          instructions: "Tomar con el desayuno",
          taken: true,
          time: "08:30"
        },
        {
          name: "Metformina 500mg",
          dosage: "500mg",
          instructions: "Con almuerzo y cena",
          taken: false,
          time: "14:00"
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.healthRecords.set(sampleHealthRecord.id, sampleHealthRecord);
  }

  async createDiagnosis(insertDiagnosis: InsertDiagnosis): Promise<Diagnosis> {
    const id = randomUUID();
    const diagnosis: Diagnosis = {
      ...insertDiagnosis,
      id,
      confidence: insertDiagnosis.confidence ?? null,
      createdAt: new Date(),
    };
    this.diagnoses.set(id, diagnosis);
    return diagnosis;
  }

  async getDiagnoses(): Promise<Diagnosis[]> {
    return Array.from(this.diagnoses.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getDiagnosis(id: string): Promise<Diagnosis | undefined> {
    return this.diagnoses.get(id);
  }

  async createHealthRecord(insertRecord: InsertHealthRecord): Promise<HealthRecord> {
    const id = randomUUID();
    const record: HealthRecord = {
      ...insertRecord,
      id,
      age: insertRecord.age ?? null,
      conditions: Array.isArray(insertRecord.conditions) ? insertRecord.conditions : null,
      vitalSigns: insertRecord.vitalSigns ?? null,
      medications: Array.isArray(insertRecord.medications) ? insertRecord.medications : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.healthRecords.set(id, record);
    return record;
  }

  async getHealthRecord(id: string): Promise<HealthRecord | undefined> {
    return this.healthRecords.get(id);
  }

  async updateHealthRecord(id: string, updateRecord: Partial<InsertHealthRecord>): Promise<HealthRecord | undefined> {
    const existing = this.healthRecords.get(id);
    if (!existing) return undefined;

    const updated: HealthRecord = {
      ...existing,
      ...updateRecord,
      age: updateRecord.age !== undefined ? updateRecord.age : existing.age,
      conditions: updateRecord.conditions !== undefined ? Array.isArray(updateRecord.conditions) ? updateRecord.conditions : null : existing.conditions,
      vitalSigns: updateRecord.vitalSigns !== undefined ? updateRecord.vitalSigns : existing.vitalSigns,
      medications: updateRecord.medications !== undefined ? Array.isArray(updateRecord.medications) ? updateRecord.medications : null : existing.medications,
      updatedAt: new Date(),
    };
    this.healthRecords.set(id, updated);
    return updated;
  }

  async getQuickTranslations(): Promise<QuickTranslation[]> {
    return Array.from(this.quickTranslations.values());
  }

  async createQuickTranslation(insertTranslation: InsertQuickTranslation): Promise<QuickTranslation> {
    const id = randomUUID();
    const translation: QuickTranslation = {
      ...insertTranslation,
      id,
      category: insertTranslation.category ?? null,
    };
    this.quickTranslations.set(id, translation);
    return translation;
  }

  async createClinicalAnalysis(insertAnalysis: InsertClinicalAnalysis): Promise<ClinicalAnalysis> {
    const id = randomUUID();
    const analysis: ClinicalAnalysis = {
      ...insertAnalysis,
      id,
      confidence: insertAnalysis.confidence ?? null,
      keyFindings: insertAnalysis.keyFindings ? {
        conditions: Array.isArray(insertAnalysis.keyFindings.conditions) ? insertAnalysis.keyFindings.conditions : [],
        medications: Array.isArray(insertAnalysis.keyFindings.medications) ? insertAnalysis.keyFindings.medications : [],
        vitals: Array.isArray(insertAnalysis.keyFindings.vitals) ? insertAnalysis.keyFindings.vitals : [],
        recommendations: Array.isArray(insertAnalysis.keyFindings.recommendations) ? insertAnalysis.keyFindings.recommendations : [],
      } : null,
      createdAt: new Date(),
    };
    this.clinicalAnalyses.set(id, analysis);
    return analysis;
  }

  async getClinicalAnalyses(): Promise<ClinicalAnalysis[]> {
    return Array.from(this.clinicalAnalyses.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getClinicalAnalysis(id: string): Promise<ClinicalAnalysis | undefined> {
    return this.clinicalAnalyses.get(id);
  }
}

export const storage = new MemStorage();
