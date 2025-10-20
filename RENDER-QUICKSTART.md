# 🚀 Quick Start: Deploy en Render

## ⚡ Despliegue Rápido (5 pasos)

### 1️⃣ Sube tu código a GitHub

```powershell
# Si ya tienes Git configurado:
git add .
git commit -m "Ready for Render deployment"
git push origin main

# Si es tu primera vez:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU-USUARIO/tu-repo.git
git push -u origin main
```

### 2️⃣ Crea cuenta en Render

👉 Ve a: **https://render.com**  
✅ Regístrate con GitHub (más rápido)

### 3️⃣ Crea Web Service

1. Click en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Click en **"Connect"**

### 4️⃣ Configura el servicio

```
Name:           saludia
Region:         Oregon (US West)
Branch:         main
Environment:    Node
Build Command:  npm install && npm run build
Start Command:  npm start
```

### 5️⃣ Deploy!

Click en **"Create Web Service"** y espera 3-5 minutos ⏳

---

## ✅ Verificación

Tu app estará en: `https://saludia.onrender.com`

**Credenciales de prueba:**
- Email: `paciente@test.com`
- Password: `paciente123`

---

## 📚 Documentación Completa

Para una guía detallada, ver: **[GUIA-DEPLOY-RENDER.md](./GUIA-DEPLOY-RENDER.md)**

---

## 🆘 Problemas Comunes

### El build falla
```powershell
# Prueba localmente primero:
npm run build
```

### La app no responde
- Verifica que el puerto esté configurado: `process.env.PORT`
- Revisa los logs en Render Dashboard

### Se duerme después de 15 min (Plan Free)
- Es normal en el plan gratuito
- Primera petición toma ~30 segundos en despertar
- Upgrade a Starter ($7/mes) para mantenerla activa 24/7

---

## 🎉 ¡Listo!

Tu aplicación médica con IA está ahora en producción 🌐
