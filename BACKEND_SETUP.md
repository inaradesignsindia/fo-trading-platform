# F&O Trading Platform - Backend Setup Guide

## Overview

This F&O Trading Platform now includes a Node.js/Express backend that handles:

- **Free API Integrations**: Yahoo Finance, Alpha Vantage Free, IEX Cloud, etc.
- **Premium API Management**: TradingView Pro, paid data feeds, etc.
- **Configuration Storage**: Broker settings, user preferences
- **AI Services**: Free models from Hugging Face, Google Gemini, etc.

## Architecture

```
Frontend (React) ←→ Backend API (Express) ←→ External APIs
     ↓                      ↓                    ↓
Browser View        Configuration DB        Free/Premium Services
```

## Backend Setup

### 1. Install Backend Dependencies

```bash
# Install backend packages
npm run server:install

# Or manually:
cd server
npm install
```

### 2. Environment Configuration

Create `server/.env` file:

```env
PORT=5000
NODE_ENV=development

# Free API Keys (Optional - fallback to mock data if not provided)
YAHOO_FINANCE_API_KEY=your_key_here
ALPHA_VANTAGE_API_KEY=your_free_key_here
IEX_CLOUD_TOKEN=your_public_token_here

# Premium API Keys (Optional)
TRADINGVIEW_USERNAME=your_username
TRADINGVIEW_API_KEY=your_premium_key

# AI Services (Free)
HUGGINGFACE_API_TOKEN=your_free_token
GEMINI_API_KEY=your_free_key
```

### 3. Start Development

```bash
# Start both frontend and backend together
npm run dev:full

# Or start them separately:
# Terminal 1: Backend
npm run server:dev

# Terminal 2: Frontend  
npm start
```

## Free Services Integration

### Data Sources (No Cost)
- **Yahoo Finance**: 15-minute delayed data, unlimited calls
- **Alpha Vantage Free**: 5 API calls per minute, 500 calls per day
- **IEX Cloud**: 100,000 calls per month free tier
- **Quandl/Nasdaq**: Free economic datasets

### Charting Solutions
- **TradingView Basic**: Free widgets with limited features
- **Lightweight Charts**: Open-source TradingView library, fully free
- **Chart.js**: Alternative free charting library

### AI Analysis (Free)
- **Hugging Face**: Free inference API with rate limits
- **Google Gemini Pro**: 60 queries per minute free tier
- **Technical Analysis Library**: Local processing, no API required

## Premium Services (Optional Upgrades)

### Data Feeds
- **NSE/BSE Real-time**: ₹3,000/month for live data
- **TradingView Premium**: $14.95/month for advanced features
- **Alpha Vantage Premium**: $49.99/month for unlimited calls

### AI Services
- **OpenAI GPT-4**: Pay-per-token pricing
- **Custom ML Models**: Deploy your own models

## API Endpoints

### Free Services
```
GET  /api/data/yahoo/:symbol        - Yahoo Finance data (free)
GET  /api/data/alphavantage/:symbol - Alpha Vantage free tier
GET  /api/data/iex/:symbol          - IEX Cloud free data
POST /api/ai/analyze/free           - Free AI analysis
```

### Configuration
```
GET  /api/brokers                   - Get broker configurations
POST /api/brokers/:name             - Update broker settings
GET  /api/integrations              - Get all integrations
POST /api/integrations/:cat/:svc    - Update integration
```

### System
```
GET /api/health                     - System health check
GET /api/status                     - Service status
```

## Browser Optimization Features

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Optimized for tablets and desktop trading setups
- Touch-friendly controls for mobile trading

### Performance
- Lazy loading for heavy components
- WebSocket connections for real-time data
- Efficient state management with React hooks

### Progressive Web App (PWA)
- Offline capability for cached data
- App-like experience on mobile devices
- Background sync for trade updates

## Deployment Options

### Development
```bash
npm run dev:full
```

### Production Build
```bash
npm run build:full
```

### Docker Deployment
```bash
# Using existing Docker setup
cd NuralML_AI_PipeLine/docker
docker-compose up -d
```

## Free vs Premium Comparison

| Feature | Free Version | Premium Version |
|---------|--------------|-----------------|
| Market Data | 15-min delay | Real-time |
| API Calls | Rate limited | Unlimited |
| AI Analysis | Basic models | Advanced GPT-4 |
| Charts | Basic widgets | Full TradingView |
| Indicators | 5-10 basic | 100+ advanced |
| Alerts | Email only | SMS + Telegram |

## Troubleshooting

### Common Issues

1. **Backend not starting**
   ```bash
   cd server
   npm install
   npm start
   ```

2. **CORS errors**
   - Backend runs on port 5000
   - Frontend runs on port 3000
   - CORS is configured automatically

3. **API rate limits**
   - Free APIs have built-in rate limiting
   - Check console for rate limit messages
   - Consider upgrading to premium if needed

### Support

- Check browser console for errors
- Review `server.log` for backend issues
- Use health endpoint: `http://localhost:5000/api/health`

## Next Steps

1. **Configure your free API keys** in `server/.env`
2. **Test the integrations** in Settings > Integrations
3. **Customize the dashboard** with your preferred free services
4. **Consider premium upgrades** as your trading volume grows

The platform is designed to work excellently with free services, with premium features available as optional upgrades when needed.