
export interface TokenData {
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  holders: number
  totalSupply: number
  circulatingSupply: number
  liquidityUsd: number
  lastUpdated: string
}

export interface SwapQuote {
  inputAmount: number
  outputAmount: number
  priceImpact: number
  minimumReceived: number
  route: string[]
}
