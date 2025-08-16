import React, { useState } from 'react'
import { ArrowUpDown, Wallet, TrendingUp, Info, ExternalLink, RefreshCw } from 'lucide-react'
import { useTokenData } from '../hooks/useTokenData'
import { tokenApi } from '../services/tokenApi'

const TokenTrading = () => {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [slippage, setSlippage] = useState('1')
  const { data: tokenData, loading } = useTokenData(10000) // Update every 10 seconds

  const handleConnectWallet = () => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.connect()
        .then(() => {
          alert('Wallet connected successfully!')
        })
        .catch(() => {
          alert('Failed to connect wallet')
        })
    } else {
      window.open('https://phantom.app/', '_blank')
    }
  }

  const handleSwap = () => {
    if (!window.solana || !window.solana.isConnected) {
      handleConnectWallet()
      return
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    alert(`${tradeType === 'buy' ? 'Buying' : 'Selling'} ${amount} ${tradeType === 'buy' ? 'SOL worth of' : ''} BNKZ tokens`)
  }

  const handlePumpfunClick = () => {
    window.open('https://pump.fun/coin/Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F', '_blank')
  }

  const handleSolscanClick = () => {
    window.open('https://solscan.io/token/Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F', '_blank')
  }

  const handleAddToPhantom = () => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'SPL',
          options: {
            address: 'Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F',
            symbol: 'BNKZ',
            decimals: 9
          }
        }
      })
    } else {
      window.open('https://phantom.app/', '_blank')
    }
  }

  const handleLiquidityPool = () => {
    window.open('https://raydium.io/pools/', '_blank')
  }

  const calculateTokenAmount = () => {
    if (!amount || !tokenData?.price) return '0'
    return (parseFloat(amount) / tokenData.price).toFixed(0)
  }

  const currentPrice = tokenData?.price || 0.00001847
  const priceChange = tokenData?.change24h || 2.3

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trade $BNKZ Token
          </h2>
          <p className="text-xl text-gray-300">
            Swap SOL for $BNKZ or trade with other tokens in the Bonkeez ecosystem
          </p>
          {loading && (
            <div className="flex items-center justify-center mt-4">
              <RefreshCw className="w-4 h-4 animate-spin text-yellow-400 mr-2" />
              <span className="text-yellow-400 text-sm">Updating live prices...</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Trading Interface */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Swap Tokens</h3>
              <div className="flex bg-white/10 rounded-lg p-1">
                <button 
                  onClick={() => setTradeType('buy')}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer ${
                    tradeType === 'buy' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Buy
                </button>
                <button 
                  onClick={() => setTradeType('sell')}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer ${
                    tradeType === 'sell' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sell
                </button>
              </div>
            </div>

            {/* From Token */}
            <div className="space-y-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">From</span>
                  <span className="text-gray-400 text-sm">Balance: 12.45 SOL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    <span className="text-white font-medium">SOL</span>
                  </div>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-white text-xl font-bold outline-none flex-1 text-right"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors cursor-pointer">
                  <ArrowUpDown className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* To Token */}
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">To</span>
                  <span className="text-gray-400 text-sm">Balance: 54,123 BNKZ</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg px-3 py-2 border border-yellow-400/30">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xs">B</span>
                    </div>
                    <span className="text-yellow-400 font-medium">BNKZ</span>
                  </div>
                  <div className="text-white text-xl font-bold flex-1 text-right">
                    {loading ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : (
                      calculateTokenAmount()
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Slippage Settings */}
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm font-medium">Slippage Tolerance</span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex space-x-2">
                  {['0.5', '1', '2'].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`px-3 py-1 rounded text-sm transition-colors cursor-pointer ${
                        slippage === value 
                          ? 'bg-yellow-400 text-black' 
                          : 'bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-gray-400 text-xs">
                Rate: 1 SOL = {(1 / currentPrice).toFixed(0)} BNKZ • Fee: 0.25%
              </div>
            </div>

            {/* Swap Button */}
            <button 
              onClick={handleSwap}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Wallet className="w-5 h-5" />
              <span>{tradeType === 'buy' ? 'Buy BNKZ' : 'Sell BNKZ'}</span>
            </button>

            <p className="text-gray-400 text-sm text-center mt-4">
              Connect your Solana wallet to start trading
            </p>
          </div>

          {/* Trading Info */}
          <div className="space-y-6">
            {/* Live Price Display */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Live $BNKZ Price</h3>
                <div className={`flex items-center space-x-2 ${
                  priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {tokenApi.formatChange(priceChange)} (24h)
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-white mb-2">
                  {loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    tokenApi.formatPrice(currentPrice)
                  )}
                </p>
                <p className="text-gray-400">Current market price</p>
              </div>
            </div>

            {/* Market Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Market Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Market Cap</p>
                  <p className="text-white font-bold">
                    {loading ? 'Loading...' : tokenApi.formatMarketCap(tokenData?.marketCap || 18470)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">24h Volume</p>
                  <p className="text-white font-bold">
                    {loading ? 'Loading...' : tokenApi.formatVolume(tokenData?.volume24h || 2100)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Holders</p>
                  <p className="text-white font-bold">
                    {loading ? 'Loading...' : (tokenData?.holders || 127).toLocaleString()}
                  </p>
                </div>
                {tokenData?.liquidity && (
                  <div>
                    <p className="text-gray-400 text-sm">Liquidity</p>
                    <p className="text-white font-bold">
                      {tokenApi.formatMarketCap(tokenData.liquidity)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Token Utility */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">$BNKZ Utility</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-medium">NFT Trading Discounts</p>
                    <p className="text-gray-400 text-sm">Hold BNKZ for reduced marketplace fees</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-medium">Exclusive Access</p>
                    <p className="text-gray-400 text-sm">Early access to new Bonkeez drops</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-medium">Staking Rewards</p>
                    <p className="text-gray-400 text-sm">Earn rewards by staking BNKZ tokens</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-medium">Governance Rights</p>
                    <p className="text-gray-400 text-sm">Vote on ecosystem proposals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                <button 
                  onClick={handlePumpfunClick}
                  className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>View on Pumpfun</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleSolscanClick}
                  className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Contract on Solscan</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleAddToPhantom}
                  className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Add to Phantom Wallet</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleLiquidityPool}
                  className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Liquidity Pool Info</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TokenTrading
