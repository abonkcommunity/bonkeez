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
  try {
    // Use absolute URL on server-side, relative on client-side
    const baseUrl = typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL || "https://bonkeez.com"
      : ""

    const res = await fetch(`${baseUrl}/api/pumpfun/${CA}`)

    if (!res.ok) throw new Error(`Failed to fetch BNKZ token data (status ${res.status})`)

    return (await res.json()) as TokenData
  } catch (err) {
    console.error("Error fetching BNKZ token data:", err)
    // Fallback data in case API fails
    return {
      price: "$0.000001",
      marketCap: "N/A",
      volume24h: "N/A",
      holders: "N/A",
      totalSupply: "1B",
      change24h: 0
    }
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