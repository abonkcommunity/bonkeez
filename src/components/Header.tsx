import React, { useState } from 'react'
import { Search, Menu, X, Wallet, TrendingUp } from 'lucide-react'
import { useTokenPrice } from '../hooks/useTokenData'
import { tokenApi } from '../services/tokenApi'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { price, change24h, loading } = useTokenPrice()

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Bonkeez</h1>
                <p className="text-gray-400 text-xs">NFT Exchange</p>
              </div>
            </div>
          </div>

          {/* Live Token Price */}
          <div className="hidden md:flex items-center space-x-4 bg-white/5 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xs">B</span>
              </div>
              <span className="text-yellow-400 font-medium">$BNKZ</span>
            </div>
            <div className="text-white font-bold">
              {loading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                tokenApi.formatPrice(price)
              )}
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              change24h >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              <TrendingUp className="w-3 h-3" />
              <span>{tokenApi.formatChange(change24h)}</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Bonkeez NFTs..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Navigation & Wallet */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <a href="#marketplace" className="text-gray-300 hover:text-white transition-colors">
                Marketplace
              </a>
              <a href="#stats" className="text-gray-300 hover:text-white transition-colors">
                Stats
              </a>
              <a href="#token" className="text-gray-300 hover:text-white transition-colors">
                $BNKZ
              </a>
            </nav>
            
            <button 
              onClick={handleConnectWallet}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 rounded-lg mt-2">
              {/* Mobile Token Price */}
              <div className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs">B</span>
                  </div>
                  <span className="text-yellow-400 font-medium">$BNKZ</span>
                </div>
                <div className="text-white font-bold">
                  {loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    tokenApi.formatPrice(price)
                  )}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  <span>{tokenApi.formatChange(change24h)}</span>
                </div>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Bonkeez NFTs..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </form>

              {/* Mobile Navigation */}
              <a href="#marketplace" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Marketplace
              </a>
              <a href="#stats" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                Stats
              </a>
              <a href="#token" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">
                $BNKZ Token
              </a>
              
              {/* Mobile Wallet Button */}
              <button 
                onClick={handleConnectWallet}
                className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-orange-600 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
