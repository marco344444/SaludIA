# 🚀 Guía Completa: Deploy de SaludIA en Vercel

## 📋 Tabla de Contenidos
1. [Preparación del Proyecto](#preparación)
2. [Configurar Git y GitHub](#git-github)
3. [Deploy en Vercel](#deploy-vercel)
4. [Configuración de Base de Datos](#base-de-datos)
5. [Solución de Problemas](#troubleshooting)

---

## 🎯 Requisitos Previos

- ✅ Proyecto funcionando localmente (ya lo tienes)
- ✅ Cuenta de GitHub (gratuita)
- ✅ Cuenta de Vercel (gratuita)

**Tiempo estimado**: 15-20 minutos

---

## 📦 PASO 1: Preparación del Proyecto

### 1.1 Crear archivo .gitignore

Primero, necesitas decirle a Git qué archivos NO subir.

```powershell
cd "c:\Users\prada\Downloads\SaludIA\SaludIA"
```

Crea archivo `.gitignore` (ya está incluido abajo) con:

```gitignore
# Dependencias
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Build
dist/
dist-ssr/
.cache/
.vite/

# Env
.env
.env.local
.env.*.local
.env.production

# Uploads temporales
uploads/*
!uploads/.gitkeep

# Sistema
.DS_Store
Thumbs.db
*.log
*.swp
*.swo

# IDE
.vscode/
.idea/
*.sublime-project
*.sublime-workspace

# Testing
coverage/

# Windows
desktop.ini
```

### 1.2 Verificar package.json

Tu `package.json` debe tener estos scripts (ya los tienes):

```json
{
  "scripts": {
    "dev": "tsx watch server/index.ts",
    "build": "vite build",
    "start": "NODE_ENV=production tsx server/index.ts"
  }
}
```

### 1.3 Crear archivo vercel.json

Configura cómo Vercel manejará tu app:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

## 🐙 PASO 2: Configurar Git y GitHub

### 2.1 Instalar Git (si no lo tienes)

**Verifica si ya tienes Git**:
```powershell
git --version
```

Si dice "git version X.X.X", ya lo tienes. Si no:
1. Descarga: https://git-scm.com/download/win
2. Instala con opciones por defecto
3. Reinicia PowerShell

### 2.2 Configurar Git (primera vez)

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### 2.3 Crear Repositorio en GitHub

1. Ve a: https://github.com
2. Si no tienes cuenta, click "Sign up" (es gratis)
3. Una vez dentro, click en "+" arriba a la derecha → "New repository"
4. Configuración:
   - **Repository name**: `SaludIA`
   - **Description**: `Sistema de traducción médica IA con análisis de historias clínicas`
   - **Visibility**: Public o Private (tú decides)
   - ⚠️ **NO marques** "Add a README file"
   - ⚠️ **NO marques** "Add .gitignore"
   - Click "Create repository"

### 2.4 Subir tu Código a GitHub

GitHub te mostrará comandos. Usa estos (adaptados):

```powershell
cd "c:\Users\prada\Downloads\SaludIA\SaludIA"

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "🎉 Initial commit: SaludIA v1.2.0 con análisis mejorado"

# Cambiar rama a main (GitHub usa 'main' ahora)
git branch -M main

# Conectar con GitHub (REEMPLAZA con tu URL)
git remote add origin https://github.com/TU_USUARIO/SaludIA.git

# Subir a GitHub
git push -u origin main
```

**Ejemplo real**:
Si tu usuario de GitHub es "juanperez":
```powershell
git remote add origin https://github.com/juanperez/SaludIA.git
```

**Si te pide autenticación**:
- Usuario: tu usuario de GitHub
- Contraseña: ⚠️ NO uses tu contraseña de GitHub, usa un **Personal Access Token**

**Crear Token**:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "Generate new token (classic)"
3. Nombre: "Vercel Deploy"
4. Permisos: marca "repo"
5. "Generate token"
6. Copia el token (se muestra solo una vez)
7. Usa este token en lugar de tu contraseña

---

## ☁️ PASO 3: Deploy en Vercel

### 3.1 Crear Cuenta en Vercel

1. Ve a: https://vercel.com
2. Click "Sign Up"
3. **Importante**: Elige "Continue with GitHub" (más fácil)
4. Autoriza a Vercel acceder a tu GitHub

### 3.2 Importar Proyecto

Una vez dentro de Vercel:

1. Click "Add New..." → "Project"
2. En "Import Git Repository":
   - Verás tu repositorio `SaludIA`
   - Click "Import"

### 3.3 Configurar el Deploy

Vercel detectará automáticamente que es un proyecto Vite + Node.js:

**Framework Preset**: Vite
**Root Directory**: `./` (dejar vacío o punto)
**Build Command**: `npm run build` (autodetectado)
**Output Directory**: `dist` (autodetectado)
**Install Command**: `npm install` (autodetectado)

**Variables de Entorno** (opcional por ahora):
- Más adelante agregaremos DB_URL si usas PostgreSQL

Click "Deploy" 🚀

### 3.4 Esperar el Deploy

Vercel mostrará logs en tiempo real:
- ✅ Installing dependencies...
- ✅ Building...
- ✅ Deploying...

Toma ~2-3 minutos la primera vez.

### 3.5 ¡Listo!

Cuando termine, verás:
- 🎉 Confetti animado
- URL de tu app: `https://salud-ia-xxx.vercel.app`

Click en "Visit" para ver tu app en vivo.

---

## 🗄️ PASO 4: Base de Datos (Opcional)

Tu app actualmente usa `MemStorage` (memoria). Para persistencia real:

### Opción A: Vercel Postgres (Recomendado)

1. En tu proyecto de Vercel → "Storage" → "Create Database"
2. Selecciona "Postgres"
3. Región: Cerca de ti (ej: "Washington, D.C., USA")
4. Click "Create"
5. Vercel te da automáticamente:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - Variables ya conectadas

### Opción B: Neon (PostgreSQL Gratuito)

1. Ve a: https://neon.tech
2. "Sign up" con GitHub
3. Crea nuevo proyecto
4. Copia la connection string
5. En Vercel → Settings → Environment Variables:
   - `DB_URL`: tu connection string de Neon

### Actualizar Código para Producción

En `server/storage.ts`, la lógica ya está (usa MemStorage en desarrollo):

```typescript
// Ya está así en tu código:
const storage = process.env.NODE_ENV === 'production' 
  ? new DatabaseStorage()  // Si tienes DB configurada
  : new MemStorage();      // Para desarrollo
```

---

## 🔧 PASO 5: Configuración Post-Deploy

### 5.1 Dominio Personalizado (Opcional)

Si tienes un dominio (ej: `miapp.com`):

1. Vercel → Settings → Domains
2. Agrega tu dominio
3. Configura DNS según instrucciones

### 5.2 Variables de Entorno

Para agregar secrets:

1. Vercel → Settings → Environment Variables
2. Agrega:
   - `JWT_SECRET`: genera uno con `openssl rand -base64 32`
   - `DB_URL`: si usas base de datos externa

### 5.3 Actualizar Código

Cada vez que hagas cambios:

```powershell
git add .
git commit -m "✨ Descripción del cambio"
git push
```

Vercel detecta el push automáticamente y re-deploya (1-2 min).

---

## 🛠️ PASO 6: Ajustes para Vercel

### 6.1 Crear vercel.json (Configuración Avanzada)

Guarda este archivo en la raíz de tu proyecto:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 6.2 Modificar package.json

Asegúrate que tenga:

```json
{
  "scripts": {
    "dev": "tsx watch server/index.ts",
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "tsc -p tsconfig.json",
    "start": "node dist/server/index.js"
  }
}
```

**IMPORTANTE**: Tu proyecto ya tiene configuración Vite + Express integrada.
Vercel puede requerir ajustes según la estructura.

---

## ⚠️ PROBLEMAS COMUNES

### 1. Error: "Build failed"

**Síntoma**: Vercel no puede compilar

**Solución**:
```powershell
# Verifica que funciona localmente
npm run build

# Si hay errores, corrígelos primero
```

### 2. Error: "Cannot find module"

**Síntoma**: Importaciones no resueltas

**Solución**:
- Verifica todas las rutas de import
- Asegúrate que todos los paquetes estén en `dependencies` (no `devDependencies`)

```powershell
# Mover dependencias necesarias
npm install --save-prod tsx pdf-parse papaparse
```

### 3. Error: 404 en rutas

**Síntoma**: Rutas de React Router no funcionan

**Solución**: El `vercel.json` maneja esto con rewrites a `/index.html`

### 4. API no responde

**Síntoma**: `/api/*` devuelve 404

**Solución**: 
- Verifica que `server/index.ts` exporta el handler para Vercel
- Puede requerir serverless functions

### 5. Uploads no funcionan

**Síntoma**: Archivos no se guardan

**Solución**: 
Vercel es **serverless** (sin disco persistente). Opciones:
- Usar Vercel Blob Storage
- Usar AWS S3
- Usar Cloudinary

---

## 📊 Alternativa: Deploy como Serverless Functions

Si prefieres arquitectura serverless completa:

### Estructura de Carpetas

```
/api
  /translate.ts
  /upload-clinical-file.ts
  /auth.ts
/dist (build del frontend)
```

Cada archivo en `/api` es una función independiente.

---

## 🎯 Checklist Final

Antes de hacer deploy:

- [ ] Código funciona localmente (`npm run dev`)
- [ ] Build funciona (`npm run build`)
- [ ] `.gitignore` creado
- [ ] Git inicializado
- [ ] Código en GitHub
- [ ] Cuenta de Vercel creada
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas (si es necesario)
- [ ] Deploy exitoso
- [ ] App accesible en la URL de Vercel

---

## 🚀 Comandos Rápidos (Resumen)

```powershell
# 1. Preparar Git
cd "c:\Users\prada\Downloads\SaludIA\SaludIA"
git init
git add .
git commit -m "🎉 Initial commit"

# 2. Subir a GitHub
git branch -M main
git remote add origin https://github.com/TU_USUARIO/SaludIA.git
git push -u origin main

# 3. Ir a Vercel
# https://vercel.com → Import Project → Deploy

# 4. Actualizar después de cambios
git add .
git commit -m "✨ Cambio X"
git push
```

---

## 📱 Bonus: PWA en Vercel

Tu app ya tiene:
- ✅ `manifest.json`
- ✅ `service-worker.js`

Vercel sirve estos archivos automáticamente. Tu PWA funcionará en:
- 🌐 Web (cualquier navegador)
- 📱 Android (instalar desde Chrome)
- 🍎 iOS (agregar a pantalla de inicio)

---

## 🔗 URLs Importantes

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repos**: https://github.com/TU_USUARIO?tab=repositories
- **Vercel Docs**: https://vercel.com/docs
- **Neon (DB gratis)**: https://neon.tech

---

## 💡 Tips Pro

1. **Dominios gratis de Vercel**: 
   - `tu-app.vercel.app` (gratis siempre)
   - Puedes personalizar: `salud-ia.vercel.app`

2. **Preview Deployments**:
   - Cada commit a una rama genera preview único
   - Ideal para probar cambios antes de production

3. **Analytics**:
   - Vercel → Analytics (tab)
   - Ve visitas, performance, etc. (gratis hasta 100k requests/mes)

4. **Logs en tiempo real**:
   - Vercel → Functions → Logs
   - Debugging de errores en producción

5. **Rollback fácil**:
   - Vercel → Deployments
   - Click en deploy anterior → "Promote to Production"

---

## ✅ Resultado Final

Después de seguir esta guía tendrás:

✅ Código en GitHub (control de versiones)  
✅ App en vivo en `https://tu-app.vercel.app`  
✅ HTTPS automático (certificado SSL gratis)  
✅ Deploy automático en cada `git push`  
✅ PWA instalable en móviles  
✅ Analytics básicos  
✅ CDN global (carga rápida en todo el mundo)  

**Todo GRATIS** con el plan Hobby de Vercel (suficiente para proyectos personales).

---

**Fecha**: Octubre 20, 2025  
**Proyecto**: SaludIA v1.2.0  
**Plataforma**: Vercel  
**Estado**: 📝 Guía completa lista
