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
  private readonly API_BASE_URL = window.location.origin + '/api'

  async fetchPumpfunData(): Promise<TokenData> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/pumpfun/${this.CONTRACT_ADDRESS}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      return {
        price: parseFloat(data.price?.replace('$', '')) || 0,
        change24h: data.change24h || 0,
        marketCap: this.parseFormattedNumber(data.marketCap) || 0,
        volume24h: this.parseFormattedNumber(data.volume24h) || 0,
        holders: parseInt(data.holders) || 0,
        totalSupply: data.totalSupply || '1.0B BNKZ'
      }
    } catch (error) {
      console.error('Error fetching Pumpfun data:', error)
      // Return fallback data if API fails
      return this.getFallbackData()
    }
  }

  async fetchCombinedData(): Promise<TokenData> {
    // Since we're using our own API endpoint, just return the pumpfun data
    return this.fetchPumpfunData()
  }

  private parseFormattedNumber(value: string): number {
    if (!value || value === 'N/A') return 0
    
    // Remove $ and other currency symbols
    const cleaned = value.replace(/[\$,]/g, '')
    
    // Handle M (millions) and B (billions) suffixes
    if (cleaned.includes('M')) {
      return parseFloat(cleaned.replace('M', '')) * 1000000
    } else if (cleaned.includes('B')) {
      return parseFloat(cleaned.replace('B', '')) * 1000000000
    } else if (cleaned.includes('K')) {
      return parseFloat(cleaned.replace('K', '')) * 1000
    }
    
    return parseFloat(cleaned) || 0
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
