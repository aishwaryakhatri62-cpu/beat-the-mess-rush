@echo off
title Push Beat The Mess Rush to GitHub
color 0A
cd /d "%~dp0"
echo ========================================================
echo   PUSHING TO GITHUB: aishwaryakhatri62-cpu/beat-the-mess-rush
echo ========================================================
echo.
echo Make sure you have created the empty repository on GitHub:
echo https://github.com/new (Name: beat-the-mess-rush)
echo.
echo Pushing files now...
git branch -M main
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! All files uploaded to your GitHub:
    echo   https://github.com/aishwaryakhatri62-cpu/beat-the-mess-rush
    echo ========================================================
) else (
    echo.
    echo If push failed, make sure the repository 'beat-the-mess-rush'
    echo is created on https://github.com/new and try again!
)
echo.
pause
