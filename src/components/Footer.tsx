import React from 'react'
import { Twitter, Github, MessageCircle, ExternalLink, Mail, Users } from 'lucide-react'

const Footer = () => {
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
    } else {
      alert(`${platform.charAt(0).toUpperCase() + platform.slice(1)} coming soon!`)
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
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">B</span>
              </div>
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
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('discord')}
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('github')}
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('email')}
                className="text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Marketplace */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Marketplace</h4>
            <nav className="space-y-2">
              <button 
                onClick={() => handleLinkClick('marketplace')}
                className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                Browse Collection
              </button>
              <button 
                onClick={() => handleLinkClick('marketplace')}
                className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                Rarity Guide
              </button>
              <button 
                onClick={() => handleLinkClick('marketplace')}
                className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                Launch Schedule
              </button>
              <button 
                onClick={() => alert('Trading guide coming soon!')}
                className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                Trading Guide
              </button>
            </nav>
          </div>

          {/* Token */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">$BNKZ Token</h4>
            <nav className="space-y-2">
              <button 
                onClick={() => handleLinkClick('token')}
                className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                Buy $BNKZ
              </button>
              <button 
                onClick={() => handleLinkClick('stats')}
                className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                Token Stats
              </button>
              <button 
                onClick={() => alert('Staking guide coming soon!')}
                className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                Staking Guide
              </button>
              <button 
                onClick={() => alert('Tokenomics page coming soon!')}
                className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                Tokenomics
              </button>
            </nav>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Community</h4>
            <nav className="space-y-2">
              <button 
                onClick={() => handleSocialClick('discord')}
                className="flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                <Users className="w-4 h-4" />
                <span>Join Discord</span>
              </button>
              <button 
                onClick={() => handleSocialClick('twitter')}
                className="flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                <Twitter className="w-4 h-4" />
                <span>Follow Twitter</span>
              </button>
              <button 
                onClick={() => alert('Blog coming soon!')}
                className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                Blog
              </button>
              <button 
                onClick={() => alert('Help center coming soon!')}
                className="block text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                Help Center
              </button>
              <a 
                href="/Bonkeez Whitepaper (1).pdf" 
                download 
                className="flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Whitepaper</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>© 2024 Bonkeez NFT Exchange</span>
              <button 
                onClick={() => handleLinkClick('privacy')}
                className="hover:text-emerald-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleLinkClick('terms')}
                className="hover:text-emerald-400 transition-colors"
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
                <span className="text-emerald-400 font-medium">Solana</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
