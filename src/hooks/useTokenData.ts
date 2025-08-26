import { useState, useEffect, useCallback } from 'react'
import { tokenApi, TokenData } from '../services/tokenApi'

interface UseTokenDataReturn {
  data: TokenData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  lastUpdated: Date | null
}

export const useTokenData = (refreshInterval: number = 30000): UseTokenDataReturn => {
  const [data, setData] = useState<TokenData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const tokenData = await tokenApi.fetchCombinedData()
      setData(tokenData)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token data')
      console.error('Token data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refetch = useCallback(async () => {
    setLoading(true)
    await fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()

    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchData, refreshInterval])

  return {
    data,
    loading,
    error,
    refetch,
    lastUpdated
  }
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
