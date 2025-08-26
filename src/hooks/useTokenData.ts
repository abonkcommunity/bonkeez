
import { useState, useEffect } from 'react'
import { getTokenData } from '../services/tokenApi'

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

export const useTokenData = (refreshInterval = 30000) => {
  const [data, setData] = useState<TokenData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const tokenData = await getTokenData()
      setData(tokenData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [refreshInterval])

  return { data, loading, error, refetch: fetchData }
}

export const useTokenPrice = () => {
  const { data, loading, error } = useTokenData(10000) // Update every 10 seconds for price

  return {
    price: data?.price || 0,
    change24h: data?.change24h || 0,
    loading,
    error
  }
}
