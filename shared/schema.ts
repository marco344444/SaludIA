import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const diagnoses = pgTable("diagnoses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  originalText: text("original_text").notNull(),
  translatedText: text("translated_text").notNull(),
  confidence: integer("confidence"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const healthRecords = pgTable("health_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientName: text("patient_name").notNull(),
  age: integer("age"),
  conditions: jsonb("conditions").$type<string[]>().default([]),
  vitalSigns: jsonb("vital_signs").$type<{
    bloodPressure?: { systolic: number; diastolic: number; date: string };
    glucose?: { value: number; unit: string; date: string };
    weight?: { value: number; unit: string; date: string };
  }>(),
  medications: jsonb("medications").$type<{
    name: string;
    dosage: string;
    instructions: string;
    taken: boolean;
    time: string;
  }[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const quickTranslations = pgTable("quick_translations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  medical: text("medical").notNull(),
  simple: text("simple").notNull(),
  category: text("category"),
});

export const clinicalAnalyses = pgTable("clinical_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(), // 'pdf' or 'csv'
  originalContent: text("original_content").notNull(),
  analysis: text("analysis").notNull(),
  keyFindings: jsonb("key_findings").$type<{
    conditions: string[];
    medications: string[];
    vitals: string[];
    recommendations: string[];
  }>(),
  confidence: integer("confidence"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDiagnosisSchema = createInsertSchema(diagnoses).omit({
  id: true,
  createdAt: true,
});

export const insertHealthRecordSchema = createInsertSchema(healthRecords).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertQuickTranslationSchema = createInsertSchema(quickTranslations).omit({
  id: true,
});

export const insertClinicalAnalysisSchema = createInsertSchema(clinicalAnalyses).omit({
  id: true,
  createdAt: true,
});

export type InsertDiagnosis = z.infer<typeof insertDiagnosisSchema>;
export type Diagnosis = typeof diagnoses.$inferSelect;

export type InsertHealthRecord = z.infer<typeof insertHealthRecordSchema>;
export type HealthRecord = typeof healthRecords.$inferSelect;

export type InsertQuickTranslation = z.infer<typeof insertQuickTranslationSchema>;
export type QuickTranslation = typeof quickTranslations.$inferSelect;

export type InsertClinicalAnalysis = z.infer<typeof insertClinicalAnalysisSchema>;
export type ClinicalAnalysis = typeof clinicalAnalyses.$inferSelect;
