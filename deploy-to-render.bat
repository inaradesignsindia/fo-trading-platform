@echo off
echo 🚀 Deploying to Render.com...
echo.
echo 📋 Step 1: Your code is already pushed to GitHub!
echo ✅ Repository: https://github.com/inaradesignsindia/fo-trading-platform
echo.
echo 📋 Step 2: Connect to Render.com
echo 1. Visit: https://render.com
echo 2. Click "New +" → "Web Service"
echo 3. Connect your GitHub repository
echo 4. Render will auto-detect from render.yaml
echo.
echo 📋 Step 3: Configuration (Auto-detected)
echo - Environment: Node.js
echo - Build Command: cd server && npm install
echo - Start Command: cd server && npm start
echo - Port: 5000
echo.
echo 📋 Step 4: Environment Variables
echo - NODE_ENV: production
echo - PORT: 5000
echo.
echo 🎯 Your app will be live at: https://[your-app-name].onrender.com
echo.
echo 📚 Helpful Links:
echo - Backend Health: https://[your-app-name].onrender.com/api/health
echo - Deployment Guide: DEPLOYMENT_GUIDE.md
echo - UI Fixes: UI_FIXES.md
echo.
pause