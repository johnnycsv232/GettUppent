@echo off
title GettUpp Business OS
color 0A

echo ===================================================
echo   GETTUPP BUSINESS OS - LAUNCHER
echo ===================================================
echo.

echo [1/2] Checking for Node.js...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] Node.js is not installed!
    echo You must install Node.js to run this website.
    echo Please download it here: https://nodejs.org/
    echo.
    pause
    exit /b
)
echo Node.js found.

echo.
echo [2/2] Installing dependencies (this happens once)...
call npm install
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] Installation failed.
    pause
    exit /b
)

echo.
echo ===================================================
echo   STARTING SERVER...
echo   Wait for "Ready in ...ms" below.
echo   Then open: http://localhost:3000
echo ===================================================
echo.
call npm run dev
pause
