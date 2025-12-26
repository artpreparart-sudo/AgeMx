#!/bin/bash

# Script de instalación para Agenda Preparate México

echo "📍 Instalando Agenda Preparate México..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado."
    echo "Por favor descarga e instala Node.js desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"
echo "✅ NPM detectado: $(npm --version)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Instalación completada exitosamente!"
    echo ""
    echo "🚀 Para iniciar el servidor de desarrollo, ejecuta:"
    echo "   npm run dev"
    echo ""
    echo "📦 Para compilar para producción, ejecuta:"
    echo "   npm run build"
    echo ""
else
    echo "❌ Error durante la instalación"
    exit 1
fi
