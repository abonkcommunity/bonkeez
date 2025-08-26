import React, { useState, useEffect, useCallback } from 'react'
import { ArrowUpDown, Settings, TrendingUp, Zap, DollarSign, Coins, AlertTriangle } from 'lucide-react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { getTokenDataSafe, getPumpfunUrl, type TokenData } from '../utils/pumpfunApi'
import SwapService, { type SwapQuote } from '../services/swapService'

const TokenTrading = () => {
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [fromToken, setFromToken] = useState('SOL')
  const [toToken, setToToken] = useState('BNKZ')
  const [slippage, setSlippage] = useState('0.5')
  const [tokenData, setTokenData] = useState<TokenData | null>(null)
  const [quote, setQuote] = useState<SwapQuote | null>(null)
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)
  const [isSwapping, setIsSwapping] = useState(false)
  const [swapStatus, setSwapStatus] = useState('')

  const { connection } = useConnection()
  const { publicKey, wallet } = useWallet()
  const swapService = new SwapService(connection)

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

  // Fetch quote when amount or tokens change
  const fetchQuote = useCallback(async () => {
    if (!fromAmount || !publicKey) {
      setQuote(null)
      setToAmount('')
      return
    }

    const amount = parseFloat(fromAmount)
    if (isNaN(amount) || amount <= 0) {
      setQuote(null)
      setToAmount('')
      return
    }

    setIsLoadingQuote(true)
    try {
      const inputMint = swapService.getTokenMint(fromToken)
      const outputMint = swapService.getTokenMint(toToken)
      const parsedAmount = swapService.parseAmount(amount)

      const swapQuote = await swapService.getQuote({
        inputMint,
        outputMint,
        amount: parsedAmount,
        slippageBps: Math.floor(parseFloat(slippage) * 100),
        userPublicKey: publicKey.toString()
      })

      setQuote(swapQuote)
      setToAmount(swapService.formatAmount(swapQuote.outputAmount).toFixed(fromToken === 'SOL' ? 0 : 4))
    } catch (error) {
      console.error('Error fetching quote:', error)
      setQuote(null)
      setToAmount('')
    } finally {
      setIsLoadingQuote(false)
    }
  }, [fromAmount, fromToken, toToken, slippage, publicKey, swapService])

  useEffect(() => {
    const timer = setTimeout(fetchQuote, 500) // Debounce
    return () => clearTimeout(timer)
  }, [fetchQuote])

  const executeSwap = useCallback(async () => {
    if (!quote || !wallet || !publicKey) {
      alert('Please connect wallet and get a quote first')
      return
    }

    setIsSwapping(true)
    setSwapStatus('Preparing swap...')

    try {
      const inputMint = swapService.getTokenMint(fromToken)
      const outputMint = swapService.getTokenMint(toToken)
      const parsedAmount = swapService.parseAmount(parseFloat(fromAmount))

      setSwapStatus('Waiting for signature...')

      const signature = await swapService.executeSwap(
        {
          inputMint,
          outputMint,
          amount: parsedAmount,
          slippageBps: Math.floor(parseFloat(slippage) * 100),
          userPublicKey: publicKey.toString()
        },
        wallet.adapter,
        quote
      )

      setSwapStatus('Swap successful!')
      alert(`Swap completed!\n\nTransaction: ${signature}`)

      // Clear form
      setFromAmount('')
      setToAmount('')
      setQuote(null)

    } catch (error) {
      console.error('Swap error:', error)
      setSwapStatus('Swap failed')
      alert(`Swap failed: ${error.message}`)
    } finally {
      setIsSwapping(false)
      setTimeout(() => setSwapStatus(''), 3000)
    }
  }, [quote, wallet, publicKey, fromToken, toToken, fromAmount, slippage, swapService])

  return (
    <section id="token" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-800/20 to-emerald-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-400/20 text-emerald-400 px-6 py-3 rounded-full text-lg font-bold mb-6">
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Trading Interface */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Swap Tokens</h3>
              <button 
                onClick={handleSettings}
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>

            {/* From Token */}
            <div className="bg-white/5 rounded-2xl p-6 mb-4 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-sm">From</span>
                <button 
                  onClick={handleConnectWallet}
                  className="text-slate-400 text-sm hover:text-emerald-400 transition-colors"
                >
                  Balance: Connect Wallet
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.0"
                  className="bg-transparent text-white text-2xl font-bold outline-none flex-1"
                />
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">S</span>
                  </div>
                  <span className="text-white font-bold">{fromToken}</span>
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
            <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-400 text-sm">To</span>
                <button 
                  onClick={handleConnectWallet}
                  className="text-slate-400 text-sm hover:text-emerald-400 transition-colors"
                >
                  Balance: Connect Wallet
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  placeholder="0.0"
                  className="bg-transparent text-white text-2xl font-bold outline-none flex-1"
                />
                <div className="flex items-center bg-emerald-400/20 rounded-lg px-4 py-2 space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                  <span className="text-emerald-400 font-bold">{toToken}</span>
                </div>
              </div>
            </div>

            {/* Slippage Settings */}
            <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white font-medium">Slippage Tolerance</span>
                <div className="flex space-x-2">
                  {['0.1', '0.5', '1.0'].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        slippage === value
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Price Impact</span>
                {quote ? (
                  <span className={`${
                    quote.priceImpact > 5 
                      ? 'text-red-400' 
                      : quote.priceImpact > 1 
                        ? 'text-yellow-400' 
                        : 'text-emerald-400'
                  }`}>
                    {quote.priceImpact.toFixed(2)}%
                  </span>
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </div>
              {quote?.route && (
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-slate-400">Route</span>
                  <span className="text-slate-300">{quote.route}</span>
                </div>
              )}
            </div>

            {/* Price Impact Warning */}
            {quote && quote.priceImpact > 5 && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <p className="text-red-300 text-sm">High price impact! Consider reducing amount.</p>
              </div>
            )}

            {/* Swap Status */}
            {swapStatus && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
                <p className="text-blue-300 text-sm text-center">{swapStatus}</p>
              </div>
            )}

            {/* Execute Swap Button */}
            <button 
              onClick={executeSwap}
              disabled={!quote || isSwapping || !publicKey || isLoadingQuote}
              className={`w-full py-4 rounded-xl font-bold transition-all mb-2 ${
                !quote || isSwapping || !publicKey || isLoadingQuote
                  ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-emerald-500/25'
              }`}
            >
              {!publicKey ? (
                'Connect Wallet to Swap'
              ) : isLoadingQuote ? (
                'Getting Quote...'
              ) : isSwapping ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Swapping...</span>
                </div>
              ) : !quote ? (
                'Enter Amount'
              ) : (
                `Swap ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`
              )}
            </button>

            <button 
              onClick={handlePumpfunTrade}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 rounded-xl font-medium hover:from-slate-700 hover:to-slate-800 transition-all"
            >
              Or Trade on Pumpfun
            </button>

            <p className="text-slate-400 text-sm text-center mt-4">
              Trading redirects to Pumpfun platform for secure transactions
            </p>
          </div>

          {/* Token Benefits */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg">
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

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Staking Rewards</h4>
                  <p className="text-slate-400 text-sm">Earn passive income</p>
                </div>
              </div>
              <p className="text-slate-300">
                Stake your $BNKZ tokens to earn rewards and participate in the ecosystem governance.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
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
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-500/10 to-slate-600/10 rounded-xl p-4 border border-emerald-400/20">
                <p className="text-emerald-400 text-sm font-medium">Current Price</p>
                <p className="text-white text-xl font-bold">{tokenData?.price || '$0.0001'}</p>
                <p className={`text-xs ${
                  tokenData?.change24h?.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {tokenData?.change24h || '+0.0%'} (24h)
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-slate-400 text-sm font-medium">Market Cap</p>
                <p className="text-white text-xl font-bold">{tokenData?.marketCap || '$100K'}</p>
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