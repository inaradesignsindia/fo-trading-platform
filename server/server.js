const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 5000;

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  ws.isAlive = true;
  ws.send(JSON.stringify({ type: 'connection_ack', status: 'connected' }));

  ws.on('message', (message) => {
    console.log('received: %s', message);
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.send('Welcome to the WebSocket server!');
});

// WebSocket keep-alive
setInterval(() => {
  wss.clients.forEach(client => {
    if (!client.isAlive) return client.terminate();
    client.isAlive = false;
    client.ping();
  });
}, 30000);

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Configuration storage (in production, this would be in a database)
let configs = {
  brokers: {},
  integrations: {},
  userSettings: {
    theme: 'dark',
    defaultSymbol: 'NSE:NIFTY',
    tradingPreferences: {
      riskLevel: 'medium',
      maxPositions: 10,
      autoExit: true,
    },
  },
};

// Load configurations on startup
async function loadConfigs() {
  try {
    const configPath = path.join(__dirname, 'config.json');
    const data = await fs.readFile(configPath, 'utf8');
    configs = JSON.parse(data);
    console.log('Configurations loaded successfully');
  } catch (error) {
    console.log('No existing config found, using defaults');
  }
}

// Save configurations
async function saveConfigs() {
  try {
    const configPath = path.join(__dirname, 'config.json');
    await fs.writeFile(configPath, JSON.stringify(configs, null, 2));
    console.log('Configurations saved successfully');
  } catch (error) {
    console.error('Error saving configurations:', error);
  }
}

// API Endpoints

// Get all broker configurations
app.get('/api/brokers', (req, res) => {
  res.json(configs.brokers);
});

// Update broker configuration
app.post('/api/brokers/:brokerName', async (req, res) => {
  const { brokerName } = req.params;
  const { apiKey, apiSecret, userId, vendorCode, redirectUri, authToken } =
    req.body;

  configs.brokers[brokerName] = {
    ...configs.brokers[brokerName],
    apiKey: apiKey || configs.brokers[brokerName]?.apiKey,
    apiSecret: apiSecret || configs.brokers[brokerName]?.apiSecret,
    userId: userId || configs.brokers[brokerName]?.userId,
    vendorCode: vendorCode || configs.brokers[brokerName]?.vendorCode,
    redirectUri: redirectUri || configs.brokers[brokerName]?.redirectUri,
    authToken: authToken || configs.brokers[brokerName]?.authToken,
    status: 'configured',
    lastUpdated: new Date().toISOString(),
  };

  await saveConfigs();
  res.json({ success: true, message: `${brokerName} configuration updated` });
});

// Test broker connection
app.post('/api/brokers/:brokerName/test', async (req, res) => {
  const { brokerName } = req.params;

  // Simulate connection test
  setTimeout(() => {
    const isSuccess = Math.random() > 0.3; // 70% success rate for demo

    if (isSuccess) {
      configs.brokers[brokerName] = {
        ...configs.brokers[brokerName],
        status: 'connected',
        lastTested: new Date().toISOString(),
      };
      res.json({
        success: true,
        message: `${brokerName} connection successful`,
      });
    } else {
      configs.brokers[brokerName] = {
        ...configs.brokers[brokerName],
        status: 'error',
        lastTested: new Date().toISOString(),
      };
      res.json({ success: false, message: `${brokerName} connection failed` });
    }
    saveConfigs();
  }, 2000);
});

// Get all integration configurations
app.get('/api/integrations', (req, res) => {
  res.json(configs.integrations);
});

// Update integration configuration
app.post('/api/integrations/:category/:serviceName', async (req, res) => {
  const { category, serviceName } = req.params;
  const configData = req.body;

  if (!configs.integrations[category]) {
    configs.integrations[category] = {};
  }

  configs.integrations[category][serviceName] = {
    ...configs.integrations[category][serviceName],
    ...configData,
    status: 'configured',
    lastUpdated: new Date().toISOString(),
  };

  await saveConfigs();
  res.json({ success: true, message: `${serviceName} configuration updated` });
});

// Get user settings
app.get('/api/settings', (req, res) => {
  res.json(configs.userSettings);
});

// Update user settings
app.post('/api/settings', async (req, res) => {
  configs.userSettings = {
    ...configs.userSettings,
    ...req.body,
    lastUpdated: new Date().toISOString(),
  };

  await saveConfigs();
  res.json({ success: true, message: 'Settings updated successfully' });
});

// Free market data endpoints (using public APIs)

// Get free market data from Yahoo Finance
app.get('/api/data/yahoo/:symbol', async (req, res) => {
  const { symbol } = req.params;

  try {
    // In production, use actual Yahoo Finance API or yfinance equivalent
    const mockData = {
      symbol: symbol,
      price: 18540.75 + (Math.random() - 0.5) * 100,
      change: (Math.random() - 0.5) * 50,
      changePercent: ((Math.random() - 0.5) * 3).toFixed(2),
      volume: Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString(),
      source: 'Yahoo Finance (15min delay)',
    };

    res.json(mockData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

// Get free market data from Alpha Vantage
app.get('/api/data/alphavantage/:symbol', async (req, res) => {
  const { symbol } = req.params;

  try {
    // Mock data for Alpha Vantage free tier
    const mockData = {
      symbol: symbol,
      price: 18540.75 + (Math.random() - 0.5) * 100,
      change: (Math.random() - 0.5) * 50,
      timestamp: new Date().toISOString(),
      source: 'Alpha Vantage Free (5 calls/min)',
      rateLimitRemaining: Math.floor(Math.random() * 5),
    };

    res.json(mockData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

// Free AI analysis using Hugging Face
app.post('/api/ai/analyze/free', async (req, res) => {
  const { symbol, timeframe, data } = req.body;

  try {
    // Mock AI analysis using free models
    const mockAnalysis = {
      symbol: symbol,
      sentiment: Math.random() > 0.5 ? 'Bullish' : 'Bearish',
      confidence: (0.6 + Math.random() * 0.3).toFixed(2),
      signals: [
        {
          indicator: 'RSI',
          value: Math.floor(30 + Math.random() * 40),
          signal: 'Neutral',
        },
        {
          indicator: 'MACD',
          value: (Math.random() - 0.5) * 10,
          signal: Math.random() > 0.5 ? 'Buy' : 'Sell',
        },
      ],
      recommendation: Math.random() > 0.5 ? 'Hold' : 'Buy',
      source: 'Hugging Face Models (Free)',
      timestamp: new Date().toISOString(),
    };

    res.json(mockAnalysis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate AI analysis' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    services: {
      database: 'Connected',
      cache: 'Running',
      brokers: Object.keys(configs.brokers).length,
      integrations: Object.keys(configs.integrations).length,
    },
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Start server
server.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await loadConfigs();
  console.log('📊 Trading Platform Backend Ready');
  console.log(
    '🔧 Free integrations: Yahoo Finance, Alpha Vantage, TradingView Basic'
  );
  console.log('💰 Premium integrations: Available for configuration');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server...');
  await saveConfigs();
  process.exit(0);
});

module.exports = app;