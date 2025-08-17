// Pumpfun API utilities for token data
export interface TokenData {
  price: string
  change24h: string
  marketCap: string
  volume24h: string
  holders: string
  totalSupply: string
}

// Mock data for development - replace with real API calls when available
const mockTokenData: TokenData = {
  price: '$0.000142',
  change24h: '+12.5%',
  marketCap: '$142K',
  volume24h: '$28.4K',
  holders: '1,247',
  totalSupply: '1B BNKZ'
}

export const getTokenDataSafe = async (): Promise<TokenData> => {
  try {
    // In production, this would make actual API calls to Pumpfun
    // For now, return mock data with slight variations to simulate live updates
    const variations = [
      { price: '$0.000142', change24h: '+12.5%', marketCap: '$142K', volume24h: '$28.4K' },
      { price: '$0.000138', change24h: '+8.2%', marketCap: '$138K', volume24h: '$31.2K' },
      { price: '$0.000145', change24h: '+15.1%', marketCap: '$145K', volume24h: '$25.8K' }
    ]
    
    const randomVariation = variations[Math.floor(Math.random() * variations.length)]
    
    return {
      ...mockTokenData,
      ...randomVariation
    }
  } catch (error) {
    console.error('Error fetching token data:', error)
    return mockTokenData
  }
}

export const getTokenContract = (): string => {
  return process.env.REACT_APP_TOKEN_CONTRACT || 'Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F'
}

export const getPumpfunUrl = (): string => {
  return `https://pump.fun/coin/${getTokenContract()}`
}

export const getSolscanUrl = (): string => {
  return `https://solscan.io/token/${getTokenContract()}`
}
