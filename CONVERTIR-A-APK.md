# 📦 Cómo Convertir MediTranslate AI a APK

## Resumen de Opciones

Tienes **3 métodos principales** para convertir tu PWA a una APK Android:

1. **PWA Builder** (MÁS FÁCIL Y RECOMENDADO) ⭐
2. **Capacitor** (Control total, profesional)
3. **Bubb

leWrap / TWA** (Android puro)

---

## 🌟 MÉTODO 1: PWA Builder (RECOMENDADO PARA EMPEZAR)

### ¿Por qué este método?
- ✅ **Más rápido**: 5-10 minutos
- ✅ **Gratis**: No requiere cuenta de desarrollador de Google
- ✅ **Sin código**: Todo desde el navegador
- ✅ **Funcional**: App completa lista para instalar

### Paso a Paso:

#### 1. Preparar tu PWA
```powershell
# 1. Construir para producción
npm run build

# 2. Servir la versión de producción localmente
npm start
```

#### 2. Hacer tu app accesible online

**Opción A: Usar ngrok (más rápido para pruebas)**
```powershell
# Instalar ngrok (https://ngrok.com/download)
# Descargar y extraer ngrok.exe

# En una terminal, iniciar tu app
npm start

# En otra terminal, exponer el puerto 5000
.\ngrok.exe http 5000
```

Ngrok te dará una URL pública tipo: `https://abc123.ngrok.io`

**Opción B: Deploy a Netlify/Vercel (para producción)**
```powershell
# Instalar Netlify CLI
npm install -g netlify-cli

# Login y deploy
netlify login
netlify deploy --prod
```

#### 3. Generar APK con PWABuilder

1. Ve a: **https://www.pwabuilder.com/**
2. Ingresa tu URL pública (de ngrok o Netlify)
3. Click en "Start"
4. PWABuilder analizará tu manifest y service worker
5. Click en la pestaña "Android"
6. Configurar opciones:
   - **Package ID**: `com.meditranslate.app`
   - **App name**: `MediTranslate AI`
   - **Version**: `1.0.0`
   - **Min SDK**: `21` (Android 5.0+)
7. Click en "Generate Package"
8. Descarga el archivo `.zip`
9. Extrae y encontrarás el APK en la carpeta

#### 4. Instalar APK en tu Android

```bash
# Transferir el APK a tu teléfono
# Habilitar "Fuentes desconocidas" en Ajustes > Seguridad
# Abrir el APK y instalar
```

---

## 🔧 MÉTODO 2: Capacitor (PROFESIONAL)

### ¿Cuándo usar este método?
- ✅ Necesitas funciones nativas (cámara, GPS, etc.)
- ✅ Quieres publicar en Google Play Store
- ✅ Control total sobre la app

### Paso a Paso:

#### 1. Instalar Capacitor
```powershell
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# Inicializar Capacitor
npx cap init "MediTranslate AI" "com.meditranslate.app" --web-dir=dist/public
```

#### 2. Actualizar capacitor.config.ts
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.meditranslate.app',
  appName: 'MediTranslate AI',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3b82f6",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    }
  }
};

export default config;
```

#### 3. Construir y agregar Android
```powershell
# Construir app
npm run build

# Agregar plataforma Android
npx cap add android

# Copiar archivos web a Android
npx cap sync android
```

#### 4. Abrir en Android Studio
```powershell
npx cap open android
```

#### 5. Generar APK desde Android Studio
1. En Android Studio: **Build** → **Build Bundle(s)/APK(s)** → **Build APK(s)**
2. Espera a que compile
3. El APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

#### 6. Firmar APK para Producción (Opcional)
```powershell
# Crear keystore
keytool -genkey -v -keystore meditranslate.keystore -alias meditranslate -keyalg RSA -keysize 2048 -validity 10000

# En Android Studio:
# Build → Generate Signed Bundle/APK → APK
# Seleccionar tu keystore y seguir wizard
```

---

## 📱 MÉTODO 3: Trusted Web Activity (TWA) - BubbleWrap

### ¿Cuándo usar?
- ✅ Solo quieres empaquetar tu PWA
- ✅ No necesitas funciones nativas extra
- ✅ Tu app ya está online

### Paso a Paso:

#### 1. Instalar BubbleWrap
```powershell
npm install -g @bubblewrap/cli
```

#### 2. Inicializar proyecto
```powershell
# Crear carpeta
mkdir meditranslate-twa
cd meditranslate-twa

# Inicializar (requiere que tu app esté online)
bubblewrap init --manifest https://tu-dominio.com/manifest.json
```

#### 3. Construir APK
```powershell
# Construir
bubblewrap build

# El APK estará en: ./app-release-signed.apk
```

#### 4. Instalar en dispositivo
```powershell
bubblewrap install
```

---

## 🚀 COMPARACIÓN DE MÉTODOS

| Método | Dificultad | Tiempo | Funciones Nativas | Play Store |
|--------|------------|--------|-------------------|------------|
| **PWA Builder** | 🟢 Fácil | 10 min | ❌ No | ✅ Sí |
| **Capacitor** | 🟡 Media | 30 min | ✅ Sí | ✅ Sí |
| **BubbleWrap** | 🟡 Media | 20 min | ❌ No | ✅ Sí |

---

## 📝 REQUISITOS PREVIOS

### Para todos los métodos:
- ✅ Node.js instalado
- ✅ App construida (`npm run build`)
- ✅ Service Worker y Manifest configurados ✅ (Ya lo tienes)

### Para Capacitor adicional:
- ✅ Android Studio instalado
- ✅ Java JDK 11+ instalado
- ✅ Variables de entorno configuradas:
  ```powershell
  # Agregar a variables de entorno:
  ANDROID_HOME=C:\Users\TuUsuario\AppData\Local\Android\Sdk
  JAVA_HOME=C:\Program Files\Java\jdk-11
  ```

### Para publicar en Play Store:
- 💰 Cuenta de desarrollador de Google ($25 una vez)
- 📝 Política de privacidad
- 🖼️ Screenshots y gráficos

---

## 🎯 RECOMENDACIÓN PASO A PASO PARA TI

### Para Probar Rápido (HOY MISMO):

```powershell
# Terminal 1: Iniciar app
cd C:\Users\prada\Downloads\SaludIA\SaludIA
npm run build
npm start

# Terminal 2: Exponer con ngrok
# (Descarga ngrok de: https://ngrok.com/download)
.\ngrok.exe http 5000

# Ir a PWABuilder con la URL de ngrok
# https://www.pwabuilder.com/
# Generar APK
# Instalar en tu teléfono
```

### Para Producción (Publicar en Play Store):

```powershell
# 1. Deploy tu app a un hosting
npm run build
# Subir a Netlify/Vercel/Railway

# 2. Usar Capacitor para APK profesional
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "MediTranslate AI" "com.meditranslate.app"
npx cap add android
npx cap sync
npx cap open android

# 3. En Android Studio:
# Build → Generate Signed Bundle/APK
# Firmar con keystore
# Subir a Play Console
```

---

## 🔐 CONFIGURACIÓN ADICIONAL PARA APK

### 1. Actualizar manifest.json para mejor APK

Ya tienes un buen manifest, pero asegúrate de tener:

```json
{
  "name": "MediTranslate AI",
  "short_name": "MediTranslate",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "start_url": "/",
  "scope": "/"
}
```

### 2. Iconos Requeridos

Para APK necesitas iconos en varios tamaños:
- 48x48, 72x72, 96x96, 144x144, 192x192, 512x512

**Generar rápido en:**
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

### 3. Screenshots para Play Store

Necesitarás:
- **Phone**: 2-8 screenshots (1080x1920 o 1080x2340)
- **Tablet 7"**: 2-8 screenshots (1200x1920)

Captura con Chrome DevTools en modo móvil.

---

## ❓ PROBLEMAS COMUNES

### "Package not found" en PWABuilder
- ✅ Verifica que tu app esté accesible online
- ✅ Asegúrate de que manifest.json y service-worker.js sean accesibles
- ✅ Usa HTTPS (ngrok lo hace automáticamente)

### "App not installed" en Android
- ✅ Habilita "Fuentes desconocidas" o "Instalar apps desconocidas"
- ✅ Si ya existe una versión, desinstálala primero
- ✅ Verifica que el APK no esté corrupto

### "Service Worker not found" en app instalada
- ✅ El SW solo funciona con HTTPS
- ✅ En Capacitor, asegúrate de que `androidScheme: 'https'`
- ✅ Revisa que service-worker.js esté en la raíz del build

### Capacitor: "SDK not found"
```powershell
# Configurar variables de entorno
[System.Environment]::SetEnvironmentVariable('ANDROID_HOME', 'C:\Users\TuUsuario\AppData\Local\Android\Sdk', 'User')
[System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Java\jdk-11', 'User')

# Reiniciar PowerShell
```

---

## 📱 TESTING EN DISPOSITIVO REAL

### Via USB Debugging:
```powershell
# 1. Habilitar "Opciones de desarrollador" en Android
# (Tocar 7 veces "Número de compilación")

# 2. Activar "Depuración USB"

# 3. Conectar teléfono a PC

# 4. Instalar ADB (Android Debug Bridge)
# Viene con Android Studio o descarga platform-tools

# 5. Instalar APK
adb install app-debug.apk

# 6. Ver logs en tiempo real
adb logcat | Select-String "MediTranslate"
```

---

## 🎨 PERSONALIZACIÓN ADICIONAL

### Splash Screen (Pantalla de carga)

Para Capacitor, crea: `android/app/src/main/res/drawable/splash.png`

O usa: https://www.appicon.co/#image-sets

### Cambiar colores de la barra de estado

En `capacitor.config.ts`:
```typescript
plugins: {
  StatusBar: {
    style: 'dark', // o 'light'
    backgroundColor: '#3b82f6'
  }
}
```

---

## 📦 RESUMEN EJECUTIVO

### ¿Qué método usar?

**Solo quieres probar en tu teléfono HOY:**
→ **PWA Builder** con ngrok (10 minutos)

**Quieres publicar en Play Store:**
→ **Capacitor** con Android Studio (1-2 horas primera vez)

**Tu app ya está online y solo necesitas APK:**
→ **BubbleWrap** (20 minutos)

---

## 🔗 RECURSOS ÚTILES

- **PWA Builder**: https://www.pwabuilder.com/
- **Capacitor Docs**: https://capacitorjs.com/docs
- **BubbleWrap**: https://github.com/GoogleChromeLabs/bubblewrap
- **Ngrok**: https://ngrok.com/
- **Android Studio**: https://developer.android.com/studio
- **Play Console**: https://play.google.com/console

---

## ✅ CHECKLIST FINAL ANTES DE GENERAR APK

- [ ] App funciona correctamente en `localhost:5000`
- [ ] Service Worker registrado y funcionando
- [ ] Manifest.json completo y accesible
- [ ] Iconos generados (192x192 y 512x512 mínimo)
- [ ] Build de producción generado (`npm run build`)
- [ ] (Opcional) App deployada en hosting online
- [ ] (Para Play Store) Política de privacidad creada
- [ ] (Para Play Store) Screenshots capturados

---

**¡Listo!** Con esta guía puedes convertir tu PWA a APK de 3 formas diferentes. 

**Mi recomendación:** Empieza con PWA Builder + ngrok para probar HOY, y luego usa Capacitor si quieres publicar en Play Store.

¿Necesitas ayuda con algún paso específico?
