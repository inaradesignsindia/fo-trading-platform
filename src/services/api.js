import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? '' // Same origin in production
    : 'http://localhost:5000'; // Development server

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

// Broker API functions
export const brokerAPI = {
    // Get all broker configurations
    getAll: () => api.get('/api/brokers'),
    
    // Update broker configuration
    update: (brokerName, config) => api.post(`/api/brokers/${brokerName}`, config),
    
    // Test broker connection
    test: (brokerName) => api.post(`/api/brokers/${brokerName}/test`),
    
    // Delete broker configuration
    delete: (brokerName) => api.delete(`/api/brokers/${brokerName}`)
};

// Integration API functions
export const integrationAPI = {
    // Get all integration configurations
    getAll: () => api.get('/api/integrations'),
    
    // Update integration configuration
    update: (category, serviceName, config) => 
        api.post(`/api/integrations/${category}/${serviceName}`, config),
    
    // Test integration
    test: (category, serviceName) => 
        api.post(`/api/integrations/${category}/${serviceName}/test`)
};

// User settings API functions
export const settingsAPI = {
    // Get user settings
    get: () => api.get('/api/settings'),
    
    // Update user settings
    update: (settings) => api.post('/api/settings', settings)
};

// Free market data API functions
export const marketDataAPI = {
    // Get data from Yahoo Finance (free)
    getYahooData: (symbol) => api.get(`/api/data/yahoo/${symbol}`),
    
    // Get data from Alpha Vantage (free tier)
    getAlphaVantageData: (symbol) => api.get(`/api/data/alphavantage/${symbol}`),
    
    // Get data from IEX Cloud (free)
    getIEXData: (symbol) => api.get(`/api/data/iex/${symbol}`),
    
    // Get multiple symbols data
    getBulkData: (symbols) => api.post('/api/data/bulk', { symbols }),
    
    // Get historical data
    getHistoricalData: (symbol, period = '1y', interval = '1d') => 
        api.get(`/api/data/historical/${symbol}`, { params: { period, interval } })
};

// Free AI analysis API functions
export const aiAPI = {
    // Get free AI analysis using Hugging Face models
    getFreeAnalysis: (symbol, timeframe, data) => 
        api.post('/api/ai/analyze/free', { symbol, timeframe, data }),
    
    // Get technical analysis (free)
    getTechnicalAnalysis: (symbol, indicators) => 
        api.post('/api/ai/technical', { symbol, indicators }),
    
    // Get sentiment analysis (free)
    getSentimentAnalysis: (symbol) => 
        api.get(`/api/ai/sentiment/${symbol}`)
};

// System health and status
export const systemAPI = {
    // Get system health
    getHealth: () => api.get('/api/health'),
    
    // Get service status
    getStatus: () => api.get('/api/status')
};

// WebSocket connection for real-time data
export class WebSocketManager {
    constructor() {
        this.ws = null;
        this.listeners = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    connect() {
        const wsUrl = process.env.NODE_ENV === 'production' 
            ? `wss://${window.location.host}/ws`
            : 'ws://localhost:5000/ws';

        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const listeners = this.listeners.get(data.type) || [];
                listeners.forEach(callback => callback(data));
            } catch (error) {
                console.error('WebSocket message parsing error:', error);
            }
        };

        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
            this.reconnect();
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    reconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => {
                console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
                this.connect();
            }, 1000 * this.reconnectAttempts);
        }
    }

    subscribe(eventType, callback) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType).push(callback);
    }

    unsubscribe(eventType, callback) {
        const listeners = this.listeners.get(eventType);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// Create singleton instance
export const wsManager = new WebSocketManager();

// Utility functions for API calls with error handling
export const apiUtils = {
    // Handle API errors gracefully
    handleError: (error) => {
        if (error.response) {
            // Server responded with error
            console.error('API Error:', error.response.status, error.response.data);
            return {
                success: false,
                message: error.response.data.message || 'Server error occurred',
                status: error.response.status
            };
        } else if (error.request) {
            // Network error
            console.error('Network Error:', error.request);
            return {
                success: false,
                message: 'Network error. Please check your connection.',
                status: 0
            };
        } else {
            // Other error
            console.error('Error:', error.message);
            return {
                success: false,
                message: error.message || 'An unexpected error occurred',
                status: -1
            };
        }
    },

    // Retry API calls with exponential backoff
    retryCall: async (apiFunction, maxRetries = 3, baseDelay = 1000) => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await apiFunction();
            } catch (error) {
                if (attempt === maxRetries) {
                    throw error;
                }
                
                const delay = baseDelay * Math.pow(2, attempt - 1);
                console.log(`API call failed, retrying in ${delay}ms... (attempt ${attempt}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    },

    // Check if service is free or premium
    isServiceFree: (serviceName) => {
        const freeServices = [
            'Yahoo Finance API (Free)',
            'Alpha Vantage Free',
            'IEX Cloud Free',
            'TradingView Basic (Free)',
            'Lightweight Charts (Free)',
            'Google Gemini Pro (Free)',
            'Hugging Face Models (Free)',
            'Technical Analysis Library (Free)'
        ];
        return freeServices.includes(serviceName);
    },

    // Get service tier
    getServiceTier: (serviceName) => {
        if (apiUtils.isServiceFree(serviceName)) {
            return 'free';
        }
        return serviceName.toLowerCase().includes('custom') ? 'custom' : 'premium';
    }
};

export default api;