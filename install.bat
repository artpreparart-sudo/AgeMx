@echo off
REM Script de instalación para Agenda Preparate México (Windows)

echo.
echo Instalando Agenda Preparate Mexico...
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error: Node.js no está instalado.
    echo Por favor descarga e instala Node.js desde: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Detectado Node.js: 
node --version

echo Detectado NPM:
npm --version

echo.
echo Instalando dependencias...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Instalación completada exitosamente!
echo Instalando Agenda PREPARARTE MEXICO...
    echo Para iniciar el servidor de desarrollo, ejecuta:
    echo    npm run dev
    echo.
    echo Para compilar para producción, ejecuta:
    echo    npm run build
    echo.
) else (
    echo.
    echo Error durante la instalación
    echo.
)

pause
