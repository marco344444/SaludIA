# 🏗️ Diagrama de Clases - SaludIA (MediTranslate)

## Visualización del Diagrama

Este diagrama se renderiza automáticamente en:
- ✅ GitHub
- ✅ VS Code (con extensión Markdown Preview Mermaid Support)
- ✅ GitLab
- ✅ Notion
- ✅ [Mermaid Live Editor](https://mermaid.live/)

---

## 📊 Diagrama de Clases Completo

```mermaid
classDiagram
    %% ========== CAPA DE DATOS (DATABASE SCHEMA) ==========
    
    class User {
        +String id
        +String email
        +String password
        +String fullName
        +String role
        +Boolean isVerified
        +DateTime createdAt
        +DateTime updatedAt
        +DateTime lastLogin
    }
    
    class Diagnosis {
        +String id
        +String userId
        +String originalText
        +String translatedText
        +Integer confidence
        +DateTime createdAt
    }
    
    class HealthRecord {
        +String id
        +String userId
        +String patientName
        +Integer age
        +Array~String~ conditions
        +Object vitalSigns
        +Array~Object~ medications
        +DateTime createdAt
        +DateTime updatedAt
    }
    
    class ClinicalAnalysis {
        +String id
        +String userId
        +String fileName
        +String fileType
        +String originalContent
        +String analysis
        +Object keyFindings
        +Integer confidence
        +DateTime createdAt
    }
    
    class QuickTranslation {
        +String id
        +String medical
        +String simple
        +String category
    }
    
    %% ========== CAPA DE LÓGICA DE NEGOCIO (BACKEND SERVICES) ==========
    
    class MedicalTranslator {
        -Map~String,String~ medicalDictionary
        -Array~Pattern~ medicalPatterns
        +translate(diagnosticText: String) MedicalTranslation
        +analyzeClinicalFile(content: String, fileType: String) ClinicalAnalysisResult
        -analyzeContext(text: String) Array~String~
        -extractMedicalTerms(text: String) Array~String~
        -postProcess(text: String) String
        -generateClinicalSummary(findings: Object) String
    }
    
    class MedicalTranslation {
        +String translatedText
        +Integer confidence
        +Array~String~ identifiedTerms
    }
    
    class ClinicalAnalysisResult {
        +String analysis
        +Object keyFindings
        +Integer confidence
    }
    
    class KeyFindings {
        +Array~String~ conditions
        +Array~String~ medications
        +Array~String~ vitals
        +Array~String~ recommendations
    }
    
    class IStorage {
        <<interface>>
        +createUser(data: InsertUser) User
        +getUser(id: String) User
        +getUserByEmail(email: String) User
        +updateUserLastLogin(id: String) User
        +createDiagnosis(data: InsertDiagnosis, userId?: String) Diagnosis
        +getDiagnoses() Array~Diagnosis~
        +getDiagnosis(id: String) Diagnosis
        +createHealthRecord(data: InsertHealthRecord) HealthRecord
        +getHealthRecordByUser(userId: String) HealthRecord
        +updateHealthRecord(id: String, data: Partial~HealthRecord~) HealthRecord
        +createClinicalAnalysis(data: InsertClinicalAnalysis) ClinicalAnalysis
        +getClinicalAnalyses() Array~ClinicalAnalysis~
        +getClinicalAnalysis(id: String) ClinicalAnalysis
        +getQuickTranslations() Array~QuickTranslation~
    }
    
    class MemStorage {
        -Map~String,User~ users
        -Map~String,Diagnosis~ diagnoses
        -Map~String,HealthRecord~ healthRecords
        -Map~String,ClinicalAnalysis~ clinicalAnalyses
        -Map~String,QuickTranslation~ quickTranslations
        +createUser(data: InsertUser) User
        +getUser(id: String) User
        +getUserByEmail(email: String) User
        +updateUserLastLogin(id: String) User
        +createDiagnosis(data: InsertDiagnosis, userId?: String) Diagnosis
        +getDiagnoses() Array~Diagnosis~
        +getDiagnosis(id: String) Diagnosis
        +createHealthRecord(data: InsertHealthRecord) HealthRecord
        +getHealthRecordByUser(userId: String) HealthRecord
        +updateHealthRecord(id: String, data: Partial~HealthRecord~) HealthRecord
        +createClinicalAnalysis(data: InsertClinicalAnalysis) ClinicalAnalysis
        +getClinicalAnalyses() Array~ClinicalAnalysis~
        +getClinicalAnalysis(id: String) ClinicalAnalysis
        +getQuickTranslations() Array~QuickTranslation~
    }
    
    class AuthService {
        <<service>>
        +generateToken(user: UserPayload) String
        +authenticateToken(req: Request, res: Response, next: Function) void
        +optionalAuth(req: Request, res: Response, next: Function) void
    }
    
    %% ========== CAPA DE API (EXPRESS ROUTES) ==========
    
    class ExpressApp {
        <<controller>>
        +POST /api/auth/register
        +POST /api/auth/login
        +GET /api/auth/me
        +POST /api/translate
        +GET /api/diagnoses
        +GET /api/diagnoses/:id
        +GET /api/quick-translations
        +GET /api/health-record
        +PATCH /api/health-record/:id
        +POST /api/upload-clinical-file
        +GET /api/clinical-analyses
        +GET /api/clinical-analyses/:id
    }
    
    class MulterUpload {
        <<middleware>>
        +dest: String
        +fileFilter: Function
        +limits: Object
        +single(fieldName: String) Middleware
    }
    
    %% ========== CAPA DE PRESENTACIÓN (REACT HOOKS) ==========
    
    class useTranslations {
        <<hook>>
        +translationHistory: Query~Array~Diagnosis~~
        +quickTranslations: Query~Array~QuickTranslation~~
        +createTranslation: Mutation
    }
    
    class useHealthData {
        <<hook>>
        +healthRecord: Query~HealthRecord~
        +updateHealthRecord: Mutation
    }
    
    class useClinicalAnalysis {
        <<hook>>
        +clinicalAnalyses: Query~Array~ClinicalAnalysis~~
        +uploadFile: Mutation
    }
    
    class useAuth {
        <<hook>>
        +user: User|null
        +isAuthenticated: Boolean
        +login: Mutation
        +register: Mutation
        +logout: Function
    }
    
    %% ========== COMPONENTES REACT ==========
    
    class TranslationForm {
        <<component>>
        -state: FormState
        +onSubmit(data: TranslationFormData) void
        +render() JSX
    }
    
    class HealthDashboard {
        <<component>>
        -healthRecord: HealthRecord
        +render() JSX
    }
    
    class FileUpload {
        <<component>>
        -selectedFile: File|null
        +onFileSelect(file: File) void
        +onUpload() void
        +render() JSX
    }
    
    class HistoryTab {
        <<component>>
        -diagnoses: Array~Diagnosis~
        -analyses: Array~ClinicalAnalysis~
        +render() JSX
    }
    
    class HomePage {
        <<component>>
        +render() JSX
    }
    
    %% ========== RELACIONES ==========
    
    %% Relaciones de Base de Datos
    User "1" --> "0..*" Diagnosis : tiene
    User "1" --> "0..1" HealthRecord : tiene
    User "1" --> "0..*" ClinicalAnalysis : tiene
    
    %% Relaciones de Servicios Backend
    MedicalTranslator ..> MedicalTranslation : produce
    MedicalTranslator ..> ClinicalAnalysisResult : produce
    ClinicalAnalysisResult *-- KeyFindings : contiene
    
    IStorage <|.. MemStorage : implementa
    
    ExpressApp --> MedicalTranslator : usa
    ExpressApp --> IStorage : usa
    ExpressApp --> AuthService : usa
    ExpressApp --> MulterUpload : usa
    
    %% Relaciones de Hooks React
    useTranslations --> ExpressApp : consume API
    useHealthData --> ExpressApp : consume API
    useClinicalAnalysis --> ExpressApp : consume API
    useAuth --> ExpressApp : consume API
    
    %% Relaciones de Componentes React
    HomePage *-- TranslationForm : contiene
    HomePage *-- HealthDashboard : contiene
    HomePage *-- FileUpload : contiene
    HomePage *-- HistoryTab : contiene
    
    TranslationForm --> useTranslations : usa
    HealthDashboard --> useHealthData : usa
    FileUpload --> useClinicalAnalysis : usa
    HistoryTab --> useTranslations : usa
    HistoryTab --> useClinicalAnalysis : usa
    HomePage --> useAuth : usa
```

---

## 📊 Diagrama Simplificado (Para Presentaciones)

```mermaid
classDiagram
    %% VERSIÓN COMPACTA PARA DIAPOSITIVAS
    
    class User {
        +String id
        +String email
        +String fullName
        +String role
    }
    
    class Diagnosis {
        +String id
        +String originalText
        +String translatedText
        +Integer confidence
    }
    
    class HealthRecord {
        +String id
        +String patientName
        +Array conditions
        +Object vitalSigns
    }
    
    class ClinicalAnalysis {
        +String id
        +String fileName
        +String analysis
        +Object keyFindings
    }
    
    class MedicalTranslator {
        +translate(text) Result
        +analyzeClinicalFile(content, type) Analysis
    }
    
    class Storage {
        <<interface>>
        +createUser() User
        +createDiagnosis() Diagnosis
        +createHealthRecord() HealthRecord
        +createClinicalAnalysis() Analysis
    }
    
    class ExpressAPI {
        <<controller>>
        +POST /api/auth/register
        +POST /api/auth/login
        +POST /api/translate
        +POST /api/upload-clinical-file
        +GET /api/health-record
    }
    
    class ReactHooks {
        <<hooks>>
        +useTranslations()
        +useHealthData()
        +useClinicalAnalysis()
        +useAuth()
    }
    
    class ReactComponents {
        <<components>>
        +TranslationForm
        +HealthDashboard
        +FileUpload
        +HistoryTab
    }
    
    %% Relaciones simplificadas
    User "1" --> "*" Diagnosis
    User "1" --> "1" HealthRecord
    User "1" --> "*" ClinicalAnalysis
    
    ExpressAPI --> MedicalTranslator : usa
    ExpressAPI --> Storage : usa
    
    ReactHooks --> ExpressAPI : consume
    ReactComponents --> ReactHooks : usa
```

---

## 📝 Descripción de Capas

### 🗄️ Capa de Datos (Database Schema)
- **User**: Información de usuarios (pacientes, doctores)
- **Diagnosis**: Traducciones de diagnósticos médicos
- **HealthRecord**: Historial clínico del paciente
- **ClinicalAnalysis**: Análisis de archivos PDF/CSV
- **QuickTranslation**: Diccionario de traducciones rápidas

### ⚙️ Capa de Lógica de Negocio (Backend Services)
- **MedicalTranslator**: Algoritmo principal de traducción médica (basado en ClinicalBERT)
- **IStorage / MemStorage**: Interfaz y implementación de persistencia de datos
- **AuthService**: Autenticación y autorización con JWT

### 🌐 Capa de API (Express Routes)
- **ExpressApp**: Controlador principal con todos los endpoints REST
- **MulterUpload**: Middleware para manejo de archivos

### 🎨 Capa de Presentación (React)
- **Hooks**: `useTranslations`, `useHealthData`, `useClinicalAnalysis`, `useAuth`
- **Componentes**: `TranslationForm`, `HealthDashboard`, `FileUpload`, `HistoryTab`, `HomePage`

---

## 🔄 Flujo de Datos Principal

```mermaid
sequenceDiagram
    participant U as Usuario
    participant C as TranslationForm
    participant H as useTranslations
    participant A as ExpressApp
    participant M as MedicalTranslator
    participant S as MemStorage
    
    U->>C: Ingresa diagnóstico médico
    C->>H: createTranslation(originalText)
    H->>A: POST /api/translate
    A->>M: translate(originalText)
    M->>M: Analiza términos médicos
    M->>M: Aplica diccionario y patrones
    M-->>A: MedicalTranslation
    A->>S: createDiagnosis(data)
    S-->>A: Diagnosis
    A-->>H: Response JSON
    H-->>C: Actualiza UI
    C-->>U: Muestra traducción
```

---

## 🔐 Flujo de Autenticación

```mermaid
sequenceDiagram
    participant U as Usuario
    participant L as LoginForm
    participant A as useAuth
    participant E as ExpressApp
    participant Auth as AuthService
    participant S as MemStorage
    
    U->>L: Ingresa credenciales
    L->>A: login(email, password)
    A->>E: POST /api/auth/login
    E->>S: getUserByEmail(email)
    S-->>E: User
    E->>E: Verifica contraseña con bcrypt
    E->>Auth: generateToken(user)
    Auth-->>E: JWT Token
    E-->>A: {user, token}
    A->>A: Guarda token en localStorage
    A-->>L: Usuario autenticado
    L-->>U: Redirige a dashboard
```

---

## 📤 Flujo de Análisis de Archivos

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as FileUpload
    participant H as useClinicalAnalysis
    participant A as ExpressApp
    participant M as MulterUpload
    participant P as pdf-parse/papaparse
    participant MT as MedicalTranslator
    participant S as MemStorage
    
    U->>F: Selecciona archivo PDF/CSV
    F->>H: uploadFile(file)
    H->>A: POST /api/upload-clinical-file
    A->>M: Guarda archivo temporal
    M-->>A: File path
    alt Archivo PDF
        A->>P: pdf-parse(buffer)
        P-->>A: text content
    else Archivo CSV
        A->>P: readFileSync(path)
        P-->>A: csv content
    end
    A->>MT: analyzeClinicalFile(content, type)
    MT->>MT: Detecta signos vitales
    MT->>MT: Identifica medicamentos
    MT->>MT: Extrae recomendaciones
    MT-->>A: ClinicalAnalysisResult
    A->>S: createClinicalAnalysis(data)
    S-->>A: ClinicalAnalysis
    A->>A: Elimina archivo temporal
    A-->>H: Response JSON
    H-->>F: Actualiza UI
    F-->>U: Muestra análisis
```

---

## 🛠️ Herramientas para Visualizar

### 1. **VS Code** (Recomendado)
Instala la extensión:
```
Markdown Preview Mermaid Support
```

### 2. **Mermaid Live Editor**
Abre [mermaid.live](https://mermaid.live/) y pega el código del diagrama.

### 3. **GitHub**
GitHub renderiza automáticamente los diagramas Mermaid en archivos `.md`.

### 4. **PlantUML** (Alternativa)
Si prefieres PlantUML, puedo generar también ese formato.

---

## 📚 Leyenda de Símbolos

| Símbolo | Significado |
|---------|-------------|
| `+` | Método o propiedad pública |
| `-` | Método o propiedad privada |
| `<<interface>>` | Interfaz |
| `<<service>>` | Servicio |
| `<<controller>>` | Controlador |
| `<<component>>` | Componente React |
| `<<hook>>` | Hook de React |
| `-->` | Asociación |
| `*--` | Composición |
| `<|..` | Implementa interfaz |
| `..>` | Dependencia |

---

## 🎯 Patrones de Diseño Identificados

1. **Repository Pattern**: `IStorage` / `MemStorage`
2. **Strategy Pattern**: `MedicalTranslator` con diferentes algoritmos de análisis
3. **Middleware Pattern**: `MulterUpload`, `authenticateToken`
4. **Hook Pattern**: Custom hooks de React Query
5. **MVC Pattern**: Separación entre modelos, vistas (React) y controladores (Express)

---

**Generado automáticamente para el proyecto SaludIA (MediTranslate)**  
*Última actualización: 21 de octubre de 2025*
