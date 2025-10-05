@echo off
echo ============================================
echo F&O Trading Platform - Render Setup
echo ============================================

echo.
echo STEP 1: Create GitHub Repository
echo ---------------------------------
echo 1. Go to https://github.com/new
echo 2. Repository name: fo-trading-platform
echo 3. Description: F&O Trading Platform - React Web Application  
echo 4. Can be PUBLIC or PRIVATE (both work with Render)
echo 5. DO NOT initialize with README
echo 6. Click "Create repository"

echo.
echo STEP 2: Copy Your Repository URL
echo --------------------------------
set /p REPO_URL="Paste your GitHub repository URL here: "

echo.
echo STEP 3: Connecting to GitHub...
echo --------------------------------
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ✅ SUCCESS: Project pushed to GitHub!
    echo.
    echo NEXT STEPS:
    echo 1. Go to https://render.com and sign in
    echo 2. Click "New +" → "Static Site"
    echo 3. Connect your GitHub account
    echo 4. Select "fo-trading-platform" repository  
    echo 5. Render will auto-detect settings from render.yaml
    echo 6. Click "Create Static Site"
    echo.
    echo 🚀 RENDER ADVANTAGES:
    echo • Automatic deployments from GitHub
    echo • 750 free hours/month (more than Netlify)
    echo • Better performance and caching
    echo • Free SSL certificates
    echo • PR preview deployments
    echo • Global CDN included
    echo.
    echo Your site will be at: https://fo-trading-platform-xxxx.onrender.com
) else (
    echo.
    echo ❌ ERROR: Failed to push to GitHub
    echo Please check your repository URL and try again.
)

echo.
pause