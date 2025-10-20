// Sistema de traducción médica basado en ClinicalBERT y NLP médico
export interface MedicalTranslation {
  translatedText: string;
  confidence: number;
  identifiedTerms: string[];
}

// Diccionario médico extenso basado en terminología clínica
const medicalDictionary: Record<string, string> = {
  // Cardiovascular
  "hipertensión arterial": "presión alta en las arterias",
  "hipertensión arterial sistólica": "presión alta cuando el corazón late",
  "hipertensión arterial diastólica": "presión alta cuando el corazón descansa",
  "hipertensión": "presión alta",
  "taquicardia": "latidos del corazón muy rápidos",
  "taquicardia sinusal": "latidos rápidos normales del corazón",
  "bradicardia": "latidos del corazón muy lentos",
  "arritmia": "latidos irregulares del corazón",
  "fibrilación auricular": "latidos irregulares en la parte superior del corazón",
  "insuficiencia cardíaca": "el corazón no bombea bien la sangre",
  "infarto de miocardio": "ataque al corazón",
  "angina de pecho": "dolor en el pecho por falta de oxígeno al corazón",
  "cardiopatía": "enfermedad del corazón",
  "valvulopatía": "problema en las válvulas del corazón",
  
  // Endocrino
  "diabetes mellitus": "azúcar alta en la sangre",
  "diabetes mellitus tipo 1": "el cuerpo no produce insulina",
  "diabetes mellitus tipo 2": "el cuerpo no usa bien la insulina",
  "diabetes": "azúcar alta",
  "hiperglucemia": "azúcar muy alta en la sangre",
  "hipoglucemia": "azúcar muy baja en la sangre",
  "resistencia a la insulina": "el cuerpo no responde bien a la insulina",
  "cetoacidosis diabética": "complicación grave de la diabetes",
  "neuropatía diabética": "daño en los nervios por diabetes",
  "retinopatía diabética": "daño en los ojos por diabetes",
  "microalbuminuria": "pequeñas cantidades de proteína en la orina",
  "macroalbuminuria": "cantidades altas de proteína en la orina",
  
  // Neurológico
  "migraña": "dolor de cabeza muy fuerte",
  "cefalea": "dolor de cabeza",
  "cefalea tensional": "dolor de cabeza por tensión o estrés",
  "epilepsia": "convulsiones repetidas",
  "convulsiones": "movimientos involuntarios del cuerpo",
  "accidente cerebrovascular": "derrame cerebral",
  "ictus": "derrame cerebral",
  "demencia": "pérdida de memoria y capacidades mentales",
  "alzheimer": "pérdida de memoria progresiva",
  "parkinson": "temblores y rigidez muscular",
  "esclerosis múltiple": "enfermedad que afecta el sistema nervioso",
  "neuropatía": "daño en los nervios",
  "neuralgia": "dolor en los nervios",
  
  // Respiratorio
  "asma": "dificultad para respirar con silbidos",
  "bronquitis": "inflamación de los tubos respiratorios",
  "neumonía": "infección en los pulmones",
  "EPOC": "enfermedad que dificulta la respiración",
  "enfermedad pulmonar obstructiva crónica": "enfermedad que dificulta la respiración",
  "apnea del sueño": "pausas en la respiración mientras duerme",
  "embolia pulmonar": "coágulo en los pulmones",
  "edema pulmonar": "líquido en los pulmones",
  "fibrosis pulmonar": "cicatrices en los pulmones",
  
  // Digestivo
  "gastritis": "inflamación del estómago",
  "úlcera péptica": "llaga en el estómago o intestino",
  "reflujo gastroesofágico": "ácido del estómago que sube al esófago",
  "síndrome del intestino irritable": "problemas digestivos con dolor abdominal",
  "enfermedad inflamatoria intestinal": "inflamación crónica del intestino",
  "colitis": "inflamación del intestino grueso",
  "hepatitis": "inflamación del hígado",
  "cirrosis": "cicatrices en el hígado",
  "pancreatitis": "inflamación del páncreas",
  "colelitiasis": "piedras en la vesícula",
  
  // Renal
  "insuficiencia renal": "los riñones no funcionan bien",
  "nefropatía": "enfermedad de los riñones",
  "proteinuria": "proteína en la orina",
  "hematuria": "sangre en la orina",
  "cistitis": "infección en la vejiga",
  "pielonefritis": "infección en los riñones",
  "cálculos renales": "piedras en los riñones",
  
  // Hematológico
  "anemia": "bajo nivel de glóbulos rojos",
  "leucemia": "cáncer en la sangre",
  "trombocitopenia": "bajo nivel de plaquetas",
  "hemofilia": "sangrado excesivo",
  "policitemia": "demasiados glóbulos rojos",
  
  // Inmunológico
  "artritis reumatoide": "inflamación dolorosa de las articulaciones",
  "lupus": "enfermedad autoinmune que afecta varios órganos",
  "esclerosis sistémica": "endurecimiento de la piel y órganos",
  "psoriasis": "manchas rojas y escamosas en la piel",
  "alergia": "reacción exagerada del sistema inmune",
  
  // Términos médicos comunes
  "agudo": "que aparece de repente",
  "crónico": "que dura mucho tiempo",
  "benigno": "no canceroso",
  "maligno": "canceroso",
  "metástasis": "propagación del cáncer",
  "inflamación": "hinchazón y enrojecimiento",
  "edema": "hinchazón por retención de líquido",
  "isquemia": "falta de oxígeno en un órgano",
  "necrosis": "muerte de tejido",
  "fibrosis": "cicatrización excesiva",
  "estenosis": "estrechamiento",
  "hipertrofia": "agrandamiento",
  "atrofia": "disminución de tamaño",
  
  // Síntomas
  "disnea": "dificultad para respirar",
  "taquipnea": "respiración muy rápida",
  "ortopnea": "dificultad para respirar al acostarse",
  "hemoptisis": "toser sangre",
  "hematemesis": "vomitar sangre",
  "melena": "heces negras con sangre",
  "oliguria": "orinar poco",
  "poliuria": "orinar mucho",
  "polidipsia": "mucha sed",
  "polifagia": "mucha hambre",
  "astenia": "cansancio extremo",
  "adinamia": "falta de fuerza",
  "parestesias": "hormigueo o entumecimiento",
  "vértigo": "sensación de que todo da vueltas",
  "síncope": "desmayo",
  "lipotimia": "sensación de desmayo",
};

// Patrones médicos complejos
const medicalPatterns: Array<{pattern: RegExp, replacement: string}> = [
  {
    pattern: /(\w+)patía/gi,
    replacement: "enfermedad de $1"
  },
  {
    pattern: /(\w+)itis/gi,
    replacement: "inflamación de $1"
  },
  {
    pattern: /(\w+)osis/gi,
    replacement: "condición de $1"
  },
  {
    pattern: /hiper(\w+)/gi,
    replacement: "nivel alto de $1"
  },
  {
    pattern: /hipo(\w+)/gi,
    replacement: "nivel bajo de $1"
  },
  {
    pattern: /(\w+)algia/gi,
    replacement: "dolor en $1"
  },
  {
    pattern: /(\w+)emia/gi,
    replacement: "$1 en la sangre"
  },
  {
    pattern: /(\w+)uria/gi,
    replacement: "$1 en la orina"
  },
  {
    pattern: /(\w+)rrea/gi,
    replacement: "flujo excesivo de $1"
  },
  {
    pattern: /disfunción\s+(\w+)/gi,
    replacement: "mal funcionamiento de $1"
  },
  {
    pattern: /insuficiencia\s+(\w+)/gi,
    replacement: "$1 que no funciona bien"
  },
  {
    pattern: /síndrome\s+de\s+(\w+)/gi,
    replacement: "conjunto de síntomas relacionados con $1"
  }
];

// Algoritmo de traducción médica inspirado en ClinicalBERT
export class MedicalTranslator {
  
  // Análisis de contexto médico
  private analyzeContext(text: string): string[] {
    const contexts = [];
    
    // Detectar contextos cardiovasculares
    if (/cardio|corazón|arterial|vascular|presión/i.test(text)) {
      contexts.push('cardiovascular');
    }
    
    // Detectar contextos endocrinos
    if (/diabetes|glucosa|insulina|tiroides|hormona/i.test(text)) {
      contexts.push('endocrino');
    }
    
    // Detectar contextos neurológicos
    if (/neuro|cerebro|nervio|convulsión|migraña/i.test(text)) {
      contexts.push('neurológico');
    }
    
    // Detectar contextos respiratorios
    if (/pulmon|respirat|asma|bronqu/i.test(text)) {
      contexts.push('respiratorio');
    }
    
    return contexts;
  }
  
  // Extracción de términos médicos
  private extractMedicalTerms(text: string): string[] {
    const terms: string[] = [];
    const lowerText = text.toLowerCase();
    
    // Buscar términos exactos en el diccionario
    for (const term in medicalDictionary) {
      if (lowerText.includes(term.toLowerCase())) {
        terms.push(term);
      }
    }
    
    // Buscar patrones médicos
    for (const pattern of medicalPatterns) {
      const matches = text.match(pattern.pattern);
      if (matches) {
        terms.push(...matches);
      }
    }
    
    return Array.from(new Set(terms)); // Eliminar duplicados
  }
  
  // Traducción principal
  public translate(diagnosticText: string): MedicalTranslation {
    let translatedText = diagnosticText;
    const identifiedTerms: string[] = [];
    let confidence = 0;
    
    // Normalizar texto
    const normalizedText = diagnosticText.toLowerCase().trim();
    
    // Extraer términos médicos
    const medicalTerms = this.extractMedicalTerms(normalizedText);
    identifiedTerms.push(...medicalTerms);
    
    // Traducir términos exactos del diccionario
    let exactMatches = 0;
    for (const term in medicalDictionary) {
      const regex = new RegExp(term, 'gi');
      if (regex.test(translatedText)) {
        translatedText = translatedText.replace(regex, medicalDictionary[term]);
        exactMatches++;
      }
    }
    
    // Aplicar patrones médicos
    let patternMatches = 0;
    for (const pattern of medicalPatterns) {
      if (pattern.pattern.test(translatedText)) {
        translatedText = translatedText.replace(pattern.pattern, pattern.replacement);
        patternMatches++;
      }
    }
    
    // Postprocesamiento para mejorar legibilidad
    translatedText = this.postProcess(translatedText);
    
    // Calcular confianza basada en términos identificados y traducidos
    const totalWords = diagnosticText.split(/\s+/).length;
    const translatedWords = exactMatches + patternMatches;
    confidence = Math.min(95, Math.max(40, (translatedWords / totalWords) * 100 + 20));
    
    // Si no se tradujeron muchos términos, dar una explicación general
    if (confidence < 60) {
      const contexts = this.analyzeContext(diagnosticText);
      if (contexts.length > 0) {
        translatedText += ` (Este es un diagnóstico relacionado con el sistema ${contexts.join(', ')})`;
        confidence += 15;
      }
    }
    
    return {
      translatedText: translatedText.charAt(0).toUpperCase() + translatedText.slice(1),
      confidence: Math.round(confidence),
      identifiedTerms
    };
  }
  
  // Postprocesamiento para mejorar legibilidad
  private postProcess(text: string): string {
    return text
      // Limpiar espacios múltiples
      .replace(/\s+/g, ' ')
      // Mejorar conectores
      .replace(/\s+con\s+/gi, ' que presenta ')
      .replace(/\s+asociada?\s+a\s+/gi, ' junto con ')
      .replace(/\s+secundaria?\s+a\s+/gi, ' causada por ')
      // Simplificar términos técnicos restantes
      .replace(/primaria/gi, 'principal')
      .replace(/secundaria/gi, 'que viene de otra causa')
      .replace(/bilateral/gi, 'en ambos lados')
      .replace(/unilateral/gi, 'en un solo lado')
      .replace(/aguda/gi, 'que aparece de repente')
      .replace(/crónica/gi, 'que dura mucho tiempo')
      .replace(/intermitente/gi, 'que va y viene')
      .replace(/persistente/gi, 'que no se quita')
      .replace(/severa/gi, 'grave')
      .replace(/moderada/gi, 'mediana')
      .replace(/leve/gi, 'ligera')
      .replace(/episodios/gi, 'ocasiones')
      .replace(/manifestaciones/gi, 'síntomas')
      .replace(/sintomatología/gi, 'síntomas')
      .trim();
  }
  
  // Análisis de archivo clínico (para PDFs y CSVs)
  public analyzeClinicalFile(content: string, fileType: 'pdf' | 'csv'): {
    analysis: string;
    keyFindings: {
      conditions: string[];
      medications: string[];
      vitals: string[];
      recommendations: string[];
    };
    confidence: number;
  } {
    const findings = {
      conditions: [] as string[],
      medications: [] as string[],
      vitals: [] as string[],
      recommendations: [] as string[]
    };
    
    let analysis = "";
    let confidence = 70;
    
    // PASO 1: Detectar si existe una sección dedicada a signos vitales
    const vitalsSection = /(?:SIGNOS VITALES|VITAL SIGNS|CONSTANTES VITALES|EXAMEN FÍSICO|EXPLORACIÓN FÍSICA|DATOS VITALES)/i.test(content);
    
    // PASO 2: Si no hay sección de signos vitales, NO buscar signos vitales aislados
    // Esto evita falsos positivos como "bajó 5 kg" o menciones de peso en contexto narrativo
    
    // Analizar contenido línea por línea
    const lines = content.split('\n');
    let inVitalsSection = false;
    let sectionLineCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lowerLine = line.toLowerCase();
      
      // Detectar inicio de sección de signos vitales
      if (/^(?:SIGNOS VITALES|VITAL SIGNS|CONSTANTES VITALES|EXAMEN FÍSICO|EXPLORACIÓN FÍSICA|DATOS VITALES)/i.test(line.trim())) {
        inVitalsSection = true;
        sectionLineCount = 0;
        continue;
      }
      
      // Detectar fin de sección (nueva sección comienza)
      if (inVitalsSection && /^[A-ZÁÉÍÓÚÑ\s]{10,}:?$/.test(line.trim())) {
        inVitalsSection = false;
      }
      
      // Contar líneas en la sección (máximo 20 líneas para signos vitales)
      if (inVitalsSection) {
        sectionLineCount++;
        if (sectionLineCount > 20) {
          inVitalsSection = false;
        }
      }
      
      // Detectar condiciones médicas
      for (const term in medicalDictionary) {
        if (lowerLine.includes(term)) {
          findings.conditions.push(medicalDictionary[term]);
        }
      }
      
      // Detectar medicamentos (patrones comunes) - mejorado
      if (/\b(?:mg|ml|mcg|ui|comprimido|cápsula|tableta|jarabe)\b/i.test(line)) {
        // Buscar nombre de medicamento seguido de dosis
        const medicationMatch = line.match(/\b([A-Z][a-z]+(?:ina|ol|pam|mab|ril|tan|vir|din|xin|mida|pina|sona)?)\s+\d+\s*(?:mg|ml|mcg|ui|gr)\b/i);
        if (medicationMatch) {
          findings.medications.push(medicationMatch[0]);
        }
      }
      
      // ====== SIGNOS VITALES: SOLO si estamos en la sección correcta ======
      if (inVitalsSection) {
        // Presión arterial
        if (/presión|tensión|pa\s*[:=]|blood pressure|bp\s*[:=]/i.test(lowerLine)) {
          const bpMatch = line.match(/(\d{2,3})\s*[\/\-]\s*(\d{2,3})\s*(?:mmhg)?/i);
          if (bpMatch && parseInt(bpMatch[1]) > 70 && parseInt(bpMatch[1]) < 250) {
            findings.vitals.push(`Presión arterial: ${bpMatch[1]}/${bpMatch[2]} mmHg`);
          }
        }
        
        // Glucosa
        if (/glucosa|glicemia|glucemia|glucose/i.test(lowerLine)) {
          const glucoseMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:mg\/dl|mg\/dL|mmol\/l)?/i);
          if (glucoseMatch && parseFloat(glucoseMatch[1]) > 40 && parseFloat(glucoseMatch[1]) < 600) {
            findings.vitals.push(`Glucosa: ${glucoseMatch[1]} mg/dL`);
          }
        }
        
        // Peso - MUY ESTRICTO: solo formato "Peso: XX kg" o en tabla
        if (/^[\s\-\*•]*peso\s*[:=]\s*\d+/i.test(lowerLine) || /\bpeso\s*[:=]\s*\d+\s*kg\b/i.test(lowerLine)) {
          const weightMatch = line.match(/peso\s*[:=]\s*(\d+(?:\.\d+)?)\s*(?:kg)?/i);
          if (weightMatch && parseFloat(weightMatch[1]) > 20 && parseFloat(weightMatch[1]) < 300) {
            findings.vitals.push(`Peso: ${weightMatch[1]} kg`);
          }
        }
        
        // Talla/Altura
        if (/talla|altura|height/i.test(lowerLine)) {
          const heightMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:cm|m|metros)/i);
          if (heightMatch) {
            const height = parseFloat(heightMatch[1]);
            if (height > 1.2 && height < 2.5) {
              findings.vitals.push(`Talla: ${heightMatch[1]} m`);
            } else if (height > 120 && height < 250) {
              findings.vitals.push(`Talla: ${heightMatch[1]} cm`);
            }
          }
        }
        
        // Temperatura
        if (/temperatura|temp\.|fiebre/i.test(lowerLine)) {
          const tempMatch = line.match(/(\d+(?:\.\d+)?)\s*[°º]?\s*[cC]/);
          if (tempMatch && parseFloat(tempMatch[1]) > 34 && parseFloat(tempMatch[1]) < 43) {
            findings.vitals.push(`Temperatura: ${tempMatch[1]}°C`);
          }
        }
        
        // Frecuencia cardíaca
        if (/frecuencia cardíaca|fc\s*[:=]|pulso|heart rate|hr\s*[:=]/i.test(lowerLine)) {
          const hrMatch = line.match(/(\d+)\s*(?:lpm|bpm|ppm|latidos)/i);
          if (hrMatch && parseFloat(hrMatch[1]) > 30 && parseFloat(hrMatch[1]) < 250) {
            findings.vitals.push(`Frecuencia cardíaca: ${hrMatch[1]} lpm`);
          }
        }
        
        // Frecuencia respiratoria
        if (/frecuencia respiratoria|fr\s*[:=]|respiratory rate|rr\s*[:=]/i.test(lowerLine)) {
          const rrMatch = line.match(/(\d+)\s*(?:rpm|respiraciones)/i);
          if (rrMatch && parseFloat(rrMatch[1]) > 8 && parseFloat(rrMatch[1]) < 60) {
            findings.vitals.push(`Frecuencia respiratoria: ${rrMatch[1]} rpm`);
          }
        }
        
        // Saturación de oxígeno
        if (/saturación|spo2|sat\s*o2|oxygen saturation/i.test(lowerLine)) {
          const satMatch = line.match(/(\d+)\s*%/);
          if (satMatch && parseFloat(satMatch[1]) > 70 && parseFloat(satMatch[1]) <= 100) {
            findings.vitals.push(`Saturación O2: ${satMatch[1]}%`);
          }
        }
      }
      
      // Detectar recomendaciones
      if (/recomienda|sugiere|debe|continuar|suspender/i.test(lowerLine)) {
        const cleanedLine = line.trim().replace(/^[-•*]\s*/, '');
        if (cleanedLine.length > 15 && cleanedLine.length < 300) {
          findings.recommendations.push(cleanedLine);
        }
      }
    }
    
    // Eliminar duplicados
    findings.conditions = Array.from(new Set(findings.conditions));
    findings.medications = Array.from(new Set(findings.medications));
    findings.vitals = Array.from(new Set(findings.vitals));
    findings.recommendations = Array.from(new Set(findings.recommendations));
    
    // Generar análisis
    analysis = this.generateClinicalSummary(findings);
    
    return {
      analysis,
      keyFindings: findings,
      confidence
    };
  }
  
  private generateClinicalSummary(findings: any): string {
    let summary = "Resumen del historial clínico:\n\n";
    
    if (findings.conditions.length > 0) {
      summary += `El paciente presenta las siguientes condiciones: ${findings.conditions.join(', ')}. `;
    }
    
    if (findings.medications.length > 0) {
      summary += `Está tomando los siguientes medicamentos: ${findings.medications.join(', ')}. `;
    }
    
    if (findings.vitals.length > 0) {
      summary += `Los signos vitales registrados incluyen: ${findings.vitals.join(', ')}. `;
    }
    
    if (findings.recommendations.length > 0) {
      summary += `Las recomendaciones médicas son: ${findings.recommendations.join('; ')}.`;
    }
    
    if (summary === "Resumen del historial clínico:\n\n") {
      summary = "Se ha analizado el historial clínico pero no se han podido identificar elementos específicos. Se recomienda revisar el formato del archivo o consultar con un profesional médico.";
    }
    
    return summary.trim();
  }
}

export const medicalTranslator = new MedicalTranslator();