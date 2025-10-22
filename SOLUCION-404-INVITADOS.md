# Solución al Error 404 en Dashboard para Usuarios Invitados

## Problema Identificado

El usuario reportó dos problemas principales:
1. **Error 404**: Al intentar editar datos en el dashboard sin estar autenticado, se generaba un error `PATCH http://localhost:5000/api/health-record/temp-guest-record 404 (Not Found)`
2. **Datos no aparecen**: Los datos ingresados durante el registro (edad 20, peso 84kg, altura 174cm) no aparecían en el dashboard

## Causa Raíz

### Error 404
- El endpoint `/api/health-record` devuelve un registro temporal con `id: "temp-guest-record"` para usuarios no autenticados
- Cuando el usuario intenta editar datos (presión arterial, glucosa, peso, etc.), el componente intenta hacer un `PATCH /api/health-record/temp-guest-record`
- Este endpoint NO existe en el servidor, causando el error 404
- Los usuarios invitados NO deberían poder editar datos porque no tienen una cuenta donde guardarlos

### Datos no aparecen
- **MemStorage es volátil**: Los datos se pierden cada vez que el servidor se reinicia
- Si el servidor se reinició después del registro, todos los datos se pierden
- También es posible que el usuario esté viendo el dashboard como invitado en lugar de estar autenticado

## Solución Implementada

### 1. Protección de Funciones de Edición
Se agregó verificación al inicio de todas las funciones que modifican datos:

```typescript
const handleAddBloodPressure = async () => {
  if (!user || healthRecord.data?.id === "temp-guest-record") {
    toast({
      title: "Inicia sesión para continuar",
      description: "Debes crear una cuenta o iniciar sesión para guardar cambios",
      variant: "destructive"
    });
    return;
  }
  // ... resto del código
};
```

Funciones protegidas:
- `handleUpdateProfile` - Editar edad/altura
- `handleAddBloodPressure` - Agregar presión arterial
- `handleAddGlucose` - Agregar glucosa
- `handleAddWeight` - Agregar peso
- `handleAddMedication` - Agregar medicamento
- `handleAddCondition` - Agregar condición
- `handleRemoveCondition` - Eliminar condición
- `handleToggleMedication` - Marcar medicamento como tomado

### 2. Deshabilitar Botones de Edición para Invitados

Se agregó la propiedad `disabled={isGuest}` a todos los botones de edición:

```typescript
const isGuest = !user || record.id === "temp-guest-record";

<Button 
  variant="ghost" 
  size="sm"
  disabled={isGuest}
  title={isGuest ? "Inicia sesión para editar" : "Editar perfil"}
>
  <Edit className="w-4 h-4 mr-1" />
  Editar
</Button>
```

Botones deshabilitados para invitados:
- ✅ Botón "Editar" del perfil de salud
- ✅ Botón "+" de presión arterial
- ✅ Botón "+" de glucosa
- ✅ Botón "+" de peso
- ✅ Botón "Gestionar" medicamentos
- ✅ Botón "Gestionar condiciones"

### 3. Deshabilitar Checkboxes de Medicamentos

Los medicamentos que se marcan como "tomados" también fueron protegidos:

```typescript
<div 
  className={`... ${
    isGuest ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-muted/30'
  }`}
  onClick={() => !isGuest && handleToggleMedication(index)}
  title={isGuest ? "Inicia sesión para marcar medicamentos" : "Marcar como tomado/pendiente"}
>
```

### 4. Mensajes Informativos Mejorados

Se agregó un banner especial para usuarios invitados:

```typescript
{isGuest && (
  <Card className="bg-amber-50 border-amber-200">
    <CardContent className="p-6">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-amber-900">
          🔒 Modo Vista Previa
        </p>
        <p className="text-xs text-amber-700">
          Inicia sesión o crea una cuenta para guardar y gestionar tu información de salud
        </p>
      </div>
    </CardContent>
  </Card>
)}
```

## Verificación de Autenticación

Para verificar si un usuario está autenticado:

1. El hook `useAuth` proporciona el objeto `user`
2. Si `user` es `null` o `undefined`, el usuario es invitado
3. Si `healthRecord.data.id === "temp-guest-record"`, también es invitado

## Sobre el Problema de Datos Perdidos

El problema de que los datos registrados no aparecen tiene varias posibles causas:

### Causa 1: Servidor Reiniciado
- **MemStorage pierde todos los datos** al reiniciar el servidor
- Solución temporal: No reiniciar el servidor durante las pruebas
- Solución permanente: Migrar a PostgreSQL (ya hay schemas Drizzle preparados)

### Causa 2: Usuario No Autenticado
- Después del registro, verificar que:
  - El token se guardó en localStorage
  - El componente AuthProvider está funcionando
  - La navegación al dashboard mantiene la sesión

### Pasos para Depurar
1. Después de registrarse, verificar en DevTools → Application → Local Storage:
   - Debe existir una clave `token` con un valor JWT
2. En el componente dashboard, agregar temporalmente:
   ```typescript
   console.log("User:", user);
   console.log("Health Record:", healthRecord.data);
   ```
3. Si `user` es null pero hay un token, revisar el AuthProvider
4. Si el registro crea el HealthRecord pero no se recupera, revisar la función `getHealthRecordByUser`

## Recomendaciones Futuras

### 1. Migración a Base de Datos Persistente
```bash
# Los schemas ya están definidos en shared/schema.ts
# Solo falta configurar PostgreSQL y ejecutar migraciones
npm run db:push
```

### 2. Mensaje de Advertencia en Registro
Agregar un mensaje indicando que los datos se perderán si el servidor se reinicia (mientras se usa MemStorage).

### 3. Redirección Automática para Invitados
Considerar bloquear completamente el tab "Dashboard" para invitados y mostrar un mensaje para que inicien sesión:

```typescript
if (!user) {
  return (
    <div className="text-center p-8">
      <h2>Inicia sesión para ver tu dashboard</h2>
      <Button onClick={() => navigate("/login")}>Ir a Login</Button>
    </div>
  );
}
```

## Testing

Para verificar que la solución funciona:

### Como Invitado
1. Abrir la app sin iniciar sesión
2. Ir al tab "Dashboard"
3. ✅ Ver banner "🔒 Modo Vista Previa"
4. ✅ Todos los botones de edición deben estar deshabilitados (grises)
5. ✅ Al pasar el mouse sobre los botones, ver tooltip "Inicia sesión para..."
6. ✅ NO debe haber errores 404 en la consola

### Como Usuario Autenticado
1. Registrarse con datos de salud (edad, peso, altura)
2. Verificar que los datos aparecen en el dashboard
3. ✅ Todos los botones de edición deben estar habilitados
4. ✅ Poder agregar signos vitales
5. ✅ Cambios se guardan correctamente
6. ✅ Refrescar la página, datos persisten (si el servidor no se reinició)

## Archivos Modificados

- `client/src/components/health-dashboard.tsx`
  - Agregado import de `useAuth`
  - Agregada variable `isGuest`
  - Protegidas todas las funciones de edición
  - Deshabilitados botones para invitados
  - Agregado banner informativo para invitados
  - Deshabilitados checkboxes de medicamentos para invitados
