
import React from 'react'
import { FaTwitter, FaTelegramPlane, FaExternalLinkAlt, FaUsers } from 'react-icons/fa'

const Footer = () => {
  const handleSocialClick = (platform: string) => {
    const urls = {
      twitter: 'https://x.com/abonkcommunity?s=21',
      telegram: 'https://t.me/+Mh9YQsnnRcZlNWFh'
    }
    
    const url = urls[platform as keyof typeof urls]
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleLinkClick = (section: string) => {
    if (section === 'privacy' || section === 'terms') {
      alert(`${section.charAt(0).toUpperCase() + section.slice(1)} page coming soon!`)
    } else {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <button 
              onClick={scrollToTop}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-150"
            >
              <img 
                src="/bonk.JPG" 
                alt="Bonkeez Logo" 
                className="w-10 h-10 rounded-full object-cover shadow-lg border-2 border-purple-700/30"
              />
              <div>
                <h3 className="text-white font-bold text-xl">Bonkeez</h3>
                <p className="text-slate-400 text-xs">NFT Exchange</p>
              </div>
            </button>
            <p className="text-slate-300 text-sm">
              The premier NFT marketplace for the Bonkeez collection on Solana. 
              Trade with $BNKZ tokens and unlock exclusive benefits.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSocialClick('twitter')}
                className="text-slate-400 hover:text-purple-300 transition-colors duration-150"
              >
                <FaTwitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('telegram')}
                className="text-slate-400 hover:text-purple-300 transition-colors duration-150"
              >
                <FaTelegramPlane className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Navigation</h4>
            <nav className="space-y-2">
              <button 
                onClick={() => handleLinkClick('marketplace')}
                className="block text-slate-400 hover:text-purple-300 transition-colors duration-150 text-sm"
              >
                Marketplace
              </button>
              <button 
                onClick={() => handleLinkClick('stats')}
                className="block text-slate-400 hover:text-purple-300 transition-colors duration-150 text-sm"
              >
                Stats
              </button>
              <button 
                onClick={() => handleLinkClick('minting')}
                className="block text-slate-400 hover:text-purple-300 transition-colors duration-150 text-sm"
              >
                NFT Minting
              </button>
              <button 
                onClick={() => handleLinkClick('profile')}
                className="block text-slate-400 hover:text-purple-300 transition-colors duration-150 text-sm"
              >
                Profile
              </button>
            </nav>
          </div>

          {/* Token */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">$BNKZ Token</h4>
            <nav className="space-y-2">
              <button 
                onClick={() => handleLinkClick('token')}
                className="block text-slate-400 hover:text-purple-300 transition-colors duration-150 text-sm"
              >
                $BNKZ Trading
              </button>
              <a 
                href="/Bonkeez Whitepaper (1).pdf" 
                download 
                className="flex items-center space-x-2 text-slate-400 hover:text-purple-300 transition-colors duration-150 text-sm"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                <span>Whitepaper</span>
              </a>
            </nav>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Community</h4>
            <nav className="space-y-2">
              <button 
                onClick={() => handleSocialClick('telegram')}
                className="flex items-center space-x-2 text-slate-400 hover:text-purple-300 transition-colors duration-150 text-sm"
              >
                <FaTelegramPlane className="w-4 h-4" />
                <span>Join Telegram</span>
              </button>
              <button 
                onClick={() => handleSocialClick('twitter')}
                className="flex items-center space-x-2 text-slate-400 hover:text-purple-300 transition-colors duration-150 text-sm"
              >
                <FaTwitter className="w-4 h-4" />
                <span>Follow Twitter</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>© 2025 Bonkeez NFT Exchange</span>
              <button 
                onClick={() => handleLinkClick('privacy')}
                className="hover:text-purple-300 transition-colors duration-150"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleLinkClick('terms')}
                className="hover:text-purple-300 transition-colors duration-150"
              >
                Terms of Service
              </button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-slate-400">Built on</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="text-purple-300 font-medium">Solana</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
