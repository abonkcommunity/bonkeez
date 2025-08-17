import React, { useState, useEffect } from 'react'
import { Menu, X, Wallet, User, Search, Coins } from 'lucide-react'
import { getTokenDataSafe, type TokenData } from '../utils/pumpfunApi'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [tokenData, setTokenData] = useState<TokenData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTokenDataSafe()
      setTokenData(data)
    }
    
    fetchData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Bonkeez</h1>
              <p className="text-slate-400 text-xs">NFT Exchange</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#marketplace" className="text-white hover:text-emerald-400 transition-colors font-medium">Marketplace</a>
            <a href="#collection" className="text-white hover:text-emerald-400 transition-colors font-medium">Collection</a>
            <a href="#token" className="text-white hover:text-emerald-400 transition-colors flex items-center space-x-1 font-medium">
              <Coins className="w-4 h-4" />
              <span>$BNKZ</span>
            </a>
            <a href="#stats" className="text-white hover:text-emerald-400 transition-colors font-medium">Stats</a>
            <a href="#about" className="text-white hover:text-emerald-400 transition-colors font-medium">About</a>
          </nav>

          {/* Live Token Price Display */}
          <div className="hidden lg:flex items-center bg-gradient-to-r from-slate-800/60 to-emerald-900/40 border border-emerald-500/30 rounded-lg px-3 py-2 backdrop-blur-sm">
            <div className="w-6 h-6 bg-gradient-to-r from-slate-700 to-emerald-600 rounded-full flex items-center justify-center mr-2 shadow-sm">
              <span className="text-white font-bold text-xs">B</span>
            </div>
            <div className="text-right">
              <p className="text-emerald-300 font-bold text-sm">
                {tokenData?.price || '$0.0001'}
              </p>
              <p className={`text-xs ${
                tokenData?.change24h?.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {tokenData?.change24h || '+0.0%'}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 w-64 border border-white/10">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search Bonkeez..." 
              className="bg-transparent text-white placeholder-slate-400 outline-none flex-1"
            />
          </div>

          {/* Wallet Connection */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-2 rounded-lg hover:from-slate-600 hover:to-slate-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-emerald-500/25 border border-slate-600">
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
            <button className="text-white hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-white/10">
              <User className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md rounded-lg mt-2 p-4 border border-white/10">
            <nav className="flex flex-col space-y-4">
              <a href="#marketplace" className="text-white hover:text-emerald-400 transition-colors font-medium">Marketplace</a>
              <a href="#collection" className="text-white hover:text-emerald-400 transition-colors font-medium">Collection</a>
              <a href="#token" className="text-white hover:text-emerald-400 transition-colors flex items-center space-x-1 font-medium">
                <Coins className="w-4 h-4" />
                <span>$BNKZ Token</span>
              </a>
              <a href="#stats" className="text-white hover:text-emerald-400 transition-colors font-medium">Stats</a>
              <a href="#about" className="text-white hover:text-emerald-400 transition-colors font-medium">About</a>
              <div className="flex items-center justify-between bg-gradient-to-r from-slate-800/60 to-emerald-900/40 border border-emerald-500/30 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-slate-700 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                  <span className="text-emerald-300 font-bold">$BNKZ</span>
                </div>
                <div className="text-right">
                  <p className="text-emerald-300 font-bold">
                    {tokenData?.price || '$0.0001'}
                  </p>
                  <p className={`text-xs ${
                    tokenData?.change24h?.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {tokenData?.change24h || '+0.0%'}
                  </p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-2 rounded-lg hover:from-slate-600 hover:to-slate-700 transition-all flex items-center space-x-2 justify-center shadow-lg border border-slate-600">
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
