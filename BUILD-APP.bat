@echo off
title BEAT THE MESS RUSH - Production Build
cd /d "%~dp0"
echo ========================================================
echo   BEAT THE MESS RUSH - Building Production Assets
echo ========================================================
echo Building optimized files into dist folder...
echo.
npm run build
echo.
echo Build complete! Optimized files are ready in D:\PROJECTS\BEAT THE MESS RUSH\dist
echo.
pause
