interface TokenData {
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  holders: number
  totalSupply: string
  liquidity?: number
  transactions24h?: number
}

// Mock token data for development
const mockTokenData: TokenData = {
  price: 0.000456,
  change24h: 12.45,
  marketCap: 2400000,
  volume24h: 850000,
  holders: 1247,
  totalSupply: "1000000000",
  liquidity: 450000,
  transactions24h: 3247
}

// Safe token data fetcher with error handling
export const getTokenDataSafe = async (): Promise<TokenData> => {
  try {
    // In a real implementation, this would fetch from an API
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTokenData), 100)
    })
  } catch (error) {
    console.error('Error fetching token data:', error)
    return mockTokenData
  }
}

export const getTokenData = getTokenDataSafe

interface PumpfunResponse {
  price: number
  market_cap: number
  volume_24h: number
  price_change_24h: number
  holder_count: number
  total_supply: number
  liquidity_usd?: number
  txns_24h?: number
}

class TokenApiService {
  private readonly CONTRACT_ADDRESS = 'Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F'
  private readonly PROXY_SERVER_URL = import.meta.env.VITE_PROXY_SERVER_URL || ''
  private readonly ACCESS_TOKEN = import.meta.env.VITE_PROXY_SERVER_ACCESS_TOKEN || 'undefined'

  async fetchPumpfunData(): Promise<TokenData> {
    try {
      if (!this.PROXY_SERVER_URL || this.PROXY_SERVER_URL === 'undefined') {
        throw new Error('Proxy server URL not configured')
      }
      const response = await fetch(this.PROXY_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          url: `https://frontend-api.pump.fun/coins/${this.CONTRACT_ADDRESS}`,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          body: {}
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: PumpfunResponse = await response.json()
      
      return {
        price: data.price || 0,
        change24h: data.price_change_24h || 0,
        marketCap: data.market_cap || 0,
        volume24h: data.volume_24h || 0,
        holders: data.holder_count || 0,
        totalSupply: this.formatSupply(data.total_supply || 1000000000),
        liquidity: data.liquidity_usd,
        transactions24h: data.txns_24h
      }
    } catch (error) {
      console.error('Error fetching Pumpfun data:', error)
      // Fallback to Solana RPC for basic data
      return this.fetchSolanaRpcData()
    }
  }

  async fetchSolanaRpcData(): Promise<TokenData> {
    try {
      const response = await fetch(this.PROXY_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          url: 'https://api.mainnet-beta.solana.com',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            jsonrpc: '2.0',
            id: 1,
            method: 'getTokenSupply',
            params: [this.CONTRACT_ADDRESS]
          }
        })
      })

      const data = await response.json()
      const supply = data.result?.value?.uiAmount || 1000000000

      return {
        price: 0.00001847, // Fallback price
        change24h: 2.3,
        marketCap: supply * 0.00001847,
        volume24h: 2100,
        holders: 127,
        totalSupply: this.formatSupply(supply)
      }
    } catch (error) {
      console.error('Error fetching Solana RPC data:', error)
      return this.getFallbackData()
    }
  }

  async fetchDexScreenerData(): Promise<Partial<TokenData>> {
    try {
      const response = await fetch(this.PROXY_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          url: `https://api.dexscreener.com/latest/dex/tokens/${this.CONTRACT_ADDRESS}`,
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
          body: {}
        })
      })

      const data = await response.json()
      const pair = data.pairs?.[0]

      if (pair) {
        return {
          price: parseFloat(pair.priceUsd) || 0,
          change24h: parseFloat(pair.priceChange?.h24) || 0,
          volume24h: parseFloat(pair.volume?.h24) || 0,
          liquidity: parseFloat(pair.liquidity?.usd) || 0
        }
      }

      return {}
    } catch (error) {
      console.error('Error fetching DexScreener data:', error)
      return {}
    }
  }

  async fetchCombinedData(): Promise<TokenData> {
    try {
      // Try multiple sources and combine the best data
      const [pumpfunData, dexScreenerData, solscanData] = await Promise.allSettled([
        this.fetchPumpfunData(),
        this.fetchDexScreenerData(),
        this.fetchSolscanData()
      ])

      let combinedData = this.getFallbackData()

      if (pumpfunData.status === 'fulfilled') {
        combinedData = { ...combinedData, ...pumpfunData.value }
      }

      if (dexScreenerData.status === 'fulfilled') {
        combinedData = { ...combinedData, ...dexScreenerData.value }
      }

      if (solscanData.status === 'fulfilled') {
        combinedData = { ...combinedData, ...solscanData.value }
      }

      return combinedData
    } catch (error) {
      console.error('Error fetching combined data:', error)
      return this.getFallbackData()
    }
  }

  async fetchSolscanData(): Promise<Partial<TokenData>> {
    try {
      const response = await fetch(this.PROXY_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          url: `https://public-api.solscan.io/token/meta?tokenAddress=${this.CONTRACT_ADDRESS}`,
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
          body: {}
        })
      })

      const data = await response.json()
      
      if (data.success) {
        return {
          holders: data.data.holder || 0,
          totalSupply: this.formatSupply(data.data.supply || 1000000000)
        }
      }

      return {}
    } catch (error) {
      console.error('Error fetching Solscan data:', error)
      return {}
    }
  }

  private formatSupply(supply: number): string {
    if (supply >= 1e9) {
      return `${(supply / 1e9).toFixed(1)}B BNKZ`
    } else if (supply >= 1e6) {
      return `${(supply / 1e6).toFixed(1)}M BNKZ`
    } else if (supply >= 1e3) {
      return `${(supply / 1e3).toFixed(1)}K BNKZ`
    }
    return `${supply} BNKZ`
  }

  private getFallbackData(): TokenData {
    return {
      price: 0.00001847,
      change24h: 2.3,
      marketCap: 18470,
      volume24h: 2100,
      holders: 127,
      totalSupply: '1.0B BNKZ'
    }
  }

  formatPrice(price: number): string {
    if (price < 0.000001) {
      return `$${price.toExponential(2)}`
    } else if (price < 0.01) {
      return `$${price.toFixed(8)}`
    } else if (price < 1) {
      return `$${price.toFixed(4)}`
    }
    return `$${price.toFixed(2)}`
  }

  formatMarketCap(marketCap: number): string {
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    } else if (marketCap >= 1e3) {
      return `$${(marketCap / 1e3).toFixed(1)}K`
    }
    return `$${marketCap.toFixed(0)}`
  }

  formatVolume(volume: number): string {
    return this.formatMarketCap(volume)
  }

  formatChange(change: number): string {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
  }
}

export const tokenApi = new TokenApiService()
export type { TokenData }
