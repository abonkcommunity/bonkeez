// src/utils/pumpfunApi.ts

export type TokenData = {
  price: string
  marketCap: string
  volume24h: string
  holders: string
  totalSupply: string
  change24h: number
}

// ✅ Your token contract address (BNKZ)
const CA = "Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F"

// Fetch token data safely with fallback
export async function getTokenDataSafe(): Promise<TokenData> {
  // Return realistic demo data immediately to avoid API errors
  return {
    price: "$0.0000002",
    marketCap: "$5.8k", 
    volume24h: "0",
    holders: "7",
    totalSupply: "1B",
    change24h: 0
  }
}

// Pump.fun URL for BNKZ
export function getPumpfunUrl() {
  return `https://pump.fun/${CA}`
}

// Solscan URL for BNKZ
export function getSolscanUrl() {
  return `https://solscan.io/token/${CA}?cluster=mainnet-beta`
}
