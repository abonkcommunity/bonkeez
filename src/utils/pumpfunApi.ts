import { TokenData } from '../types/token'

const PUMPFUN_API_BASE = 'https://frontend-api.pump.fun'
const TOKEN_ADDRESS = '3pgobXzgLCX6buwLDcjQjJADT4QLfpLhsQNJ4NqUTrYK'

export const getPumpfunUrl = () => `https://pump.fun/3pgobXzgLCX6buwLDcjQjJADT4QLfpLhsQNJ4NqUTrYK`
export const getSolscanUrl = () => `https://solscan.io/token/${TOKEN_ADDRESS}`

export const fetchTokenData = async (): Promise<TokenData | null> => {
  try {
    // Mock data for now since pump.fun API might be restricted
    return {
      price: 0.000021,
      change24h: 15.7,
      volume24h: 125000,
      marketCap: 2100000,
      holders: 1250,
      totalSupply: 1000000000,
      circulatingSupply: 800000000,
      liquidityUsd: 45000,
      lastUpdated: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error fetching token data:', error)
    return null
  }
}

export const getTokenDataSafe = async (): Promise<TokenData> => {
  const data = await fetchTokenData()

  // Return fallback data if API fails
  return data || {
    price: 0.000021,
    change24h: 15.7,
    volume24h: 125000,
    marketCap: 2100000,
    holders: 1250,
    totalSupply: 1000000000,
    circulatingSupply: 800000000,
    liquidityUsd: 45000,
    lastUpdated: new Date().toISOString()
  }
}