@echo off
echo ==================================================
echo F&O Trading Platform - Netlify Deployment Script
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
git commit -m "Deploy: Ready for production deployment"
git push origin main

echo.
echo ==================================================
echo SUCCESS: Application is ready for Netlify deployment!
echo ==================================================
echo.
echo Next steps:
echo 1. Go to https://app.netlify.com
echo 2. Click "New site from Git"
echo 3. Connect your GitHub repository
echo 4. Set build command: npm run build
echo 5. Set publish directory: build
echo 6. Click "Deploy site"
echo.
echo Your site will be available at: https://yoursite.netlify.app
echo ==================================================
pause