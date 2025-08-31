
import React, { useState, useEffect } from 'react'
import { HiMenu, HiX, HiWallet, HiUser, HiCurrencyDollar, HiDocumentText } from 'react-icons/hi'
import { FaTwitter, FaGithub, FaDiscord, FaEnvelope } from 'react-icons/fa'
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
      discord: 'https://discord.gg/bonkeez',
      github: 'https://github.com/bonkeez',
      email: 'mailto:hello@bonkeez.io'
    }
    
    const url = urls[platform as keyof typeof urls]
    if (url) {
      if (platform === 'email') {
        window.location.href = url
      } else {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
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
              <button 
                onClick={() => scrollToSection('marketplace')} 
                className="text-white hover:text-pink-400 transition-colors duration-150 font-medium text-sm"
              >
                Marketplace
              </button>
              <button 
                onClick={() => scrollToSection('stats')} 
                className="text-white hover:text-yellow-400 transition-colors duration-150 font-medium text-sm"
              >
                Stats
              </button>
              <button 
                onClick={() => scrollToSection('minting')} 
                className="text-white hover:text-purple-400 transition-colors duration-150 font-medium text-sm"
              >
                NFT Minting
              </button>
              <button 
                onClick={() => scrollToSection('token')} 
                className="text-white hover:text-blue-400 transition-colors duration-150 flex items-center space-x-1 font-medium text-sm"
              >
                <HiCurrencyDollar className="w-4 h-4" />
                <span>$BNKZ Trading</span>
              </button>
              <button 
                onClick={() => scrollToSection('profile')} 
                className="text-white hover:text-green-400 transition-colors duration-150 flex items-center space-x-1 font-medium text-sm"
              >
                <HiUser className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <a 
                href="/Bonkeez Whitepaper (1).pdf" 
                download 
                className="text-white hover:text-red-400 transition-colors duration-150 flex items-center space-x-1 font-medium text-sm"
              >
                <HiDocumentText className="w-4 h-4" />
                <span>Whitepaper</span>
              </a>
            </nav>

            {/* Right Section */}
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
                    {tokenData?.change24h ? `${tokenData.change24h >= 0 ? '+' : ''}${tokenData.change24h.toFixed(1)}%` : '+0.0%'}
                  </p>
                </div>
              </div>

              {/* Wallet Connection */}
              <div className="hidden md:flex items-center space-x-3">
                <WalletMultiButton className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-150 flex items-center space-x-2 shadow-lg hover:shadow-pink-500/25 border border-pink-400/30 font-medium text-sm" />
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-150 z-50 relative"
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
        <div 
          className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Semi-transparent background */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Overlay Content */}
          <div className={`relative h-full flex flex-col transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <img 
                  src="/bonk.JPG" 
                  alt="Bonkeez Logo" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-pink-500/30"
                />
                <div>
                  <h3 className="text-white font-bold text-lg">Bonkeez</h3>
                  <p className="text-pink-300 text-xs">NFT Exchange</p>
                </div>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-150"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>

            {/* Main Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              
              {/* Token Price Card */}
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-xl p-4 backdrop-blur-sm mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/bonk.JPG" 
                      alt="Bonk" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-white font-bold text-sm">$BNKZ</p>
                      <p className="text-slate-400 text-xs">Bonkeez Token</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-pink-300 font-bold text-lg">
                      {tokenData?.price || '$0.0001'}
                    </p>
                    <p className={`text-sm ${
                      (tokenData?.change24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {tokenData?.change24h ? `${tokenData.change24h >= 0 ? '+' : ''}${tokenData.change24h.toFixed(1)}%` : '+0.0%'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Wallet Connection */}
              <div className="mb-8">
                <WalletMultiButton className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-4 rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-150 flex items-center justify-center space-x-2 shadow-lg border border-pink-400/30 font-bold" />
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1 mb-8">
                <h4 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-3">Navigation</h4>
                
                <button 
                  onClick={() => scrollToSection('marketplace')} 
                  className="w-full flex items-center space-x-3 text-white hover:bg-white/10 p-3 rounded-lg transition-colors duration-150 text-left"
                >
                  <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-pink-400 text-sm">🏪</span>
                  </div>
                  <span className="font-medium">Marketplace</span>
                </button>
                
                <button 
                  onClick={() => scrollToSection('stats')} 
                  className="w-full flex items-center space-x-3 text-white hover:bg-white/10 p-3 rounded-lg transition-colors duration-150 text-left"
                >
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-400 text-sm">📊</span>
                  </div>
                  <span className="font-medium">Stats</span>
                </button>
                
                <button 
                  onClick={() => scrollToSection('minting')} 
                  className="w-full flex items-center space-x-3 text-white hover:bg-white/10 p-3 rounded-lg transition-colors duration-150 text-left"
                >
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-purple-400 text-sm">🎨</span>
                  </div>
                  <span className="font-medium">NFT Minting</span>
                </button>
                
                <button 
                  onClick={() => scrollToSection('token')} 
                  className="w-full flex items-center space-x-3 text-white hover:bg-white/10 p-3 rounded-lg transition-colors duration-150 text-left"
                >
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <HiCurrencyDollar className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="font-medium">$BNKZ Trading</span>
                </button>
                
                <button 
                  onClick={() => scrollToSection('profile')} 
                  className="w-full flex items-center space-x-3 text-white hover:bg-white/10 p-3 rounded-lg transition-colors duration-150 text-left"
                >
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <HiUser className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="font-medium">Profile</span>
                </button>
                
                <a 
                  href="/Bonkeez Whitepaper (1).pdf" 
                  download 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center space-x-3 text-white hover:bg-white/10 p-3 rounded-lg transition-colors duration-150 text-left"
                >
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <HiDocumentText className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="font-medium">Whitepaper</span>
                </a>
              </nav>

              {/* Social Links */}
              <div className="border-t border-white/10 pt-6">
                <h4 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-3">Connect</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleSocialClick('twitter')}
                    className="flex items-center space-x-2 text-slate-300 hover:text-blue-400 hover:bg-white/5 p-3 rounded-lg transition-all duration-150"
                  >
                    <FaTwitter className="w-5 h-5" />
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  <button 
                    onClick={() => handleSocialClick('discord')}
                    className="flex items-center space-x-2 text-slate-300 hover:text-indigo-400 hover:bg-white/5 p-3 rounded-lg transition-all duration-150"
                  >
                    <FaDiscord className="w-5 h-5" />
                    <span className="text-sm font-medium">Discord</span>
                  </button>
                  <button 
                    onClick={() => handleSocialClick('github')}
                    className="flex items-center space-x-2 text-slate-300 hover:text-gray-400 hover:bg-white/5 p-3 rounded-lg transition-all duration-150"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span className="text-sm font-medium">GitHub</span>
                  </button>
                  <button 
                    onClick={() => handleSocialClick('email')}
                    className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 hover:bg-white/5 p-3 rounded-lg transition-all duration-150"
                  >
                    <FaEnvelope className="w-5 h-5" />
                    <span className="text-sm font-medium">Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
