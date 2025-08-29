import React, { useState, useEffect } from 'react'
import { Menu, X, Wallet, User, Search, Coins } from 'lucide-react'
import { getTokenDataSafe, type TokenData } from '../utils/pumpfunApi'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

 

  return (
    <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/bonk.JPG" 
              alt="Bonkeez Logo" 
              className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-pink-500/30"
            />
            <div>
              <h1 className="text-white font-bold text-xl">Bonkeez</h1>
              <p className="text-pink-300 text-xs">NFT Exchange</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('marketplace')} 
              className="text-white hover:text-pink-400 transition-colors font-medium text-sm"
            >
              Marketplace
            </button>
            <button 
              onClick={() => scrollToSection('stats')} 
              className="text-white hover:text-yellow-400 transition-colors font-medium text-sm"
            >
              Stats
            </button>
            <button 
              onClick={() => scrollToSection('token')} 
              className="text-white hover:text-blue-400 transition-colors flex items-center space-x-1 font-medium text-sm"
            >
              <Coins className="w-4 h-4" />
              <span>$BNKZ Trading</span>
            </button>
            <button 
              onClick={() => scrollToSection('profile')} 
              className="text-white hover:text-green-400 transition-colors flex items-center space-x-1 font-medium text-sm"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button 
              onClick={() => scrollToSection('minting')} 
              className="text-white hover:text-purple-400 transition-colors font-medium text-sm"
            >
              NFT Minting
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Live Token Price Display */}
            <div className="hidden lg:flex items-center bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-lg px-3 py-2 backdrop-blur-sm">
              <img 
                src="/bonk.JPG" 
                alt="Bonk" 
                className="w-5 h-5 rounded-full object-cover mr-2"
              />
              <div className="text-right">
                <p className="text-pink-300 font-bold text-xs">
                  {tokenData?.price || '$0.0001'}
                </p>
                <p className={`text-xs ${
                  (tokenData?.change24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {tokenData?.change24h !== undefined && typeof tokenData.change24h === 'number' 
                    ? `${tokenData.change24h >= 0 ? '+' : ''}${tokenData.change24h.toFixed(1)}%` 
                    : '+0.0%'}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 w-48 border border-white/10">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent text-white placeholder-slate-400 outline-none flex-1 text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    scrollToSection('marketplace')
                  }
                }}
              />
            </div>
          </div>

          {/* Wallet Connection */}
         <div className="hidden md:flex items-center space-x-3">
  <WalletMultiButton className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all flex items-center space-x-2 shadow-lg hover:shadow-pink-500/25 border border-pink-400/30 font-medium text-sm" />
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
              <button 
                onClick={() => scrollToSection('marketplace')} 
                className="text-white hover:text-pink-400 transition-colors font-medium text-left"
              >
                Marketplace
              </button>
              <button 
                onClick={() => scrollToSection('stats')} 
                className="text-white hover:text-yellow-400 transition-colors font-medium text-left"
              >
                Stats
              </button>
              <button 
                onClick={() => scrollToSection('token')} 
                className="text-white hover:text-blue-400 transition-colors flex items-center space-x-1 font-medium"
              >
                <Coins className="w-4 h-4" />
                <span>$BNKZ Trading</span>
              </button>
              <button 
                onClick={() => scrollToSection('profile')} 
                className="text-white hover:text-green-400 transition-colors flex items-center space-x-1 font-medium"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button 
                onClick={() => scrollToSection('minting')} 
                className="text-white hover:text-purple-400 transition-colors font-medium text-left"
              >
                NFT Minting
              </button>
              <div className="flex items-center justify-between bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-full p-3 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <img 
                    src="/bonk.JPG" 
                    alt="Bonk" 
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-pink-300 font-bold">$BNKZ</span>
                </div>
                <div className="text-right">
                  <p className="text-pink-300 font-bold">
                    {tokenData?.price || '$0.0001'}
                  </p>
                  <p className={`text-xs ${
                    (tokenData?.change24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {tokenData?.change24h !== undefined && typeof tokenData.change24h === 'number'
                      ? `${tokenData.change24h >= 0 ? '+' : ''}${tokenData.change24h.toFixed(1)}%` 
                      : '+0.0%'}
                  </p>
                </div>
              </div>
              <WalletMultiButton className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all flex items-center space-x-2 justify-center shadow-lg border border-pink-400/30" />
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
