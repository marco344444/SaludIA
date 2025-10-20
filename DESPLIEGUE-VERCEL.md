# 🚀 Guía de Despliegue en Vercel

## ⚠️ PROBLEMA ACTUAL

Si ves el código fuente en lugar de la aplicación, es porque **Vercel no soporta aplicaciones Node.js tradicionales** como esta sin configuración especial.

## ✅ SOLUCIÓN RECOMENDADA: Usar Render.com

Esta aplicación funciona mejor en **Render.com** porque:
- ✅ Soporta Node.js completo (no serverless)
- ✅ Puerto persistente
- ✅ WebSocket para HMR
- ✅ Subida de archivos
- ✅ **GRATIS**

### 📋 Pasos para Deploy en Render.com:

#### 1. Crear cuenta en Render
Ve a: https://render.com y crea una cuenta (gratis)

#### 2. Crear nuevo Web Service
- Click en "New +" → "Web Service"
- Conecta tu repositorio de GitHub
- O usa "Deploy from Git URL"

#### 3. Configuración:
```
Name: saludia (o el nombre que quieras)
Environment: Node
Region: Oregon (o el más cercano)
Branch: main
Build Command: npm install && npm run build
Start Command: npm start
```

#### 4. Variables de entorno (opcional):
```
NODE_ENV=production
PORT=10000
```

#### 5. Click en "Create Web Service"

⏳ **Espera 3-5 minutos** y tu app estará en: `https://saludia.onrender.com`

---

## 🔄 ALTERNATIVA: Adaptar para Vercel (Avanzado)

Si **realmente** quieres usar Vercel, necesitas:

### Cambios Necesarios:

1. **Separar Frontend y Backend**
   - Frontend estático en Vercel
   - Backend en Railway/Render

2. **Usar Vercel Serverless Functions**
   - Reescribir todo a funciones serverless
   - No soporta subida de archivos grande
   - No soporta almacenamiento en memoria

3. **Base de datos externa**
   - Usar Neon, Supabase o PlanetScale
   - Configurar DATABASE_URL

### ⚠️ Limitaciones de Vercel:

- ❌ No soporta `multer` para subir archivos
- ❌ No hay almacenamiento persistente
- ❌ Timeout de 10 segundos en plan Free
- ❌ Cada request es una nueva instancia
- ❌ Memoria se resetea entre requests

---

## 🎯 COMPARACIÓN: Render vs Vercel

| Característica | Render | Vercel |
|----------------|--------|--------|
| Node.js completo | ✅ Sí | ❌ Solo serverless |
| Subida archivos | ✅ Sí | ⚠️ Limitado |
| WebSocket | ✅ Sí | ❌ No |
| Storage persistente | ✅ Sí | ❌ No |
| Plan Free | ✅ 750 horas | ✅ Ilimitado |
| Deploy automático | ✅ Sí | ✅ Sí |
| Custom domain | ✅ Sí | ✅ Sí |

**Para esta app:** ✅ **Render es la mejor opción**

---

## 🚨 Si Ya Desplegaste en Vercel

### Paso 1: Eliminar deployment de Vercel
```bash
# En tu proyecto
vercel remove saludia
```

### Paso 2: Ir a Render.com
Sigue los pasos de arriba ↑

### Paso 3: Actualizar URLs
Cambia las URLs de tu frontend a:
```
https://tu-app.onrender.com/api/...
```

---

## 💡 Otros Servicios Recomendados

### Para Backend + Frontend:
1. **Render.com** ⭐ (Recomendado)
2. **Railway.app** (Similar a Render)
3. **Fly.io** (Más técnico)

### Solo para Backend:
1. **Railway.app**
2. **Cyclic.sh**
3. **Adaptable.io**

### Solo para Frontend:
1. **Vercel** (Para React estático)
2. **Netlify**
3. **GitHub Pages**

---

## 📝 Resumen

### ❌ NO uses Vercel si tu app tiene:
- Servidor Express tradicional
- Subida de archivos
- WebSockets
- Estado en memoria

### ✅ USA Vercel si tu app es:
- Frontend React puro
- Next.js
- API serverless simple
- Sin estado

### ✅ USA Render si tu app es:
- **Node.js + Express** ← Tu caso
- Django, Flask, Ruby on Rails
- Cualquier servidor tradicional

---

## 🎉 Deploy en 5 Minutos con Render

```bash
# 1. Asegúrate de tener estos scripts en package.json
{
  "scripts": {
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "node dist/index.js"
  }
}

# 2. Crea cuenta en Render.com

# 3. New Web Service → Conecta tu repo

# 4. Usa la configuración de arriba

# 5. Deploy! 🚀
```

---

## 🆘 Soporte

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **Railway Docs:** https://docs.railway.app

---

**TL;DR:** Vercel no es para aplicaciones Node.js tradicionales. Usa **Render.com** (es gratis y funciona perfecto).
