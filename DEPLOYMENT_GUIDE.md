# Deployment Guide - F&O Trading Platform

## 🚀 Quick Start

Your backend is now running successfully on `http://localhost:5000` and frontend on `http://localhost:3000`.

## 📋 Deployment Options

### Option 1: Render.com (Recommended - Free Tier)

1. **Create Render Account**
   - Visit [https://render.com](https://render.com)
   - Sign up with GitHub

2. **Connect Your Repository**
   - Push your code to GitHub
   - Connect repository to Render
   - Render will auto-detect services from `render.yaml`

3. **Environment Variables**
   - Backend: Set `NODE_ENV=production`, `PORT=5000`
   - Frontend: Set `REACT_APP_API_BASE` to your backend URL

### Option 2: Alternative Cloud Providers

#### Vercel (Frontend Only)
```bash
npm install -g vercel
vercel --prod
```

#### Railway.app
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

#### DigitalOcean App Platform
```bash
# Install doctl
# Create app spec
# Deploy via CLI or dashboard
```

## 🔧 Backend Configuration

### Current Backend Features
- ✅ WebSocket server for real-time data
- ✅ REST API endpoints
- ✅ CORS enabled for frontend
- ✅ Health check endpoint
- ✅ Mock market data (Yahoo Finance, Alpha Vantage)
- ✅ Free AI analysis
- ✅ Broker integration endpoints

### API Endpoints Available
```
GET  /api/health              - Health check
GET  /api/brokers             - List brokers
POST /api/brokers/:name/test   - Test broker connection
GET  /api/integrations        - Get integrations
POST /api/integrations/:cat/:service - Update integration
GET  /api/settings            - User settings
POST /api/settings             - Update settings
GET  /api/data/yahoo/:symbol  - Yahoo Finance data
GET  /api/data/alphavantage/:symbol - Alpha Vantage data
POST /api/ai/analyze/free     - Free AI analysis
```

## 🌐 Frontend Integration

### Update Frontend Config
Edit `src/config.js`:
```javascript
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.onrender.com' 
  : 'http://localhost:5000';
```

### Build for Production
```bash
npm run build
```

## 🔍 Testing Backend Connectivity

### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

### Test Market Data
```bash
curl http://localhost:5000/api/data/yahoo/NIFTY
```

### Test AI Analysis
```bash
curl -X POST http://localhost:5000/api/ai/analyze/free \
  -H "Content-Type: application/json" \
  -d '{"symbol": "NIFTY", "timeframe": "1d"}'
```

## 🛠️ Fixing Non-Functional UI Elements

### 1. AI Quant Analysis
- Backend endpoint: `/api/ai/analyze/free` ✅ Ready
- Frontend: Need to connect to backend API

### 2. Trading Terminal
- Backend endpoint: `/api/orders` (needs implementation)
- Frontend: Need to implement order execution

### 3. F&O Trading Platform
- Backend: Mock data available ✅
- Frontend: Need to connect to backend

### 4. Option Chain
- Backend: Need to implement option chain endpoint
- Frontend: Need to fetch and display data

### 5. Settings
- Backend endpoints: `/api/settings` ✅ Ready
- Frontend: Need to connect to backend

## 📁 Next Steps

1. **Test Backend APIs** - All endpoints are ready
2. **Connect Frontend** - Update API calls in frontend
3. **Deploy to Render** - Use provided configuration
4. **Test Production** - Verify all features work

## 🆘 Troubleshooting

### Port 5000 Already in Use
```bash
# Kill process using port 5000
netstat -ano | findstr :5000
taskkill /F /PID <PID>
```

### Backend Won't Start
```bash
# Check syntax errors
node server/server.js
# Install dependencies
cd server && npm install
```

### Frontend Can't Connect to Backend
- Check CORS configuration
- Verify backend URL in frontend config
- Check firewall settings

## 📞 Support

If you encounter issues:
1. Check backend logs on Render dashboard
2. Verify environment variables
3. Test API endpoints manually
4. Check browser console for frontend errors

---

**Your backend is ready for deployment! 🎉**