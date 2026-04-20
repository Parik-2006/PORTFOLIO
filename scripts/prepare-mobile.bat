@echo off
REM Copy mobile portfolio to frontend/public for Vite to include in build

echo 📱 Preparing mobile portfolio for build...

REM Get the directory where this script is located
for %%I in ("%~dp0.") do set "SCRIPT_DIR=%%~fI"
set "SCRIPT_DIR=%SCRIPT_DIR%\.."

set "MOBILE_SOURCE=%SCRIPT_DIR%\mobile-portfolio.html"
set "MOBILE_DEST=%SCRIPT_DIR%\frontend\public\mobile-portfolio.html"

REM Check if source exists
if not exist "%MOBILE_SOURCE%" (
    echo ❌ Error: mobile-portfolio.html not found at %MOBILE_SOURCE%
    exit /b 1
)

REM Copy the file
copy "%MOBILE_SOURCE%" "%MOBILE_DEST%"

if %ERRORLEVEL% equ 0 (
    echo ✅ Mobile portfolio copied to frontend/public/
    echo 📦 Ready to build with 'npm run build'
) else (
    echo ❌ Failed to copy mobile portfolio
    exit /b 1
)
