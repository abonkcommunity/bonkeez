import React, { useState, useEffect } from 'react'
import { HiMenu, HiX, HiUser, HiCurrencyDollar, HiDocumentText } from 'react-icons/hi'
import { FaTwitter, FaTelegramPlane } from 'react-icons/fa'
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

  const handleSocialClick = (platform: string) => {
    const urls = {
      twitter: 'https://twitter.com/bonkeez_nft',
      telegram: 'https://t.me/bonkeez_nft'
    }
    const url = urls[platform as keyof typeof urls]
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-150"
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
              <button onClick={() => scrollToSection('marketplace')} className="text-white hover:text-pink-400 font-medium text-sm">Marketplace</button>
              <button onClick={() => scrollToSection('stats')} className="text-white hover:text-yellow-400 font-medium text-sm">Stats</button>
              <button onClick={() => scrollToSection('minting')} className="text-white hover:text-purple-400 font-medium text-sm">NFT Minting</button>
              <button onClick={() => scrollToSection('token')} className="text-white hover:text-blue-400 flex items-center space-x-1 font-medium text-sm">
                <HiCurrencyDollar className="w-4 h-4" />
                <span>$BNKZ Trading</span>
              </button>
              <button onClick={() => scrollToSection('profile')} className="text-white hover:text-green-400 flex items-center space-x-1 font-medium text-sm">
                <HiUser className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <a href="/Bonkeez Whitepaper (1).pdf" download className="text-white hover:text-red-400 flex items-center space-x-1 font-medium text-sm">
                <HiDocumentText className="w-4 h-4" />
                <span>Whitepaper</span>
              </a>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Live Token Price */}
              <div className="hidden lg:flex items-center bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-lg px-3 py-2 backdrop-blur-sm">
                <img src="/bonk.JPG" alt="Bonk" className="w-5 h-5 rounded-full object-cover mr-2" />
                <div className="text-right">
                  <p className="text-pink-300 font-bold text-xs">
                    {tokenData?.price || '$0.0001'}
                  </p>
                  <p className={`text-xs ${(tokenData?.change24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tokenData?.change24h ? `${tokenData.change24h >= 0 ? '+' : ''}${tokenData.change24h.toFixed(1)}%` : '+0.0%'}
                  </p>
                </div>
              </div>

              {/* Wallet */}
              <div className="hidden md:flex items-center space-x-3">
                <WalletMultiButton className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-150 shadow-lg border border-pink-400/30 text-sm font-medium" />
              </div>

              {/* Mobile Toggle */}
              <button 
                className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-150 relative"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden flex flex-col bg-purple-500 bg-opacity-95 backdrop-blur-xl pt-20">
          {/* Close Button */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-150"
          >
            <HiX className="w-7 h-7" />
          </button>

          {/* Content */}
          <div className="flex flex-col items-center px-6 py-6 h-full justify-between">
            {/* Nav Links */}
            <nav className="flex flex-col items-center space-y-5">
              <button onClick={() => scrollToSection('marketplace')} className="text-white hover:text-pink-400 font-semibold text-lg">Marketplace</button>
              <button onClick={() => scrollToSection('stats')} className="text-white hover:text-yellow-400 font-semibold text-lg">Stats</button>
              <button onClick={() => scrollToSection('minting')} className="text-white hover:text-purple-400 font-semibold text-lg">NFT Minting</button>
              <button onClick={() => scrollToSection('token')} className="text-white hover:text-blue-400 flex items-center space-x-2 font-semibold text-lg">
                <HiCurrencyDollar className="w-5 h-5" />
                <span>$BNKZ Trading</span>
              </button>
              <button onClick={() => scrollToSection('profile')} className="text-white hover:text-green-400 flex items-center space-x-2 font-semibold text-lg">
                <HiUser className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <a href="/Bonkeez Whitepaper (1).pdf" download onClick={() => setIsMenuOpen(false)} className="text-white hover:text-red-400 flex items-center space-x-2 font-semibold text-lg">
                <HiDocumentText className="w-5 h-5" />
                <span>Whitepaper</span>
              </a>
            </nav>

            {/* Token + Wallet + Socials */}
            <div className="flex flex-col items-center space-y-4">
              {/* Token Data */}
              <div className="flex items-center bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-lg px-3 py-2">
                <img src="/bonk.JPG" alt="Bonk" className="w-6 h-6 rounded-full object-cover mr-2" />
                <div>
                  <p className="text-pink-300 font-bold text-sm">
                    {tokenData?.price || '$0.0001'}
                  </p>
                  <p className={`text-xs ${(tokenData?.change24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {tokenData?.change24h ? `${tokenData.change24h >= 0 ? '+' : ''}${tokenData.change24h.toFixed(1)}%` : '+0.0%'}
                  </p>
                </div>
              </div>

              {/* Wallet */}
              <WalletMultiButton className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium" />

              {/* Socials */}
              <div className="flex space-x-6">
                <button onClick={() => handleSocialClick('twitter')} className="text-slate-300 hover:text-emerald-400 transition-colors">
                  <FaTwitter className="w-6 h-6" />
                </button>
                <button onClick={() => handleSocialClick('telegram')} className="text-slate-300 hover:text-emerald-400 transition-colors">
                  <FaTelegramPlane className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
