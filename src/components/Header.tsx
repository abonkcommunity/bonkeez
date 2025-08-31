
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
                onClick={() => scrollToSection('minting')} 
                className="text-white hover:text-purple-400 transition-colors font-medium text-sm"
              >
                NFT Minting
              </button>
              <button 
                onClick={() => scrollToSection('token')} 
                className="text-white hover:text-blue-400 transition-colors flex items-center space-x-1 font-medium text-sm"
              >
                <HiCurrencyDollar className="w-4 h-4" />
                <span>$BNKZ Trading</span>
              </button>
              <button 
                onClick={() => scrollToSection('profile')} 
                className="text-white hover:text-green-400 transition-colors flex items-center space-x-1 font-medium text-sm"
              >
                <HiUser className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <a 
                href="/Bonkeez Whitepaper (1).pdf" 
                download 
                className="text-white hover:text-red-400 transition-colors flex items-center space-x-1 font-medium text-sm"
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
                <WalletMultiButton className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all flex items-center space-x-2 shadow-lg hover:shadow-pink-500/25 border border-pink-400/30 font-medium text-sm" />
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors z-50 relative"
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
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Overlay Content */}
          <div className={`relative h-full flex flex-col justify-center items-center px-8 transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            
            {/* Close Button */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <HiX className="w-8 h-8" />
            </button>

            {/* Main Navigation Links - Centered */}
            <nav className="flex flex-col items-center space-y-8 mb-16">
              <button 
                onClick={() => scrollToSection('marketplace')} 
                className="text-white hover:text-pink-400 transition-colors font-bold text-2xl"
              >
                Marketplace
              </button>
              <button 
                onClick={() => scrollToSection('stats')} 
                className="text-white hover:text-yellow-400 transition-colors font-bold text-2xl"
              >
                Stats
              </button>
              <button 
                onClick={() => scrollToSection('minting')} 
                className="text-white hover:text-purple-400 transition-colors font-bold text-2xl"
              >
                NFT Minting
              </button>
              <button 
                onClick={() => scrollToSection('token')} 
                className="text-white hover:text-blue-400 transition-colors flex items-center space-x-2 font-bold text-2xl"
              >
                <HiCurrencyDollar className="w-7 h-7" />
                <span>$BNKZ Trading</span>
              </button>
              <button 
                onClick={() => scrollToSection('profile')} 
                className="text-white hover:text-green-400 transition-colors flex items-center space-x-2 font-bold text-2xl"
              >
                <HiUser className="w-7 h-7" />
                <span>Profile</span>
              </button>
              <a 
                href="/Bonkeez Whitepaper (1).pdf" 
                download 
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-red-400 transition-colors flex items-center space-x-2 font-bold text-2xl"
              >
                <HiDocumentText className="w-7 h-7" />
                <span>Whitepaper</span>
              </a>
            </nav>

            {/* Token Data */}
            <div className="flex items-center justify-center bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-xl p-4 backdrop-blur-sm mb-8">
              <div className="flex items-center space-x-3">
                <img 
                  src="/bonk.JPG" 
                  alt="Bonk" 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
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
            <div className="mb-12">
              <WalletMultiButton className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all flex items-center space-x-2 justify-center shadow-lg border border-pink-400/30 font-bold" />
            </div>

            {/* Social Media Icons Row - Bottom */}
            <div className="absolute bottom-8 left-0 right-0">
              <div className="flex justify-center space-x-8">
                <button 
                  onClick={() => handleSocialClick('twitter')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors p-3 rounded-full hover:bg-white/10"
                >
                  <FaTwitter className="w-8 h-8" />
                </button>
                <button 
                  onClick={() => handleSocialClick('discord')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors p-3 rounded-full hover:bg-white/10"
                >
                  <FaDiscord className="w-8 h-8" />
                </button>
                <button 
                  onClick={() => handleSocialClick('github')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors p-3 rounded-full hover:bg-white/10"
                >
                  <FaGithub className="w-8 h-8" />
                </button>
                <button 
                  onClick={() => handleSocialClick('email')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors p-3 rounded-full hover:bg-white/10"
                >
                  <FaEnvelope className="w-8 h-8" />
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
