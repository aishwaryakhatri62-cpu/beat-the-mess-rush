@echo off
title BEAT THE MESS RUSH - Development Server
cd /d "%~dp0"
echo ========================================================
echo   BEAT THE MESS RUSH - LPU INT335 DESIGN THINKING
echo ========================================================
echo Starting local web server on http://localhost:5173...
echo.
start "" http://localhost:5173
npm run dev
pause
