@echo off
echo ============================================
echo F&O Trading Platform - GitHub Setup
echo ============================================

echo.
echo STEP 1: Create GitHub Repository
echo ---------------------------------
echo 1. Go to https://github.com/new
echo 2. Repository name: fo-trading-platform
echo 3. Description: F&O Trading Platform - React Web Application  
echo 4. Set to PUBLIC (required for free Netlify)
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
    echo 1. Go to https://netlify.com
    echo 2. Click "Add new site" → "Import from Git"  
    echo 3. Select GitHub and your repository
    echo 4. Build command: npm run build
    echo 5. Publish directory: build
    echo 6. Click "Deploy site"
    echo.
    echo Your CI/CD pipeline is already configured!
    echo Every push to main will auto-deploy to Netlify.
) else (
    echo.
    echo ❌ ERROR: Failed to push to GitHub
    echo Please check your repository URL and try again.
)

echo.
pause