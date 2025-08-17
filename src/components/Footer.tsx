import React from 'react'
import { Twitter, MessageCircle, Github, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Bonkeez</h3>
                <p className="text-slate-400 text-sm">NFT Exchange</p>
              </div>
            </div>
            <p className="text-slate-300">
              The ultimate marketplace for Bonkeez NFTs. Created by Adam, the anonymous dev behind the colorful revolution.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marketplace */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Marketplace</h4>
            <ul className="space-y-2">
              <li><a href="#marketplace" className="text-slate-300 hover:text-emerald-400 transition-colors">Browse Collection</a></li>
              <li><a href="#collection" className="text-slate-300 hover:text-emerald-400 transition-colors">Featured NFTs</a></li>
              <li><a href="#token" className="text-slate-300 hover:text-emerald-400 transition-colors">$BNKZ Token</a></li>
              <li><a href="#stats" className="text-slate-300 hover:text-emerald-400 transition-colors">Statistics</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">API</a></li>
              <li><a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">Community</a></li>
            </ul>
          </div>

          {/* External Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">External</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://pump.fun/coin/Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center space-x-2"
                >
                  <span>Pumpfun</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a 
                  href="https://solscan.io/token/Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center space-x-2"
                >
                  <span>Solscan</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a 
                  href="https://solana.fm/address/Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center space-x-2"
                >
                  <span>Solana Explorer</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center space-x-2">
                  <span>Rarity Tools</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2024 Bonkeez NFT Exchange. Created by Adam, anonymous dev. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
