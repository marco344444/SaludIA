# Instrucciones para Generar Iconos PWA

## Opción 1: Usar una herramienta online (Recomendado)

1. Ve a: https://realfavicongenerator.net/ o https://www.pwabuilder.com/imageGenerator
2. Sube el archivo `client/public/icon.svg`
3. Descarga los iconos generados
4. Coloca los archivos en `client/public/`:
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)

## Opción 2: Generar con ImageMagick (si lo tienes instalado)

```bash
# Convertir SVG a PNG
convert client/public/icon.svg -resize 192x192 client/public/icon-192.png
convert client/public/icon.svg -resize 512x512 client/public/icon-512.png
```

## Opción 3: Usar herramientas de diseño

### Figma / Sketch / Adobe XD
1. Crea un cuadrado de 512x512px
2. Diseña tu icono (recomendado: logo + texto corto)
3. Exporta como PNG en dos tamaños:
   - 192x192px
   - 512x512px

### Canva (Gratis)
1. Crea un diseño de 512x512px
2. Usa plantillas de iconos de app
3. Descarga como PNG
4. Redimensiona a 192x192px usando https://www.iloveimg.com/resize-image

## Especificaciones del Icono

- **Formato**: PNG con transparencia o fondo sólido
- **Tamaños**: 192x192 y 512x512 píxeles
- **Margen**: Deja ~10% de padding alrededor del contenido
- **Colores**: Usa el color primario (#3b82f6) como base
- **Contenido**: Logo/símbolo médico + texto "MediTranslate" (opcional)

## Icono Temporal

Si necesitas algo rápido para probar, puedes usar:
- https://placeholder.com/
- Crea imágenes de 192x192 y 512x512 con el color #3b82f6
- O usa el SVG que ya está incluido

## Verificar Iconos

Una vez generados, verifica que:
- Los archivos existan en `client/public/icon-192.png` y `client/public/icon-512.png`
- El manifest.json apunte correctamente a estos archivos
- Los iconos se vean bien en diferentes fondos (claro y oscuro)
