# 🚀 Guía Completa: Deploy en Render.com

## 📋 Prerrequisitos

✅ Cuenta en GitHub (para conectar tu código)  
✅ Cuenta en Render.com (gratis)  
✅ Tu proyecto funcionando localmente  

---

## 🎯 Paso 1: Preparar tu Código para GitHub

### Opción A: Si ya tienes Git configurado

```powershell
# Verifica el estado
git status

# Agrega todos los cambios
git add .

# Commit
git commit -m "Preparar para deploy en Render"

# Push a GitHub
git push origin main
```

### Opción B: Si NO tienes Git configurado

```powershell
# 1. Inicializa Git
cd "C:\Users\marco\Downloads\SaludIA-main\SaludIA-main"
git init

# 2. Crea .gitignore
# (Ya deberías tenerlo, si no, créalo)

# 3. Agrega archivos
git add .

# 4. Primer commit
git commit -m "Initial commit - SaludIA Medical Translator"

# 5. Ve a GitHub.com y crea un nuevo repositorio
# Nombre: saludia-medical-translator
# Descripción: AI-powered medical translator for patients
# Público o Privado (tu elección)

# 6. Conecta tu repositorio local con GitHub
git remote add origin https://github.com/TU-USUARIO/saludia-medical-translator.git

# 7. Push
git branch -M main
git push -u origin main
```

---

## 🌐 Paso 2: Crear Cuenta en Render

1. **Ve a:** https://render.com
2. **Click en:** "Get Started" o "Sign Up"
3. **Opciones:**
   - Registrarte con GitHub (RECOMENDADO - más rápido)
   - Registrarte con Google
   - Email y contraseña

4. **Verifica tu email** si usas email/contraseña

---

## 🚀 Paso 3: Crear Web Service en Render

### 3.1 Desde el Dashboard

1. **Click en:** "New +" (esquina superior derecha)
2. **Selecciona:** "Web Service"

### 3.2 Conectar Repositorio

**Opción A: Si conectaste GitHub**
- Render mostrará tus repositorios
- Busca: `saludia-medical-translator`
- Click en "Connect"

**Opción B: Usar Git URL**
- Click en "Public Git repository"
- Pega: `https://github.com/TU-USUARIO/saludia-medical-translator.git`
- Click en "Continue"

### 3.3 Configuración del Servicio

Completa el formulario con estos valores:

```
┌─────────────────────────────────────────────────┐
│ Name: saludia                                   │
│ (o cualquier nombre sin espacios)              │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Region: Oregon (US West)                        │
│ (o el más cercano a tu ubicación)              │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Branch: main                                    │
│ (o master, según tu repo)                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Root Directory: (dejar vacío)                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Environment: Node                               │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Build Command:                                  │
│ npm install && npm run build                    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Start Command:                                  │
│ npm start                                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Instance Type: Free                             │
│ (Suficiente para empezar)                      │
└─────────────────────────────────────────────────┘
```

### 3.4 Variables de Entorno (Opcional)

Click en "Advanced" para agregar variables:

```
NODE_ENV=production
```

**No necesitas configurar PORT** - Render lo hace automáticamente

### 3.5 Deploy!

1. **Click en:** "Create Web Service"
2. **Espera:** 3-5 minutos mientras Render:
   - ⬇️ Clona tu repositorio
   - 📦 Instala dependencias (`npm install`)
   - 🔨 Construye tu app (`npm run build`)
   - 🚀 Inicia el servidor (`npm start`)

---

## 📊 Paso 4: Monitorear el Deploy

### Durante el Deploy verás:

```
==> Cloning from https://github.com/...
==> Running 'npm install'
==> Running 'npm run build'
    > Building client...
    > Building server...
==> Running 'npm start'
==> Your service is live 🎉
```

### Posibles Problemas y Soluciones:

#### ❌ Error: "Build failed"
```bash
# Solución: Verifica localmente
npm run build
```
Si funciona local, el problema puede ser de memoria. Considera:
- Upgrade a plan Starter ($7/mes con más RAM)
- O simplifica el build

#### ❌ Error: "Application failed to respond"
```bash
# Problema: El puerto no está configurado correctamente
# Solución: Verifica server/index.ts
```
Tu código debería tener:
```typescript
const port = parseInt(process.env.PORT || '5000', 10);
```

#### ❌ Error: "Module not found"
```bash
# Solución: Verifica que todas las dependencias estén en package.json
npm install
```

---

## ✅ Paso 5: Verificar que Funciona

### Tu app estará disponible en:
```
https://saludia.onrender.com
```
(O el nombre que elegiste)

### Prueba estas URLs:

1. **Frontend:**
   ```
   https://saludia.onrender.com
   ```
   Deberías ver la página de login

2. **API Health Check:**
   ```
   https://saludia.onrender.com/api/diagnoses
   ```
   Deberías ver `[]` (array vacío)

3. **Login de Prueba:**
   - Email: `paciente@test.com`
   - Password: `paciente123`

---

## 🔄 Paso 6: Actualizaciones Automáticas

### Deploy Automático con cada Push

Render detecta automáticamente cambios en GitHub:

```powershell
# 1. Haz cambios en tu código
# 2. Commit
git add .
git commit -m "Actualización de la app"

# 3. Push
git push origin main

# 4. Render automáticamente:
# ✅ Detecta el push
# ✅ Hace rebuild
# ✅ Deploya la nueva versión
```

### Desactivar Auto-Deploy (Opcional)

En Render Dashboard:
1. Ve a tu servicio
2. Settings → Build & Deploy
3. Desactiva "Auto-Deploy"

---

## 🎨 Paso 7: Personalización (Opcional)

### Dominio Personalizado

1. **En Render:**
   - Settings → Custom Domains
   - Click "Add Custom Domain"
   - Ingresa: `www.tudominio.com`

2. **En tu proveedor de dominio:**
   - Agrega registro CNAME:
   ```
   CNAME www saludia.onrender.com
   ```

3. **Render configurará SSL automáticamente** (HTTPS gratis)

### Notificaciones

Settings → Notifications:
- ✅ Deploy succeeded
- ✅ Deploy failed
- ✅ Service crashed

---

## 🐛 Troubleshooting

### Ver Logs en Tiempo Real

1. En Dashboard → Tu servicio
2. Click en "Logs"
3. Verás todo el output del servidor

### El servicio se duerme (Plan Free)

**Problema:** Render Free tiene "sleep" después de 15 min sin uso

**Soluciones:**
1. **Upgrade a Starter** ($7/mes - sin sleep)
2. **Usar un ping service** (gratis):
   - https://uptimerobot.com
   - Configura ping cada 5 minutos a tu URL

### Errores de Memoria

**Síntomas:** Build falla o app crashea

**Soluciones:**
1. Upgrade a Starter (más RAM)
2. Optimiza tu build:
   ```json
   // vite.config.ts
   build: {
     chunkSizeWarningLimit: 1000,
     rollupOptions: {
       output: {
         manualChunks: {
           vendor: ['react', 'react-dom']
         }
       }
     }
   }
   ```

---

## 💰 Costos

### Plan Free (Lo que necesitas ahora):
- ✅ 750 horas/mes (suficiente para 1 servicio 24/7)
- ✅ Deploy automático
- ✅ SSL gratis
- ⚠️ Se duerme después de 15 min sin uso
- ⚠️ 512 MB RAM

### Plan Starter ($7/mes):
- ✅ Sin sleep (siempre activo)
- ✅ 1 GB RAM
- ✅ Mejor performance

---

## 📝 Checklist Final

Antes de considerar el deploy exitoso:

- [ ] La URL pública abre sin errores
- [ ] Puedes hacer login con `paciente@test.com` / `paciente123`
- [ ] La traducción médica funciona
- [ ] Puedes ver el historial
- [ ] El dashboard de salud muestra datos
- [ ] Puedes crear una nueva cuenta
- [ ] El modo invitado funciona

---

## 🎉 ¡Éxito!

Tu aplicación está ahora en producción:

```
🌐 URL: https://saludia.onrender.com
👤 Usuario: paciente@test.com
🔑 Password: paciente123
```

### Comparte tu app:

```
¡Prueba mi traductor médico con IA!
https://saludia.onrender.com

Convierte diagnósticos médicos complejos
a lenguaje simple que todos entiendan.

✅ 100% gratis
✅ Sin registro obligatorio
✅ Privacidad garantizada
```

---

## 🆘 Soporte

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **Render Status:** https://status.render.com

---

## 📚 Recursos Adicionales

### Tutoriales en Video:
- Render Official Tutorials: https://render.com/docs/deploy-node-express-app

### Alternativas a Render:
- **Railway:** https://railway.app
- **Fly.io:** https://fly.io
- **Cyclic:** https://cyclic.sh

---

**¡Tu app está lista para el mundo! 🚀**
