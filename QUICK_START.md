# ⚡ Inicio Rápido (Quick Start)

## 🚀 En 3 Pasos

### 1️⃣ Instalar
```bash
cd c:\Users\Usuario\Desktop\AgeMx
npm install
```

### 2️⃣ Ejecutar
```bash
npm run dev
```

### 3️⃣ Abrir
```
http://localhost:5173
```

**¡Listo! La aplicación está corriendo.** 🎉

---

## 📱 Flujo de la Aplicación

```
┌─────────────────┐
│  ESTADOS (32)   │  ← Selecciona un estado
│  Grid Cards     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  CIUDADES       │  ← Elige una ciudad
│  Cards List     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  SALONES        │  ← Ver catálogo o agregar nuevo
│  Catalog Grid   │
└─────┬───────┬───┘
      │       │
      ↓       ↓
   Detalle  Formulario
   de Salón 3 Pasos
```

---

## 🎯 Funcionalidades Principales

### Agregar un Salón
1. Selecciona estado → ciudad
2. Haz clic en "Agregar Salón"
3. Completa formulario en 3 pasos:
   - ✏️ Información principal
   - 🏦 Datos bancarios (opcional)
   - ⭐ Valoración
4. ¡Listo! Tu salón aparecerá en el catálogo

### Ver Detalles
- Haz clic en cualquier tarjeta de salón
- Verás: fotos, datos, contacto, valoración
- Opciones: Editar o Eliminar

### Descargar Datos Bancarios
- En el paso 2 del formulario
- Completa los datos
- Haz clic en "Descargar Datos Bancarios"
- Se descargará un archivo `.txt`

---

## 🎨 Estilos

- **Modo Oscuro**: Automático
- **Colores**: Gradientes por tarjeta
- **Animaciones**: Hover effects
- **Responsive**: Mobile a Desktop

---

## 💾 Datos

- Se guardan automáticamente en el navegador
- No necesitas conexión a internet
- Persisten entre sesiones
- Nunca se pierden (a menos que limpies el almacenamiento)

---

## ⚙️ Requisitos

- ✅ Node.js 16+
- ✅ npm
- ✅ Navegador moderno

---

## 📖 Documentación Completa

- `README.md` - Guía completa
- `GUIA_INSTALACION.md` - Pasos detallados
- `IMPLEMENTACION_COMPLETADA.md` - Qué se implementó
- `INVENTARIO_ARCHIVOS.md` - Lista de archivos

---

## 🆘 Solución Rápida de Problemas

### "npm no se reconoce"
→ Instala Node.js desde https://nodejs.org/

### "Puerto 5173 en uso"
→ Cierra otras aplicaciones o cambia puerto en `vite.config.ts`

### "Las imágenes se ven mal"
→ Intenta con imágenes más pequeñas (<2MB)

### "Aplicación lenta"
→ Limpia localStorage: F12 → Application → LocalStorage → Clear All

---

## 🔄 Comandos Útiles

| Comando | Función |
|---------|---------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza build |
| `npm update` | Actualiza dependencias |

---

## 🌐 Deploy (Publicar)

### Netlify
1. `npm run build`
2. Sube carpeta `dist/` a Netlify

### Vercel
1. Conecta tu repo de GitHub
2. ¡Automático!

### GitHub Pages
1. `npm run build`
2. Sube contenido de `dist/` a rama `gh-pages`

---

## 📞 Notas Importantes

- ✅ **Todos los datos son locales** (no se envían a servidor)
- ✅ **Funciona sin internet** (después de la primera carga)
- ✅ **Completamente personalizable** (código abierto)
- ✅ **Sin limite de salones** (solo limitado por RAM del navegador)

---

## ✨ Características Que Destaca

🎯 **Formulario dinámico** - Se ajusta según cantidad de salones  
📸 **Galería de fotos** - Sube múltiples imágenes  
💰 **Datos bancarios** - Con descarga a archivo  
⭐ **Sistema de rating** - Evaluación visual  
🗺️ **Google Maps** - Links directos a ubicaciones  
📱 **Responsive** - Funciona en cualquier dispositivo  

---

**¡Disfruta tu aplicación!** 🎊

---

*Última actualización: Diciembre 2024*
