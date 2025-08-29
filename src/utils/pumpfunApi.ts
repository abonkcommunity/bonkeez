import React from 'react';

// Configuration - Update this with your actual token address
const TOKEN_ADDRESS = "Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F";
const API_URL = `https://frontend-api.pump.fun/coins/${TOKEN_ADDRESS}`;
const WEBSOCKET_URL = 'wss://pumpportal.fun/api/data';

// Backup API endpoints (in case primary fails)
const BACKUP_APIs = [
  `https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`,
  `https://api.solscan.io/token/meta?token=${TOKEN_ADDRESS}`,
];

// CORS proxy options (for development/testing)
const CORS_PROXIES = [
  'https://api.allorigins.win/get?url=',
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
];

// TypeScript interfaces
export interface TokenData {
  price: string;
  change24h: number;
  marketCap: string;
  volume24h: string;
  holders: string;
  totalSupply: string;
  lastUpdated?: string;
}

// Mock data with more realistic values
const generateMockData = (): TokenData => {
  // Simulate some variation in mock data
  const basePrice = 0.0024;
  const variation = (Math.random() - 0.5) * 0.0001;
  const currentPrice = basePrice + variation;

  const change24h = (Math.random() - 0.5) * 30; // -15% to +15%

  return {
    price: `$${currentPrice.toFixed(6)}`,
    change24h: Number(change24h.toFixed(1)),
    marketCap: `$${(2.4 + (Math.random() - 0.5) * 0.5).toFixed(1)}M`,
    volume24h: `$${(156 + Math.floor(Math.random() * 50)).toFixed(0)}K`,
    holders: `${1247 + Math.floor(Math.random() * 100)}`,
    totalSupply: '1B BNKZ',
    lastUpdated: new Date().toLocaleTimeString()
  };
};

// Helper function to format currency values
function formatCurrency(value: number): string {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
}

// Helper function to format numbers
function formatNumber(value: any): string {
  if (typeof value === 'number') {
    return value.toLocaleString();
  } else if (typeof value === 'string' && !isNaN(Number(value))) {
    return Number(value).toLocaleString();
  }
  return String(value);
}

// Try to fetch with CORS proxy
async function fetchWithCORSProxy(url: string, proxyIndex = 0): Promise<Response | null> {
  if (proxyIndex >= CORS_PROXIES.length) {
    return null;
  }

  try {
    const proxyUrl = CORS_PROXIES[proxyIndex] + encodeURIComponent(url);
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(8000) // 8 second timeout
    });

    if (!response.ok) {
      throw new Error(`Proxy ${proxyIndex} failed: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.warn(`CORS proxy ${proxyIndex} failed:`, error);
    // Try next proxy
    return fetchWithCORSProxy(url, proxyIndex + 1);
  }
}

// Enhanced API fetch function
export async function getTokenDataSafe(): Promise<TokenData | null> {
  console.log('Attempting to fetch token data...');

  // Method 1: Try direct API call first
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; BonkeezApp/1.0)',
        'Origin': 'https://pump.fun',
        'Referer': 'https://pump.fun/',
      },
      mode: 'cors',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Direct API success:', data);
      return parseTokenData(data);
    }
  } catch (error) {
    console.warn('Direct API failed:', error);
  }

  // Method 2: Try CORS proxy
  console.log('Trying CORS proxy...');
  try {
    const proxyResponse = await fetchWithCORSProxy(API_URL);
    if (proxyResponse) {
      const text = await proxyResponse.text();
      // Handle AllOrigins response format
      let data = text;
      try {
        const parsed = JSON.parse(text);
        if (parsed.contents) {
          data = JSON.parse(parsed.contents);
        } else if (parsed.data) {
          data = parsed.data;
        } else {
          data = parsed;
        }
      } catch (e) {
        console.warn('Failed to parse proxy response');
      }

      if (data && typeof data === 'object') {
        console.log('Proxy API success:', data);
        return parseTokenData(data);
      }
    }
  } catch (error) {
    console.warn('Proxy API failed:', error);
  }

  // Method 3: Try backup APIs
  console.log('Trying backup APIs...');
  for (const backupUrl of BACKUP_APIs) {
    try {
      const response = await fetch(backupUrl, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(5000)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Backup API success:', data);
        return parseBackupApiData(data);
      }
    } catch (error) {
      console.warn(`Backup API ${backupUrl} failed:`, error);
    }
  }

  console.log('All API methods failed, returning null to trigger mock data');
  return null; // This will trigger mock data usage
}

// Parse data from primary API
function parseTokenData(data: any): TokenData | null {
  try {
    // Handle different possible API response structures
    const price = data.usdMarketCap && data.supply ? 
      (data.usdMarketCap / data.supply) : 
      (data.priceUsd ?? data.price ?? data.virtualSolAmount ?? 0);

    const marketCap = data.usdMarketCap ?? data.marketCap ?? data.market_cap ?? 0;
    const volume24h = data.usdVolume24h ?? data.volume24h ?? data.volume_24h ?? 0;
    const holders = data.holders ?? data.uniqueWallets ?? data.holder_count ?? "N/A";
    const supply = data.supply ?? data.totalSupply ?? data.total_supply ?? 0;
    const change24h = data.change24h ?? data.priceChange24h ?? data.price_change_24h ?? 0;

    // Safely format values, providing defaults if they are missing or invalid
    const formattedPrice = price ? `$${Number(price).toFixed(6)}` : "$0.000000";
    const formattedMarketCap = marketCap ? formatCurrency(marketCap) : "N/A";
    const formattedVolume24h = volume24h ? formatCurrency(volume24h) : "N/A";
    const formattedHolders = formatNumber(holders);
    const formattedSupply = supply ? formatNumber(supply) : "1B BNKZ";
    const formattedChange24h = typeof change24h === 'number' ? change24h : 0;


    return {
      price: formattedPrice,
      change24h: formattedChange24h,
      marketCap: formattedMarketCap,
      volume24h: formattedVolume24h,
      holders: formattedHolders,
      totalSupply: formattedSupply,
      lastUpdated: new Date().toLocaleTimeString()
    };
  } catch (error) {
    console.error('Error parsing token data:', error);
    return null;
  }
}

// Parse data from backup APIs (different format)
function parseBackupApiData(data: any): TokenData | null {
  try {
    // Handle DexScreener format
    if (data.pairs && Array.isArray(data.pairs) && data.pairs.length > 0) {
      const pair = data.pairs[0];
      return {
        price: `$${Number(pair.priceUsd || 0).toFixed(6)}`,
        change24h: Number(pair.priceChange?.h24 || 0),
        marketCap: pair.marketCap ? formatCurrency(pair.marketCap) : "N/A",
        volume24h: pair.volume?.h24 ? formatCurrency(pair.volume.h24) : "N/A",
        holders: "N/A",
        totalSupply: "1B BNKZ",
        lastUpdated: new Date().toLocaleTimeString()
      };
    }

    // Handle other formats by attempting to parse them like the primary API
    return parseTokenData(data);
  } catch (error) {
    console.error('Error parsing backup API data:', error);
    return null;
  }
}

// URL generators
export function getPumpfunUrl(): string {
  return `https://pump.fun/coin/${TOKEN_ADDRESS}`;
}

export function getSolscanUrl(): string {
  return `https://solscan.io/token/${TOKEN_ADDRESS}`;
}

export function getDexScreenerUrl(): string {
  return `https://dexscreener.com/solana/${TOKEN_ADDRESS}`;
}

// Get mock data (exported for external use)
export function getMockTokenData(): TokenData {
  return generateMockData();
}

// Enhanced WebSocket connection utilities
export class PumpfunWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private subscriptions: Set<string> = new Set();
  private isManuallyDisconnected = false;

  constructor(
    private onMessage: (data: any) => void,
    private onConnectionChange: (connected: boolean) => void
  ) {}

  connect(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return; // Already connected
    }

    this.isManuallyDisconnected = false;

    try {
      this.ws = new WebSocket(WEBSOCKET_URL);

      this.ws.onopen = () => {
        console.log('Connected to PumpPortal WebSocket');
        this.onConnectionChange(true);
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;

        // Resubscribe to all previous subscriptions
        this.subscriptions.forEach(subscription => {
          this.send(JSON.parse(subscription));
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.onMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        this.onConnectionChange(false);

        if (!this.isManuallyDisconnected) {
          this.attemptReconnect();
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.onConnectionChange(false);
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.onConnectionChange(false);
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts && !this.isManuallyDisconnected) {
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
        this.reconnectAttempts++;
        this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000); // Max 30 seconds
        this.connect();
      }, this.reconnectDelay);
    } else {
      console.error('Max reconnection attempts reached or manually disconnected');
    }
  }

  send(message: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const messageStr = JSON.stringify(message);
      this.ws.send(messageStr);

      // Store subscription for reconnection
      if (message.method && message.method.startsWith('subscribe')) {
        this.subscriptions.add(messageStr);
      } else if (message.method && message.method.startsWith('unsubscribe')) {
        // Find and remove the corresponding subscribe message
        const subscribeMethod = message.method.replace('unsubscribe', 'subscribe');
        for (const sub of this.subscriptions) {
          const subObj = JSON.parse(sub);
          if (subObj.method === subscribeMethod &&
              JSON.stringify(subObj.keys) === JSON.stringify(message.keys)) {
            this.subscriptions.delete(sub);
            break;
          }
        }
      }
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  // Subscribe to token trades for our specific token
  subscribeToTokenTrades(): void {
    this.send({
      method: "subscribeTokenTrade",
      keys: [TOKEN_ADDRESS]
    });
  }

  unsubscribeFromTokenTrades(): void {
    this.send({
      method: "unsubscribeTokenTrade",
      keys: [TOKEN_ADDRESS]
    });
  }

  disconnect(): void {
    this.isManuallyDisconnected = true;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscriptions.clear();
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN ?? false;
  }
}

// React hook for using the WebSocket
export function usePumpfunWebSocket(
  onMessage: (data: any) => void,
  onConnectionChange: (connected: boolean) => void
) {
  const wsRef = React.useRef<PumpfunWebSocket | null>(null);

  React.useEffect(() => {
    wsRef.current = new PumpfunWebSocket(onMessage, onConnectionChange);
    wsRef.current.connect();

    return () => {
      wsRef.current?.disconnect();
    };
  }, [onMessage, onConnectionChange]);

  return wsRef.current;
}

// Utility function to validate Solana addresses
export function isValidSolanaAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false;
  if (address.length < 32 || address.length > 44) return false;

  // Check for valid base58 characters
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
  return base58Regex.test(address);
}

// Test connection to APIs
export async function testApiConnections(): Promise<{
  direct: boolean;
  proxy: boolean;
  backup: boolean;
}> {
  const results = {
    direct: false,
    proxy: false,
    backup: false
  };

  // Test direct connection
  try {
    const response = await fetch(API_URL, {
      method: 'HEAD',
      mode: 'cors',
      signal: AbortSignal.timeout(3000)
    });
    results.direct = response.ok;
  } catch (error) {
    console.log('Direct API test failed');
  }

  // Test proxy connection
  try {
    const proxyResponse = await fetchWithCORSProxy(API_URL);
    results.proxy = !!proxyResponse;
  } catch (error) {
    console.log('Proxy API test failed');
  }

  // Test backup APIs
  for (const backupUrl of BACKUP_APIs) {
    try {
      const response = await fetch(backupUrl, {
        method: 'HEAD',
        signal: AbortSignal.timeout(3000)
      });
      if (response.ok) {
        results.backup = true;
        break;
      }
    } catch (error) {
      continue;
    }
  }

  return results;
}

// Export constants for external use
export { TOKEN_ADDRESS, WEBSOCKET_URL, API_URL };