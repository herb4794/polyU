@echo off
:: Full Environment Setup for PolyU React App

echo Installing Node.js and npm (via winget)...
where node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo Node.js not found. Installing using winget...
    winget install OpenJS.NodeJS.LTS -h
) ELSE (
    echo Node.js is already installed.
)

echo.
echo Checking npm...
where npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo npm not found. Something went wrong with Node.js installation.
    pause
    exit /b
) ELSE (
    echo npm is available.
)

echo.
echo Installing React and dependencies...
npm install

echo.
echo Starting development server...
npm start

pause