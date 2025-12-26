# 🚀 Guía de Instalación y Uso - Agenda Preparate México

## 📋 Requisitos Previos

- **Node.js** versión 16 o superior ([Descargar aquí](https://nodejs.org/))
- **npm** (viene incluido con Node.js)
- Navegador web moderno (Chrome, Firefox, Edge, Safari)

## 🔧 Instalación Paso a Paso

### Opción 1: Instalación Automática (Windows)

1. Navega a la carpeta del proyecto
2. Haz doble clic en `install.bat`
3. Espera a que se complete la instalación
4. El script te mostrará los comandos a ejecutar

### Opción 2: Instalación Automática (Mac/Linux)

```bash
chmod +x install.sh
./install.sh
```

### Opción 3: Instalación Manual

1. **Abre Terminal/PowerShell** en la carpeta del proyecto
2. **Ejecuta el comando:**
   ```bash
   npm install
   ```
3. **Espera a que se complete** (puede tomar 2-3 minutos)

## 🎮 Ejecutar la Aplicación

### Modo Desarrollo (Con hot-reload)

```bash
npm run dev
```

Luego abre tu navegador en:
```
http://localhost:5173
```

### Modo Producción

```bash
npm run build
npm run preview
```

## 📱 Primeros Pasos en la Aplicación

### 1️⃣ Seleccionar un Estado
- Verás un grid de 32 tarjetas con los estados de México
- Cada tarjeta tiene un gradiente único
- Haz clic en cualquier tarjeta para ver las ciudades

### 2️⃣ Seleccionar una Ciudad
- Elige una ciudad del estado seleccionado
- Verás un contador de salones en esa ciudad
- Puedes agregar una nueva ciudad si lo deseas

### 3️⃣ Registrar un Nuevo Salón
- Haz clic en "Agregar Salón"
- Completa el formulario en 3 pasos:
  - **Paso 1**: Información principal del salón
  - **Paso 2**: Datos bancarios (opcional)
  - **Paso 3**: Valoración del salón

### 4️⃣ Ver Catálogo de Salones
- Una vez registrado, verás los salones como tarjetas
- Cada tarjeta muestra: imagen, nombre, dirección, capacidad, precio, contacto y rating
- Puedes editar o eliminar cada salón

### 5️⃣ Ver Detalles Completos
- Haz clic en cualquier tarjeta de salón para ver todos los detalles
- Incluye galería de fotos, datos bancarios y valoración
- Desde aquí puedes editar o eliminar

## 💡 Características Principales

### Formulario de Registro de Salón

#### Información Principal
- ✏️ Nombre del salón/hotel
- 🏢 Cantidad de salones (1-5)
- 👥 Capacidad en herradura
- 📏 Altura del salón
- 💰 Precio
- 🎓 Cursos disponibles (Epoxy, Tuning, Globo, Maquillaje)
- 📍 Ubicación en Google Maps
- 📸 Fotos (carga desde tu PC)
- 📝 Comentarios opcionales

#### Datos Bancarios (Opcional)
- Beneficiario
- Número de cuenta
- Banco
- Monto
- Forma de pago
- Concepto (opcional)
- 📥 **Descargar datos** como archivo de texto

#### Valoración
- Selecciona cursos indicados
- Responde preguntas sobre el salón (Sí/No)
- Añade descripción de observaciones

### Descarga de Datos Bancarios

1. Completa los datos bancarios en el formulario
2. Haz clic en "Descargar Datos Bancarios"
3. Se generará un archivo `.txt` con el formato:
   ```
   Ciudad: [Ciudad]
   Curso: [Cursos]
   Nombre del Salón: [Nombre]
   Beneficiario: [Nombre]
   Cuenta: [Número de cuenta]
   Monto: [Monto]
   Pago: [Forma de pago]
   [Si existe] Concepto: [Concepto]
   ```

## 🎨 Personalización de Estilos

Los estilos están en:
- `src/index.css` - Estilos globales y componentes reutilizables
- `tailwind.config.js` - Configuración de Tailwind CSS

Para cambiar colores:
1. Edita `tailwind.config.js`
2. Modifica el objeto `colors`
3. Guarda y verás los cambios en tiempo real (si está ejecutando `npm run dev`)

## 💾 Almacenamiento de Datos

- ✅ Todos los datos se guardan **localmente en tu navegador**
- ✅ **No requiere servidor** (funciona offline)
- ✅ Los datos persisten entre sesiones
- ⚠️ Limpiar el almacenamiento del navegador borrará los datos

### Exportar datos (Manual):
```javascript
// En la consola del navegador (F12)
const data = localStorage.getItem('ageMxSalones');
console.log(data);
```

## 🐛 Solución de Problemas

### Error: "npm no se reconoce"
- Asegúrate de haber instalado Node.js correctamente
- Reinicia tu terminal/PowerShell
- Verifica: `node --version` y `npm --version`

### Puerto 5173 ya está en uso
- Cambia el puerto en `vite.config.ts`:
  ```typescript
  export default defineConfig({
    server: {
      port: 3000,
    }
  })
  ```

### Las imágenes no se cargan
- Las imágenes se guardan como base64 (datos codificados)
- Si tienes muchas imágenes, localStorage podría lllenarse
- Solución: Considera usar un servicio de almacenamiento en la nube

### Aplicación muy lenta
- Limpia el localStorage: Devtools → Application → LocalStorage → Clear All
- Reinicia el servidor: `npm run dev`

## 🔄 Actualizar Dependencias

```bash
npm update
```

## 📦 Build para Producción

```bash
npm run build
```

Esto genera una carpeta `dist/` lista para desplegar en:
- Vercel
- Netlify
- GitHub Pages
- Cualquier servidor web estático

## 📚 Estructura de Carpetas

```
AgeMx/
├── src/
│   ├── components/      ← Componentes reutilizables
│   ├── screens/         ← Pantallas principales
│   ├── context/         ← Gestión de estado global
│   ├── App.tsx          ← Componente raíz
│   ├── main.tsx         ← Punto de entrada
│   ├── types.ts         ← Definiciones de tipos
│   ├── data.ts          ← Datos iniciales
│   └── index.css        ← Estilos globales
├── public/              ← Archivos estáticos
├── index.html           ← HTML principal
├── package.json         ← Dependencias del proyecto
├── vite.config.ts       ← Configuración de Vite
├── tailwind.config.js   ← Configuración de Tailwind
└── README.md            ← Documentación
```

## 🎯 Próximos Pasos

1. ✅ Instala las dependencias
2. ✅ Ejecuta `npm run dev`
3. ✅ Abre `http://localhost:5173`
4. ✅ Comienza a registrar salones
5. 📈 Comparte la aplicación con tu equipo

## 📞 Soporte

Si encuentras problemas:
1. Revisa esta guía nuevamente
2. Verifica que Node.js esté correctamente instalado
3. Limpia `node_modules` y reinstala:
   ```bash
   rm -r node_modules
   npm install
   ```

## 🎉 ¡Listo!

Tu aplicación **Agenda Preparate México** está lista para usar.

**¡Felicidades!** 🎊
