const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the Vite build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

// API Routes
app.get('/api/pumpfun/:token', async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ error: 'Missing contract address' });
  }

  try {
    const response = await fetch(`https://frontend-api.pump.fun/coins/${token}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Pumpfun API returned status:', response.status);
      return res.status(response.status).json({ error: 'Failed to fetch token data' });
    }

    const data = await response.json();
    
    // Transform the data to match the expected format
    const tokenData = {
      price: data.usd_market_cap ? `$${(data.usd_market_cap / data.total_supply * 1000000).toFixed(6)}` : '$0.000001',
      marketCap: data.usd_market_cap ? `$${(data.usd_market_cap / 1000000).toFixed(2)}M` : 'N/A',
      volume24h: data.volume_24h ? `$${(data.volume_24h / 1000000).toFixed(2)}M` : 'N/A',
      holders: data.holder_count ? data.holder_count.toString() : 'N/A',
      totalSupply: data.total_supply ? `${(data.total_supply / 1000000000).toFixed(1)}B` : '1B',
      change24h: data.change_24h || 0
    };

    return res.status(200).json(tokenData);
  } catch (error) {
    console.error('Pumpfun API Error:', error);
    // Return fallback data instead of error to keep the frontend working
    return res.status(200).json({
      price: "$0.000001",
      marketCap: "N/A",
      volume24h: "N/A",
      holders: "N/A",
      totalSupply: "1B",
      change24h: 0
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve the frontend in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📊 API available at http://0.0.0.0:${PORT}/api/pumpfun/:token`);
});