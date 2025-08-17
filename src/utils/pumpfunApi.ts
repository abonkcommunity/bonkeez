// Pumpfun API integration for live token data
const PUMPFUN_API_BASE = 'https://frontend-api.pump.fun'
const TOKEN_CONTRACT = 'Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F'

export interface TokenData {
  price: string
  change24h: string
  marketCap: string
  volume24h: string
  holders: string
  totalSupply: string
  priceUsd: number
  marketCapUsd: number
  volume24hUsd: number
}

// Fallback data for when API is unavailable
const FALLBACK_DATA: TokenData = {
  price: '$0.0001',
  change24h: '+0.0%',
  marketCap: '$100K',
  volume24h: '$1.2K',
  holders: '247',
  totalSupply: '1B BNKZ',
  priceUsd: 0.0001,
  marketCapUsd: 100000,
  volume24hUsd: 1200
}

export const fetchTokenData = async (): Promise<TokenData> => {
  try {
    // Try to fetch from Pumpfun API
    const response = await fetch(`${PUMPFUN_API_BASE}/coins/${TOKEN_CONTRACT}`)
    
    if (!response.ok) {
      console.warn('Pumpfun API unavailable, using fallback data')
      return FALLBACK_DATA
    }

    const data = await response.json()
    
    // Transform Pumpfun data to our format
    return {
      price: `$${parseFloat(data.usd_market_cap / data.total_supply).toFixed(6)}`,
      change24h: `${data.price_change_24h >= 0 ? '+' : ''}${data.price_change_24h.toFixed(1)}%`,
      marketCap: formatCurrency(data.usd_market_cap),
      volume24h: formatCurrency(data.volume_24h),
      holders: data.holder_count?.toString() || '247',
      totalSupply: '1B BNKZ',
      priceUsd: data.usd_market_cap / data.total_supply,
      marketCapUsd: data.usd_market_cap,
      volume24hUsd: data.volume_24h
    }
  } catch (error) {
    console.warn('Error fetching token data:', error)
    return FALLBACK_DATA
  }
}

const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`
  } else {
    return `$${value.toFixed(0)}`
  }
}

// WordPress-friendly data fetching with error handling
export const getTokenDataSafe = async (): Promise<TokenData> => {
  try {
    return await fetchTokenData()
  } catch (error) {
    console.error('Token data fetch failed:', error)
    return FALLBACK_DATA
  }
}
