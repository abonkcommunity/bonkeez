import React, { useState, useEffect } from 'react'
import { ArrowUpDown, Settings, TrendingUp, Zap, DollarSign, Coins } from 'lucide-react'
import { getTokenDataSafe, getPumpfunUrl, type TokenData } from '../utils/pumpfunApi'

const TokenTrading = () => {
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [fromToken, setFromToken] = useState('SOL')
  const [toToken, setToToken] = useState('BNKZ')
  const [slippage, setSlippage] = useState('0.5')
  const [tokenData, setTokenData] = useState<TokenData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTokenDataSafe()
      setTokenData(data)
    }
    
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleSwap = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handlePumpfunTrade = () => {
    window.open(getPumpfunUrl(), '_blank', 'noopener,noreferrer')
  }

  const handleConnectWallet = () => {
    // This will trigger the wallet modal from WalletMultiButton
    const walletButton = document.querySelector('.wallet-adapter-button') as HTMLButtonElement
    if (walletButton) {
      walletButton.click()
    }
  }

  const handleSettings = () => {
    alert('Advanced trading settings coming soon! This will include custom slippage, MEV protection, and more.')
  }

  // Simple price calculation for demo
  useEffect(() => {
    if (fromAmount && fromToken === 'SOL' && toToken === 'BNKZ') {
      const solAmount = parseFloat(fromAmount)
      if (!isNaN(solAmount)) {
        // Assuming 1 SOL = ~900 BNKZ for demo
        const bnkzAmount = (solAmount * 900).toFixed(0)
        setToAmount(bnkzAmount)
      }
    } else if (fromAmount && fromToken === 'BNKZ' && toToken === 'SOL') {
      const bnkzAmount = parseFloat(fromAmount)
      if (!isNaN(bnkzAmount)) {
        // Reverse calculation
        const solAmount = (bnkzAmount / 900).toFixed(4)
        setToAmount(solAmount)
      }
    }
  }, [fromAmount, fromToken, toToken])

  return (
    <section id="token" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/20 to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-700/20 text-purple-300 px-6 py-3 rounded-full text-lg font-bold mb-6">
            <Zap className="w-5 h-5 mr-2" />
            $BNKZ Token Trading
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trade $BNKZ Token
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Swap SOL for $BNKZ tokens and unlock exclusive benefits in the Bonkeez ecosystem
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Trading Interface */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Swap Tokens</h3>
              <button 
                onClick={handleSettings}
                className="text-slate-400 hover:text-purple-300 transition-colors"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>

            {/* From Token */}
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 mb-4 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-1 sm:space-y-0">
                <span className="text-slate-400 text-sm">From</span>
                <button 
                  onClick={handleConnectWallet}
                  className="text-slate-400 text-sm hover:text-purple-300 transition-colors text-left sm:text-right"
                >
                  Balance: Connect Wallet
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.0"
                  className="bg-transparent text-white text-xl sm:text-2xl font-bold outline-none flex-1 min-w-0"
                />
                <div className="flex items-center bg-white/10 rounded-lg px-3 sm:px-4 py-2 space-x-2 shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">S</span>
                  </div>
                  <span className="text-white font-bold text-sm sm:text-base">{fromToken}</span>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={handleSwap}
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors border border-white/20"
              >
                <ArrowUpDown className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* To Token */}
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 mb-6 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-1 sm:space-y-0">
                <span className="text-slate-400 text-sm">To</span>
                <button 
                  onClick={handleConnectWallet}
                  className="text-slate-400 text-sm hover:text-purple-300 transition-colors text-left sm:text-right"
                >
                  Balance: Connect Wallet
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <input
                  type="number"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  placeholder="0.0"
                  className="bg-transparent text-white text-xl sm:text-2xl font-bold outline-none flex-1 min-w-0"
                />
                <div className="flex items-center bg-purple-700/20 rounded-lg px-3 sm:px-4 py-2 space-x-2 shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-700 to-purple-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                  <span className="text-purple-300 font-bold text-sm sm:text-base">{toToken}</span>
                </div>
              </div>
            </div>

            {/* Slippage Settings */}
            <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 space-y-3 sm:space-y-0">
                <span className="text-white font-medium text-sm sm:text-base">Slippage Tolerance</span>
                <div className="flex space-x-2">
                  {['0.1', '0.5', '1.0'].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        slippage === value
                          ? 'bg-purple-700 text-white'
                          : 'bg-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm space-y-1 sm:space-y-0">
                <span className="text-slate-400">Price Impact</span>
                <button 
                  onClick={handleConnectWallet}
                  className="text-purple-300 hover:text-purple-200 transition-colors text-left sm:text-right"
                >
                  Connect wallet to see
                </button>
              </div>
            </div>

            {/* Execute Swap Button */}
            <button 
              onClick={() => {
                if (!fromAmount) {
                  alert('Please enter an amount to swap')
                  return
                }
                if (confirm(`Swap ${fromAmount} ${fromToken} for ${toAmount} ${toToken}?`)) {
                  alert('Swap executed successfully! (Demo mode)')
                }
              }}
              className="w-full bg-gradient-to-r from-purple-700 to-purple-800 text-white py-3 sm:py-4 rounded-xl font-bold hover:from-purple-800 hover:to-purple-900 transition-all shadow-lg hover:shadow-purple-700/25 mb-2 text-sm sm:text-base"
            >
              Execute Swap
            </button>
            
            <button 
              onClick={handlePumpfunTrade}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-2 sm:py-3 rounded-xl font-medium hover:from-slate-700 hover:to-slate-800 transition-all text-sm sm:text-base"
            >
              Or Trade on Pumpfun
            </button>

            <p className="text-slate-400 text-xs sm:text-sm text-center mt-4">
              Trading redirects to Pumpfun platform for secure transactions
            </p>
          </div>

          {/* Token Benefits */}
          <div className="space-y-4 sm:space-y-6 mt-8 lg:mt-0">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-700 to-purple-800 rounded-lg flex items-center justify-center shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">NFT Discounts</h4>
                  <p className="text-slate-400 text-sm">Save 10% on all NFT purchases</p>
                </div>
              </div>
              <p className="text-slate-300">
                Use $BNKZ tokens to get exclusive discounts when buying Bonkeez NFTs on our marketplace.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base sm:text-lg">Staking Rewards</h4>
                  <p className="text-slate-400 text-xs sm:text-sm">Earn passive income</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm sm:text-base">
                Stake your $BNKZ tokens to earn rewards and participate in the ecosystem governance.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-slate-600 rounded-lg flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Exclusive Access</h4>
                  <p className="text-slate-400 text-sm">VIP member benefits</p>
                </div>
              </div>
              <p className="text-slate-300">
                Get early access to new drops, exclusive events, and premium features in the Bonkeez ecosystem.
              </p>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-purple-700/10 to-slate-600/10 rounded-xl p-3 sm:p-4 border border-purple-700/20">
                <p className="text-purple-300 text-xs sm:text-sm font-medium">Current Price</p>
                <p className="text-white text-lg sm:text-xl font-bold">{tokenData?.price || '$0.0001'}</p>
                <p className={`text-xs ${
                  (tokenData?.change24h || 0) >= 0 ? 'text-purple-300' : 'text-red-400'
                }`}>
                  {tokenData?.change24h ? `${tokenData.change24h >= 0 ? '+' : ''}${tokenData.change24h.toFixed(1)}%` : '+0.0%'} (24h)
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                <p className="text-slate-400 text-xs sm:text-sm font-medium">Market Cap</p>
                <p className="text-white text-lg sm:text-xl font-bold">{tokenData?.marketCap || '$100K'}</p>
                <p className="text-slate-400 text-xs">Fully Diluted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TokenTrading
