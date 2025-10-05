@echo off
echo ==================================================
echo F&O Trading Platform - Render Deployment Script
echo ==================================================

echo.
echo Step 1: Building the application...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo Build failed! Please fix errors and try again.
    pause
    exit /b 1
)

echo.
echo Step 2: Running tests...
call npm test -- --coverage --watchAll=false
if %ERRORLEVEL% neq 0 (
    echo Tests failed! Please fix tests and try again.
    pause
    exit /b 1
)

echo.
echo Step 3: Git operations...
git add .
git commit -m "Deploy: Ready for Render production deployment"
git push origin main

echo.
echo ==================================================
echo SUCCESS: Application is ready for Render deployment!
echo ==================================================
echo.
echo Next steps:
echo 1. Go to https://render.com
echo 2. Click "New +" → "Static Site"
echo 3. Connect your GitHub repository
echo 4. Render will auto-detect render.yaml settings
echo 5. Click "Create Static Site"
echo.
echo 🚀 RENDER ADVANTAGES:
echo • 750 hours/month free tier (more than Netlify)
echo • Automatic SSL and CDN
echo • PR preview deployments  
echo • Better build caching
echo • Global edge network
echo.
echo Your site will be at: https://fo-trading-platform-xxxx.onrender.com
echo ==================================================
pause