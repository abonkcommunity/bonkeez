// pumpfunApi.ts - More reliable pump.fun token data fetching
import React from 'react';

// Configuration
const TOKEN_ADDRESS = "Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F";

// Updated API endpoints - using more reliable sources
const API_ENDPOINTS = {
  // PumpPortal API (more reliable for pump.fun data)
  pumpPortal: `https://api.pumpportal.fun/coin/${TOKEN_ADDRESS}`,

  // Alternative pump.fun endpoints to try
  pumpFunDirect: `https://pump.fun/coin/${TOKEN_ADDRESS}`, // For scraping if needed
  pumpFunApi: `https://frontend-api.pump.fun/coins/${TOKEN_ADDRESS}`,

  // Backup APIs with better reliability
  dexScreener: `https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`,
  solscan: `https://pro-api.solscan.io/v1.0/token/meta?tokenAddress=${TOKEN_ADDRESS}`,
  birdeye: `https://public-api.birdeye.so/defi/token_overview?address=${TOKEN_ADDRESS}`,

  // Jupiter API for price data
  jupiter: `https://price.jup.ag/v4/price?ids=${TOKEN_ADDRESS}`,
};

// TypeScript interfaces
export interface TokenData {
  address: string;
  name: string;
  symbol: string;
  price: string;
  change24h: number;
  marketCap: string;
  volume24h: string;
  holders: string;
  totalSupply: string;
  liquidity?: string;
  isValid: boolean;
  lastUpdated: string;
  source: string;
}

export interface ApiResponse {
  success: boolean;
  data: TokenData | null;
  error?: string;
  source: string;
}

// Utility functions
function formatCurrency(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return 'N/A';

  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
  return `$${num.toFixed(2)}`;
}

// Enhanced price formatting for very small values
function formatPrice(value: number | string, isPrice = false): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num) || num === 0) return isPrice ? '$0.00000000' : 'N/A';

  if (!isPrice) {
    // For non-price values (market cap, volume), use regular currency formatting
    return formatCurrency(num);
  }

  // For prices, use high precision formatting
  if (num >= 1) {
    return `$${num.toFixed(4)}`; // $1.2345
  } else if (num >= 0.0001) {
    return `$${num.toFixed(8)}`; // $0.12345678
  } else if (num >= 0.000000001) {
    // For very small numbers, use up to 12 decimal places
    const formatted = num.toFixed(12);
    // Remove trailing zeros but keep at least 8 decimal places
    const trimmed = formatted.replace(/0+$/, '');
    const minDecimals = trimmed.indexOf('.') + 9; // 8 decimal places minimum
    if (trimmed.length < minDecimals) {
      return `$${num.toFixed(8)}`;
    }
    return `$${trimmed}`;
  } else {
    // For extremely small numbers, use scientific notation
    return `$${num.toExponential(6)}`;
  }
}

function formatNumber(value: any): string {
  if (value === null || value === undefined) return 'N/A';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);
  return num.toLocaleString();
}

// Enhanced fetch with better error handling
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = 10000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; TokenTracker/1.0)',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Try original pump.fun API with better error handling
async function fetchFromPumpFun(): Promise<TokenData | null> {
  try {
    console.log('Trying Pump.fun API...');
    const response = await fetchWithTimeout(API_ENDPOINTS.pumpFunApi, {
      headers: {
        'Origin': 'https://pump.fun',
        'Referer': 'https://pump.fun/',
      }
    });

    if (!response.ok) {
      console.log(`Pump.fun API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log('Pump.fun raw data:', data);

    // Enhanced price calculation for pump.fun API
    let price = 0;

    if (data.usd_market_cap && data.supply) {
      price = data.usd_market_cap / data.supply;
    } else if (data.price) {
      price = parseFloat(data.price);
    }

    console.log('Pump.fun price calculation:', {
      usd_market_cap: data.usd_market_cap,
      supply: data.supply,
      calculated_price: price,
      raw_price_field: data.price
    });

    return {
      address: TOKEN_ADDRESS,
      name: data.name || 'Bonkeez',
      symbol: data.symbol || 'BNKZ',
      price: formatPrice(price, true),
      change24h: parseFloat(data.price_change_24h || '0'),
      marketCap: formatPrice(data.usd_market_cap || 0),
      volume24h: formatPrice(data.volume_24h || 0),
      holders: formatNumber(data.holder_count || 'N/A'),
      totalSupply: formatNumber(data.supply || 0),
      isValid: true,
      lastUpdated: new Date().toISOString(),
      source: 'Pump.fun'
    };
  } catch (error) {
    console.warn('Pump.fun API failed:', error);
    return null;
  }
}

// Generate realistic mock data
function generateMockData(): TokenData {
  // Generate a more realistic small price for pump.fun tokens
  const basePriceExponent = Math.random() * 6 + 4; // Between 10^-4 and 10^-10
  const basePrice = Math.pow(10, -basePriceExponent) * (Math.random() * 9 + 1);
  const variation = basePrice * (Math.random() - 0.5) * 0.1; // 10% variation
  const currentPrice = Math.max(0, basePrice + variation);
  const change24h = (Math.random() - 0.5) * 50; // -25% to +25%

  console.log('Generated mock price:', {
    basePriceExponent,
    basePrice,
    currentPrice,
    formatted: formatPrice(currentPrice, true)
  });

  return {
    address: TOKEN_ADDRESS,
    name: 'Bonkeez',
    symbol: 'BNKZ',
    price: formatPrice(currentPrice, true),
    change24h: Number(change24h.toFixed(1)),
    marketCap: `$${(Math.random() * 5 + 0.5).toFixed(1)}M`,
    volume24h: `$${(Math.random() * 200 + 50).toFixed(0)}K`,
    holders: `${Math.floor(Math.random() * 1000 + 500)}`,
    totalSupply: '1B BNKZ',
    liquidity: `$${(Math.random() * 500 + 100).toFixed(0)}K`,
    isValid: false,
    lastUpdated: new Date().toISOString(),
    source: 'Mock'
  };
}

// Main function to get token data with fallback strategy
export async function getTokenData(): Promise<ApiResponse> {
  console.log(`Fetching data for token: ${TOKEN_ADDRESS}`);

  // Try primary API first
  try {
    const result = await fetchFromPumpFun();
    if (result) {
      console.log(`Successfully fetched from ${result.source}`);
      return {
        success: true,
        data: result,
        source: result.source
      };
    }
  } catch (error) {
    console.warn(`Primary API failed:`, error);
  }

  // If API fails, return mock data with warning
  console.warn('API failed, returning mock data');
  return {
    success: false,
    data: generateMockData(),
    error: 'API failed - showing mock data',
    source: 'Mock'
  };
}

// Safe wrapper function
export async function getTokenDataSafe(): Promise<TokenData> {
  try {
    const response = await getTokenData();
    return response.data || generateMockData();
  } catch (error) {
    console.error('Error in getTokenDataSafe:', error);
    return generateMockData();
  }
}

// URL generators
export function getPumpfunUrl(): string {
  return `https://pump.fun/coin/${TOKEN_ADDRESS}`;
}

export function getSolscanUrl(): string {
  return `https://solscan.io/token/${TOKEN_ADDRESS}`;
}

// Export constants
export { TOKEN_ADDRESS, API_ENDPOINTS };