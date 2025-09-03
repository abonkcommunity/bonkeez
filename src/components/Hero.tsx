import React from 'react'
import { ArrowRight, Zap, Star } from 'lucide-react'
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa'

const Hero = () => {
  const scrollToMarketplace = () => {
    const element = document.getElementById('marketplace')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToToken = () => {
    const element = document.getElementById('token')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLearnMore = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/8 via-transparent to-green-400/8"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/6 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/6 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Status Badge */}
          <div className="inline-flex items-center bg-purple-400/20 text-purple-400 px-6 py-3 rounded-full text-lg font-bold mb-8">
            <Zap className="w-5 h-5 mr-2" />
            Pre-Launch • Collection Ready
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            Welcome to
            <span className="block bg-gradient-to-r from-purple-400 to-slate-300 bg-clip-text text-transparent">
              Bonkeez Exchange
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            The premier NFT marketplace for the Bonkeez collection on Solana. 
            Trade with $BNKZ tokens and unlock exclusive benefits.
          </p>

          {/* CTA Buttons + Socials */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 px-4">
            <button 
              onClick={scrollToMarketplace}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-150 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/25 text-base sm:text-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={scrollToToken}
              className="border-2 border-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-slate-800/50 transition-all duration-150 text-base sm:text-lg"
            >
              Get $BNKZ Token
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-12 sm:mb-16">
            <a 
              href="https://t.me/+Mh9YQsnnRcZlNWFh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-800 hover:text-purple-700 transition-colors"
            >
              <FaTelegramPlane className="w-7 h-7" />
            </a>
            <a 
              href="https://x.com/abonkcommunity?s=21" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-800 hover:text-purple-400 transition-colors"
            >
              <FaTwitter className="w-7 h-7" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center mb-12 sm:mb-16 px-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 text-center w-full sm:w-[400px]">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">5,350</h3>
            <p className="text-slate-400 text-sm sm:text-base">Unique Bonkeez NFTs</p>
            <p className="text-purple-400 text-xs sm:text-sm mt-1">Ready for Launch</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
