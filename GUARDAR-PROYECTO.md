# 📦 Guía Completa: Cómo Guardar y Compartir tu Proyecto SaludIA

## 🎯 Métodos Según tu Objetivo

---

## 1. 💾 RESPALDO RÁPIDO (ZIP)

### ✅ Ventajas
- Rápido y simple
- No requiere herramientas adicionales
- Funciona offline
- Ideal para transferir entre PCs

### ⚠️ IMPORTANTE: Excluir node_modules

**NO comprimas con node_modules** → Pesa ~300 MB y es innecesario

### 📋 Método Manual (Recomendado)

**Paso 1**: Crea una carpeta temporal
```powershell
New-Item -Path "c:\Users\prada\Downloads\SaludIA-Para-Comprimir" -ItemType Directory -Force
```

**Paso 2**: Copia solo los archivos necesarios
```powershell
$origen = "c:\Users\prada\Downloads\SaludIA\SaludIA"
$destino = "c:\Users\prada\Downloads\SaludIA-Para-Comprimir"

# Copiar archivos importantes (excluye node_modules y dist)
Copy-Item "$origen\client" -Destination "$destino\client" -Recurse -Force
Copy-Item "$origen\server" -Destination "$destino\server" -Recurse -Force
Copy-Item "$origen\shared" -Destination "$destino\shared" -Recurse -Force
Copy-Item "$origen\*.json" -Destination "$destino\" -Force
Copy-Item "$origen\*.ts" -Destination "$destino\" -Force
Copy-Item "$origen\*.js" -Destination "$destino\" -Force
Copy-Item "$origen\*.md" -Destination "$destino\" -Force
```

**Paso 3**: Comprimir
```powershell
$fecha = Get-Date -Format 'yyyy-MM-dd_HH-mm'
Compress-Archive -Path "c:\Users\prada\Downloads\SaludIA-Para-Comprimir\*" -DestinationPath "c:\Users\prada\Downloads\SaludIA-Backup-$fecha.zip" -Force
```

**Paso 4**: Limpiar carpeta temporal
```powershell
Remove-Item "c:\Users\prada\Downloads\SaludIA-Para-Comprimir" -Recurse -Force
```

### 🚀 Script Automático (Corre TODO de una vez)

Guarda esto como `crear-backup.ps1` en la carpeta del proyecto:

```powershell
# ====== SCRIPT DE BACKUP AUTOMÁTICO ======
$proyectoPath = "c:\Users\prada\Downloads\SaludIA\SaludIA"
$tempPath = "c:\Users\prada\Downloads\SaludIA-Temp-Backup"
$fecha = Get-Date -Format 'yyyy-MM-dd_HH-mm'
$zipPath = "c:\Users\prada\Downloads\SaludIA-Backup-$fecha.zip"

Write-Host "📦 Creando backup de SaludIA..." -ForegroundColor Cyan

# Crear carpeta temporal
New-Item -Path $tempPath -ItemType Directory -Force | Out-Null

# Copiar archivos necesarios
Write-Host "📂 Copiando archivos..." -ForegroundColor Yellow
Copy-Item "$proyectoPath\client" -Destination "$tempPath\client" -Recurse -Force
Copy-Item "$proyectoPath\server" -Destination "$tempPath\server" -Recurse -Force
Copy-Item "$proyectoPath\shared" -Destination "$tempPath\shared" -Recurse -Force
Copy-Item "$proyectoPath\*.json" -Destination "$tempPath\" -Force
Copy-Item "$proyectoPath\*.ts" -Destination "$tempPath\" -Force
Copy-Item "$proyectoPath\*.js" -Destination "$tempPath\" -Force
Copy-Item "$proyectoPath\*.md" -Destination "$tempPath\" -Force

# Comprimir
Write-Host "🗜️ Comprimiendo..." -ForegroundColor Yellow
Compress-Archive -Path "$tempPath\*" -DestinationPath $zipPath -Force

# Limpiar
Write-Host "🧹 Limpiando archivos temporales..." -ForegroundColor Yellow
Remove-Item $tempPath -Recurse -Force

# Calcular tamaño
$tamano = [math]::Round((Get-Item $zipPath).Length / 1MB, 2)

Write-Host "✅ Backup creado exitosamente!" -ForegroundColor Green
Write-Host "📍 Ubicación: $zipPath" -ForegroundColor Cyan
Write-Host "📊 Tamaño: $tamano MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para restaurar en otra PC:" -ForegroundColor White
Write-Host "  1. Descomprime el ZIP" -ForegroundColor Gray
Write-Host "  2. Abre terminal en la carpeta" -ForegroundColor Gray
Write-Host "  3. Ejecuta: npm install" -ForegroundColor Gray
Write-Host "  4. Ejecuta: npm run dev" -ForegroundColor Gray
```

**Uso**:
```powershell
cd "c:\Users\prada\Downloads\SaludIA\SaludIA"
.\crear-backup.ps1
```

---

## 2. 🔄 CONTROL DE VERSIONES (Git + GitHub) ⭐ RECOMENDADO

### ✅ Ventajas
- Historial completo de cambios
- Sincronización automática
- Colaboración fácil
- Backup en la nube GRATIS
- Profesional

### 📋 Configuración Inicial (Solo una vez)

**Paso 1**: Instala Git (si no lo tienes)
- Descarga: https://git-scm.com/download/win
- Instala con opciones por defecto

**Paso 2**: Configura tu identidad
```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

**Paso 3**: Crea cuenta en GitHub
- Ve a: https://github.com/signup
- Es gratis

**Paso 4**: Crea repositorio nuevo en GitHub
- Click en "New repository"
- Nombre: `SaludIA`
- Descripción: "Sistema de traducción médica y análisis de historias clínicas con IA"
- Privado o Público (tú decides)
- NO marques "Initialize with README"

**Paso 5**: Inicializa Git en tu proyecto
```powershell
cd "c:\Users\prada\Downloads\SaludIA\SaludIA"

# Inicializar repositorio
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "🎉 Versión inicial de SaludIA con análisis mejorado"

# Conectar con GitHub (reemplaza TU_USUARIO y TU_REPO)
git remote add origin https://github.com/TU_USUARIO/SaludIA.git

# Subir al repositorio
git push -u origin main
```

### 🔄 Uso Diario de Git

**Después de hacer cambios:**
```powershell
# Ver qué cambió
git status

# Guardar cambios
git add .
git commit -m "✨ Descripción de los cambios"

# Subir a GitHub
git push
```

**Para descargar en otra PC:**
```powershell
git clone https://github.com/TU_USUARIO/SaludIA.git
cd SaludIA
npm install
npm run dev
```

### 📝 Crear .gitignore (Importante)

Crea archivo `.gitignore` en la raíz del proyecto:

```gitignore
# Dependencias
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build
dist/
.cache/
.vite/

# Env
.env
.env.local
.env.production

# Uploads temporales
uploads/*
!uploads/.gitkeep

# Sistema
.DS_Store
Thumbs.db
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo
```

Esto evita subir archivos innecesarios a GitHub.

---

## 3. ☁️ PUBLICAR EN PRODUCCIÓN

### Opción A: Vercel (Más Fácil) ⭐

**Ventajas**: 
- Deploy automático desde GitHub
- HTTPS gratis
- Dominio gratis (.vercel.app)
- Sin configuración compleja

**Pasos**:
1. Sube tu código a GitHub (ver método 2)
2. Ve a: https://vercel.com
3. "Import Project" → Selecciona tu repo GitHub
4. Vercel detecta automáticamente Vite
5. Click "Deploy"
6. ¡Listo! Tu app está en: `https://salud-ia.vercel.app`

### Opción B: Railway

Similar a Vercel, soporta base de datos PostgreSQL incluida.

### Opción C: APK para Android

Ya tienes la guía en `CONVERTIR-A-APK.md`:
1. `npm run build`
2. Hostea en Vercel/Railway
3. PWABuilder.com → Genera APK

---

## 4. 📤 COMPARTIR POR GOOGLE DRIVE / ONEDRIVE

**Paso 1**: Crea el ZIP (sin node_modules)
```powershell
# Usar el script crear-backup.ps1 de arriba
.\crear-backup.ps1
```

**Paso 2**: Sube a Google Drive
- Arrastra el ZIP a Google Drive
- Click derecho → "Obtener enlace"
- Comparte el enlace

**Paso 3**: La otra persona descarga
- Descomprime
- `npm install`
- `npm run dev`

---

## 📊 Comparación de Métodos

| Método | Tamaño | Tiempo | Colaboración | Historial | Costo |
|--------|--------|--------|--------------|-----------|-------|
| **ZIP** | ~5 MB* | 1 min | ❌ | ❌ | Gratis |
| **Git/GitHub** | ~5 MB* | 5 min setup | ✅ | ✅ | Gratis |
| **Vercel** | N/A | 10 min | ✅ | ✅ | Gratis |
| **Google Drive** | ~5 MB* | 2 min | ⚠️ Manual | ❌ | Gratis |

*Sin node_modules. Con node_modules: ~300 MB

---

## 🎯 Recomendación Según tu Caso

### 🏃 Si tienes prisa (backup rápido):
```powershell
.\crear-backup.ps1
```
→ Te genera ZIP listo en 1 minuto

### 👨‍💻 Si eres desarrollador (recomendado):
```powershell
git init
git add .
git commit -m "Initial commit"
# Sube a GitHub
```
→ Control de versiones profesional

### 🌐 Si quieres compartir la app funcionando:
1. Sube a GitHub
2. Deploy en Vercel
3. Comparte el link: `https://tu-app.vercel.app`

### 📱 Si quieres app Android:
1. GitHub → Vercel
2. PWABuilder.com
3. Genera APK

---

## 📋 Checklist para Backup Completo

Asegúrate de incluir:

- [ ] `client/` (código frontend)
- [ ] `server/` (código backend)
- [ ] `shared/` (esquemas compartidos)
- [ ] `package.json` (dependencias)
- [ ] `tsconfig.json` (configuración TypeScript)
- [ ] `vite.config.ts` (configuración Vite)
- [ ] `drizzle.config.ts` (configuración DB)
- [ ] `tailwind.config.ts` (estilos)
- [ ] `components.json` (UI components)
- [ ] Todos los `.md` (documentación)
- [ ] `client/public/` (manifest, service-worker, iconos)

**NO incluir**:
- ❌ `node_modules/` (se reinstala con npm install)
- ❌ `dist/` (se genera con npm run build)
- ❌ `.vite/` (cache)
- ❌ `uploads/` (archivos temporales)

---

## 🆘 Restaurar desde Backup

### Desde ZIP:
```powershell
# 1. Descomprime el ZIP
Expand-Archive -Path "SaludIA-Backup-2025-10-20.zip" -DestinationPath "C:\Proyectos\SaludIA"

# 2. Instala dependencias
cd "C:\Proyectos\SaludIA"
npm install

# 3. Ejecuta
npm run dev
```

### Desde GitHub:
```powershell
# 1. Clona el repositorio
git clone https://github.com/TU_USUARIO/SaludIA.git
cd SaludIA

# 2. Instala dependencias
npm install

# 3. Ejecuta
npm run dev
```

---

## 💡 Tips Finales

1. **Backups regulares**: Crea un backup antes de cambios grandes
2. **Git commits frecuentes**: Guarda tu progreso cada vez que algo funcione
3. **Documentación**: Mantén los `.md` actualizados con cambios importantes
4. **Testing antes de backup**: Asegúrate que todo funcione antes de guardar
5. **Múltiples backups**: ZIP local + GitHub + Google Drive = tranquilidad

---

## 🎓 Recursos Adicionales

- **Git Básico**: https://git-scm.com/book/es/v2
- **GitHub Desktop** (interfaz gráfica): https://desktop.github.com
- **Vercel Docs**: https://vercel.com/docs
- **PWA Builder**: https://www.pwabuilder.com

---

**Fecha**: Octubre 20, 2025  
**Proyecto**: SaludIA v1.2.0  
**Estado**: ✅ Listo para guardar
