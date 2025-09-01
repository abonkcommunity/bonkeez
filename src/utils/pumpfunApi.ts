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

// Fetch token data safely
export async function getTokenDataSafe(): Promise<TokenData | null> {
  try {
    const res = await fetch(`/api/pumpfun/${CA}`)
    if (!res.ok) throw new Error("Failed to fetch BNKZ token data")
    return await res.json()
  } catch (err) {
    console.error("Error fetching BNKZ token data:", err)
    return null
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