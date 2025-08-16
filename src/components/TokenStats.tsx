import React from 'react'
import { TrendingUp, DollarSign, Users, Zap, ExternalLink, RefreshCw } from 'lucide-react'
import { useTokenData } from '../hooks/useTokenData'
import { tokenApi } from '../services/tokenApi'

const TokenStats = () => {
  const { data: tokenData, loading, error, refetch, lastUpdated } = useTokenData(30000)

  const handlePumpfunClick = () => {
    window.open('https://pump.fun/coin/Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F', '_blank')
  }

  const handleSolscanClick = () => {
    window.open('https://solscan.io/token/Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F', '_blank')
  }

  const handleAddToWallet = () => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'SPL',
          options: {
            address: 'Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F',
            symbol: 'BNKZ',
            decimals: 9,
            image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/yelloo-bonkee-1755298146545-396548464.jpeg'
          }
        }
      })
    } else {
      alert('Please install Phantom wallet to add $BNKZ token')
    }
  }

  const handleRefresh = () => {
    refetch()
  }

  if (error) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400/5 to-orange-500/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-6">
            <p className="text-red-400 mb-4">Failed to load live token data</p>
            <button 
              onClick={handleRefresh}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400/5 to-orange-500/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-yellow-400/20 text-yellow-400 px-6 py-3 rounded-full text-lg font-bold mb-6">
            <Zap className="w-5 h-5 mr-2" />
            $BNKZ Token Live on Pumpfun
            {loading && <RefreshCw className="w-4 h-4 ml-2 animate-spin" />}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            $BNKZ Token Statistics
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            The official Bonkeez ecosystem token powering the marketplace
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-400">
            <span className="font-mono text-sm">Contract: Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F</span>
            <button 
              onClick={handleSolscanClick}
              className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Solscan</span>
            </button>
          </div>
          {lastUpdated && (
            <div className="flex items-center justify-center space-x-2 mt-4">
              <span className="text-gray-500 text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <button 
                onClick={handleRefresh}
                className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-black" />
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                tokenData && tokenData.change24h >= 0 
                  ? 'text-green-400 bg-green-400/20' 
                  : 'text-red-400 bg-red-400/20'
              }`}>
                {tokenData ? tokenApi.formatChange(tokenData.change24h) : '+2.3%'}
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Token Price</p>
              <p className="text-white text-3xl font-bold">
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  tokenData ? tokenApi.formatPrice(tokenData.price) : '$0.00001847'
                )}
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Market Cap</p>
              <p className="text-white text-3xl font-bold">
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  tokenData ? tokenApi.formatMarketCap(tokenData.marketCap) : '$18.47K'
                )}
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">24h Volume</p>
              <p className="text-white text-3xl font-bold">
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  tokenData ? tokenApi.formatVolume(tokenData.volume24h) : '$2.1K'
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-blue-400" />
              <h3 className="text-white text-xl font-bold">Token Holders</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                tokenData ? tokenData.holders.toLocaleString() : '127'
              )}
            </p>
            <p className="text-gray-400">Active wallet addresses</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-white text-xl font-bold">Total Supply</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                tokenData ? tokenData.totalSupply : '1B BNKZ'
              )}
            </p>
            <p className="text-gray-400">Maximum token supply</p>
          </div>
        </div>

        {tokenData?.liquidity && (
          <div className="mt-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">Liquidity</h3>
                  <p className="text-2xl font-bold text-white">
                    {tokenApi.formatMarketCap(tokenData.liquidity)}
                  </p>
                  <p className="text-gray-400">Total liquidity locked</p>
                </div>
                {tokenData.transactions24h && (
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">24h Transactions</h3>
                    <p className="text-2xl font-bold text-white">
                      {tokenData.transactions24h.toLocaleString()}
                    </p>
                    <p className="text-gray-400">Total transactions today</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handlePumpfunClick}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-lg font-bold hover:from-yellow-500 hover:to-orange-600 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Buy $BNKZ on Pumpfun</span>
              <ExternalLink className="w-5 h-5" />
            </button>
            <button 
              onClick={handleAddToWallet}
              className="border-2 border-white/20 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all cursor-pointer"
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
