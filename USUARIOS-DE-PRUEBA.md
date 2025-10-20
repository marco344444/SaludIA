# 👥 Usuarios de Prueba - MediTranslate AI

## 📋 Credenciales de Acceso

**⚠️ IMPORTANTE:** Esta aplicación está diseñada para **pacientes** y **NO requiere login obligatorio**.

Puedes usar la app de 3 formas:

---

### 🆓 **Opción 1: Modo Invitado (Recomendado)**

**SIN LOGIN - Completamente anónimo**

✅ Usa la app sin crear cuenta  
✅ Traduce diagnósticos médicos instantáneamente  
✅ Sin registros ni seguimiento  
✅ Privacidad total  

**Cómo:** En la pantalla de login, haz clic en **"Continuar sin iniciar sesión"**

---

### � **Opción 2: Usuario de Prueba**

Si quieres probar el sistema de login, usa estas credenciales:

```
Email:      paciente@test.com
Contraseña: paciente123
Rol:        Paciente
Nombre:     María González
```

**Ventajas:**
- Guarda tu historial de traducciones
- Acceso a tus diagnósticos anteriores
- Sincronización entre sesiones

---

### ✏️ **Opción 3: Registrar Nueva Cuenta**

Crea tu propia cuenta personalizada:

1. Haz clic en **"Crear nueva cuenta"**
2. Completa:
   - **Nombre completo**
   - **Email** (debe ser único)
   - **Contraseña** (mínimo 8 caracteres)
3. Automáticamente iniciarás sesión

---

## 🚀 Cómo Usar la App

### **Paso 1: Abre el navegador**
Ve a: **http://localhost:5000**

### **Paso 2: Elige cómo quieres usar la app**

**🆓 Modo Invitado (Sin login):**
- Click en **"Continuar sin iniciar sesión"**
- Acceso inmediato a todas las funciones
- ✅ **LA IA FUNCIONA SIN LOGIN**

**👤 Con cuenta:**
- Usa `paciente@test.com` / `paciente123`
- O registra una nueva cuenta
- Tus traducciones se guardarán

---

### **Paso 3: Usar la IA de Traducción Médica**

1. **Ve a la pestaña "Traducir"**
2. **Copia un diagnóstico** del archivo `ejemplos-medicos.json`
3. **Pégalo en el campo de texto**
4. **Click en "Traducir con IA"**
5. **Listo!** La IA convierte el término técnico a lenguaje simple

---

## 🧪 Ejemplos para Probar

Copia y pega estos diagnósticos médicos reales:

### **Ejemplo 1 - Cardiología (Alta complejidad):**
```
Hipertensión arterial sistólica primaria con episodios de taquicardia sinusal intermitente, asociada a diabetes mellitus tipo 2 descompensada con microalbuminuria incipiente.
```

### **Ejemplo 2 - Respiratorio:**
```
Enfermedad pulmonar obstructiva crónica (EPOC) en estadio GOLD III con exacerbación aguda secundaria a infección bacteriana.
```

### **Ejemplo 3 - Neurología:**
```
Accidente cerebrovascular isquémico de arteria cerebral media izquierda con hemiparesia derecha residual.
```

### **Ejemplo 4 - Gastroenterología (Baja complejidad):**
```
Gastritis crónica antral moderada asociada a Helicobacter pylori, pendiente de erradicación.
```

**📁 Más ejemplos:** Abre `ejemplos-medicos.json` - tienes 29 diagnósticos de 11 especialidades médicas.

---

## 🎯 Filosofía de la App

### **Para Pacientes, por Pacientes**

Esta app está diseñada pensando en ti:

✅ **Sin barreras:** No necesitas crear cuenta para usar la IA  
✅ **Privacidad:** Modo invitado completamente anónimo  
✅ **Simplicidad:** Pega diagnóstico → Click → Traducción simple  
✅ **Opcional:** Login solo si quieres guardar tu historial  

### **¿Por qué no obligar login?**

- Los pacientes necesitan ayuda **inmediata**
- No todos quieren crear cuentas
- La privacidad médica es importante
- La IA debe ser **accesible para todos**

---

## 🔐 Seguridad y Privacidad

### **Modo Invitado (Sin login):**
- ✅ Cero datos personales guardados
- ✅ Sin tracking ni cookies de usuario
- ✅ Traducciones no se asocian a nadie
- ✅ Datos se pierden al cerrar sesión (por diseño)

### **Modo Con Cuenta:**
- ✅ Contraseñas hasheadas con bcrypt
- ✅ JWT con expiración de 7 días
- ✅ Historial personal guardado
- ✅ Puedes eliminar tu cuenta cuando quieras

---

## 🆘 Problemas Comunes

### **"La IA no responde"**
✅ **Solución:** No necesitas login. Usa "Continuar sin iniciar sesión"  
✅ Verifica que el servidor esté corriendo en http://localhost:5000  
✅ Revisa la consola del navegador (F12) para errores  

### **"No puedo crear un usuario"**
✅ El email debe ser único  
✅ La contraseña debe tener mínimo 8 caracteres  
✅ Completa todos los campos  

### **"Quiero usar sin cuenta"**
✅ Click en "Continuar sin iniciar sesión"  
✅ La IA funciona **100% sin login**  

---

## 📝 Notas Técnicas

- **Almacenamiento:** En memoria (MemStorage) - datos se pierden al reiniciar servidor
- **Usuario de prueba:** Solo 1 usuario precargado (`paciente@test.com`)
- **Roles:** Solo existe rol "patient" - no hay doctores ni admins
- **Autenticación:** Completamente opcional, no afecta funcionalidad de la IA
- **Backend:** Node.js + Express + JWT
- **Frontend:** React + TypeScript + Wouter

---

## ✅ Resumen

```
MODO INVITADO (Recomendado)
├─ Sin login necesario
├─ Click en "Continuar sin iniciar sesión"
├─ Usa la IA inmediatamente
└─ Privacidad total

MODO CON CUENTA (Opcional)
├─ Guarda tu historial
├─ Login: paciente@test.com / paciente123
├─ O registra nueva cuenta
└─ Sincronización entre sesiones
```

---

**🎉 ¡La IA funciona sin login! Haz clic en "Continuar sin iniciar sesión" y empieza a traducir diagnósticos médicos ahora mismo.**

---

## 🚀 Cómo Usar

### Opción 1: Iniciar sesión
1. Abre la app en http://localhost:5000
2. Verás la pantalla de login
3. Usa cualquiera de las credenciales de arriba
4. Haz clic en "Iniciar sesión"
5. ¡Listo! Estarás en la app principal

### Opción 2: Registrar nuevo usuario
1. En la pantalla de login, haz clic en "Crear nueva cuenta"
2. Completa el formulario:
   - Nombre completo
   - Email (debe ser único)
   - Contraseña (mínimo 8 caracteres)
3. Haz clic en "Registrarse"
4. Automáticamente iniciarás sesión

### Opción 3: Modo invitado (sin login)
1. En la pantalla de login, haz clic en "Continuar sin iniciar sesión"
2. Usarás la app sin necesidad de cuenta
3. ⚠️ **Nota:** Los datos no se asociarán a ningún usuario

---

## 🧪 Probar la IA de Traducción

Una vez dentro de la app:

1. **Ve a la pestaña "Traducir"**
2. **Abre el archivo `ejemplos-medicos.json`** que está en la raíz del proyecto
3. **Copia uno de los 29 diagnósticos** de ejemplo
4. **Pégalo en el campo de texto**
5. **Haz clic en "Traducir con IA"**
6. **Observa** cómo la IA traduce el término médico a lenguaje simple

### Ejemplos rápidos para copiar/pegar:

**Ejemplo 1 - Cardiología (complejidad alta):**
```
Hipertensión arterial sistólica primaria con episodios de taquicardia sinusal intermitente, asociada a diabetes mellitus tipo 2 descompensada con microalbuminuria incipiente.
```

**Ejemplo 2 - Respiratorio (complejidad alta):**
```
Enfermedad pulmonar obstructiva crónica (EPOC) en estadio GOLD III con exacerbación aguda secundaria a infección bacteriana.
```

**Ejemplo 3 - Neurología (complejidad alta):**
```
Accidente cerebrovascular isquémico de arteria cerebral media izquierda con hemiparesia derecha residual.
```

**Ejemplo 4 - Gastroenterología (complejidad baja):**
```
Gastritis crónica antral moderada asociada a Helicobacter pylori, pendiente de erradicación.
```

---

## 🔐 Seguridad

- ✅ Las contraseñas están hasheadas con bcrypt (10 rounds)
- ✅ La autenticación usa JWT con expiración de 7 días
- ✅ Los tokens se guardan en localStorage del navegador
- ⚠️ **Importante:** Estos usuarios son SOLO para pruebas en desarrollo
- ⚠️ En producción, cambia las contraseñas y usa una base de datos real

---

## 🗄️ Almacenamiento

Los datos se guardan en **memoria** (MemStorage), lo que significa:

- ✅ **Ventaja:** No necesitas configurar PostgreSQL para probar
- ⚠️ **Limitación:** Los datos se pierden al reiniciar el servidor
- ⚠️ **Solución:** Para producción, migra a PostgreSQL con Drizzle ORM

---

## 🆘 Problemas Comunes

### "Error al iniciar sesión"
- ✅ Verifica que escribiste correctamente el email y contraseña
- ✅ Recuerda que las contraseñas distinguen mayúsculas/minúsculas
- ✅ Prueba con: `doctor@test.com` / `doctor123`

### "La IA no responde"
- ✅ Asegúrate de haber iniciado sesión o estar en modo invitado
- ✅ Verifica que el servidor esté corriendo en http://localhost:5000
- ✅ Revisa la consola del navegador (F12) para errores

### "No puedo crear un nuevo usuario"
- ✅ El email debe ser único (no usar los 3 emails de prueba)
- ✅ La contraseña debe tener mínimo 8 caracteres
- ✅ Completa todos los campos

---

## 📝 Notas

1. **Los usuarios de prueba se crean automáticamente** al iniciar el servidor
2. **No necesitas ejecutar scripts** ni configurar nada adicional
3. **Puedes crear tantos usuarios nuevos como quieras** con el formulario de registro
4. **El sistema funciona 100% en memoria**, perfecto para demos y desarrollo

---

¡Listo para probar! 🎉
