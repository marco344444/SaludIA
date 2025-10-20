import { 
  type Diagnosis, 
  type InsertDiagnosis,
  type HealthRecord,
  type InsertHealthRecord,
  type QuickTranslation,
  type InsertQuickTranslation,
  type ClinicalAnalysis,
  type InsertClinicalAnalysis,
  type User,
  type InsertUser
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUserLastLogin(id: string): Promise<void>;
  
  // Diagnosis operations
  createDiagnosis(diagnosis: InsertDiagnosis, userId?: string): Promise<Diagnosis>;
  getDiagnoses(userId?: string): Promise<Diagnosis[]>;
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
  private users: Map<string, User> = new Map();
  private diagnoses: Map<string, Diagnosis> = new Map();
  private healthRecords: Map<string, HealthRecord> = new Map();
  private quickTranslations: Map<string, QuickTranslation> = new Map();
  private clinicalAnalyses: Map<string, ClinicalAnalysis> = new Map();

  constructor() {
    // Initialize with sample users for testing
    this.initializeSampleUsers();
    
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
      userId: null,
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

  // Initialize sample users with pre-hashed passwords
  private async initializeSampleUsers() {
    const bcrypt = await import('bcryptjs');
    
    // USUARIO DE PRUEBA (solo paciente - la app es para pacientes)
    const sampleUsers = [
      {
        email: "paciente@test.com",
        password: "paciente123", // Contraseña: paciente123
        fullName: "María González",
        role: "patient"
      }
    ];

    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const id = randomUUID();
      const user: User = {
        id,
        email: userData.email,
        password: hashedPassword,
        fullName: userData.fullName,
        role: userData.role as "doctor" | "patient" | "admin",
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: null,
      };
      this.users.set(id, user);
    }
  }

  // ========== USER OPERATIONS ==========
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      role: insertUser.role || "patient",
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null,
    };
    this.users.set(id, user);
    return user;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async updateUserLastLogin(id: string): Promise<void> {
    const user = this.users.get(id);
    if (user) {
      user.lastLogin = new Date();
      user.updatedAt = new Date();
      this.users.set(id, user);
    }
  }

  // ========== DIAGNOSIS OPERATIONS ==========

  async createDiagnosis(insertDiagnosis: InsertDiagnosis, userId?: string): Promise<Diagnosis> {
    const id = randomUUID();
    const diagnosis: Diagnosis = {
      ...insertDiagnosis,
      id,
      userId: userId || null,
      confidence: insertDiagnosis.confidence ?? null,
      createdAt: new Date(),
    };
    this.diagnoses.set(id, diagnosis);
    return diagnosis;
  }

  async getDiagnoses(userId?: string): Promise<Diagnosis[]> {
    const allDiagnoses = Array.from(this.diagnoses.values());
    const filtered = userId 
      ? allDiagnoses.filter(d => d.userId === userId)
      : allDiagnoses;
    
    return filtered.sort((a, b) => 
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
      userId: (insertRecord as any).userId ?? null,
      age: insertRecord.age ?? null,
      conditions: Array.isArray(insertRecord.conditions) ? insertRecord.conditions as string[] : null,
      vitalSigns: insertRecord.vitalSigns ? insertRecord.vitalSigns as {
        bloodPressure?: { systolic: number; diastolic: number; date: string };
        glucose?: { value: number; unit: string; date: string };
        weight?: { value: number; unit: string; date: string };
      } : null,
      medications: Array.isArray(insertRecord.medications) ? insertRecord.medications as {
        name: string;
        dosage: string;
        instructions: string;
        taken: boolean;
        time: string;
      }[] : null,
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
      conditions: updateRecord.conditions !== undefined ? Array.isArray(updateRecord.conditions) ? updateRecord.conditions as string[] : null : existing.conditions,
      vitalSigns: updateRecord.vitalSigns !== undefined ? updateRecord.vitalSigns as {
        bloodPressure?: { systolic: number; diastolic: number; date: string };
        glucose?: { value: number; unit: string; date: string };
        weight?: { value: number; unit: string; date: string };
      } : existing.vitalSigns,
      medications: updateRecord.medications !== undefined ? Array.isArray(updateRecord.medications) ? updateRecord.medications as {
        name: string;
        dosage: string;
        instructions: string;
        taken: boolean;
        time: string;
      }[] : null : existing.medications,
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
      userId: (insertAnalysis as any).userId ?? null,
      confidence: insertAnalysis.confidence ?? null,
      keyFindings: insertAnalysis.keyFindings ? {
        conditions: Array.isArray(insertAnalysis.keyFindings.conditions) ? insertAnalysis.keyFindings.conditions as string[] : [],
        medications: Array.isArray(insertAnalysis.keyFindings.medications) ? insertAnalysis.keyFindings.medications as string[] : [],
        vitals: Array.isArray(insertAnalysis.keyFindings.vitals) ? insertAnalysis.keyFindings.vitals as string[] : [],
        recommendations: Array.isArray(insertAnalysis.keyFindings.recommendations) ? insertAnalysis.keyFindings.recommendations as string[] : [],
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
