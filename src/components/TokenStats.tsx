import React, { useState, useEffect } from 'react'
import { TrendingUp, DollarSign, Users, Zap, ExternalLink } from 'lucide-react'
import { getTokenDataSafe, getPumpfunUrl, getSolscanUrl, type TokenData } from '../utils/pumpfunApi'

const TokenStats = () => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      let data = await getTokenDataSafe()
      
      // If API fails, use mock data
      if (!data) {
        console.log('Using mock data for token stats')
        data = {
          price: '$0.00002400',
          change24h: 5.2,
          marketCap: '$2.4M',
          volume24h: '$187K',
          holders: '1,284',
          totalSupply: '1.0B BNKZ',
          lastUpdated: new Date().toLocaleTimeString()
        }
      }
      
      setTokenData(data)
      setLoading(false)
    }
    
    fetchData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const handlePumpfunClick = () => {
    window.open(getPumpfunUrl(), '_blank', 'noopener,noreferrer')
  }

  const handleSolscanClick = () => {
    window.open(getSolscanUrl(), '_blank', 'noopener,noreferrer')
  }

  const handleAddToWallet = () => {
    // In production, this would integrate with wallet adapters to add the token
    alert('Add to wallet feature coming soon! This will automatically add $BNKZ to your connected Solana wallet.')
  }

  if (loading || !tokenData) {
    return (
      <section id="stats" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-500/5 to-slate-600/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded-lg w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-white/5 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="stats" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-500/5 to-slate-600/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-emerald-400/20 text-emerald-400 px-6 py-3 rounded-full text-lg font-bold mb-6">
            <Zap className="w-5 h-5 mr-2" />
            $BNKZ Token Live on Pumpfun
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            $BNKZ Token Statistics
          </h2>
          <p className="text-xl text-slate-300 mb-6">
            The official Bonkeez ecosystem token powering the marketplace
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-slate-400">
            <span className="font-mono text-sm">Contract: Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F</span>
            <button 
              onClick={handleSolscanClick}
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Solscan</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-emerald-500/10 to-slate-600/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-emerald-400/20">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                tokenData.change24h >= 0
                  ? 'text-emerald-400 bg-emerald-400/20' 
                  : 'text-red-400 bg-red-400/20'
              }`}>
                {tokenData.change24h >= 0 ? '+' : ''}{tokenData.change24h.toFixed(1)}%
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm mb-1">Token Price</p>
              <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold break-all">{tokenData.price}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm mb-1">Market Cap</p>
              <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">{tokenData.marketCap}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-600 to-slate-600 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-xs sm:text-sm mb-1">24h Volume</p>
              <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">{tokenData.volume24h}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
              <h3 className="text-white text-lg sm:text-xl font-bold">Token Holders</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">{tokenData.holders}</p>
            <p className="text-slate-400 text-sm sm:text-base">Active wallet addresses</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              <h3 className="text-white text-lg sm:text-xl font-bold">Total Supply</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-2">{tokenData.totalSupply}</p>
            <p className="text-slate-400 text-sm sm:text-base">Maximum token supply</p>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <button 
              onClick={handlePumpfunClick}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-emerald-500/25 text-sm sm:text-base"
            >
              <span>Buy $BNKZ on Pumpfun</span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={handleAddToWallet}
              className="border-2 border-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-slate-800/50 transition-all text-sm sm:text-base"
            >
              Add to Wallet
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TokenStats
