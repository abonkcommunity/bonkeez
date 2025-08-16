import React from 'react'
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react'

const Hero = () => {
  const handleExploreCollection = () => {
    const element = document.getElementById('collection')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleViewOpenSea = () => {
    window.open('https://opensea.io/collection/bonkeez', '_blank')
  }

  const handleBuyNow = () => {
    const element = document.getElementById('marketplace')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Live on Solana Blockchain
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              The Ultimate
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Bonkeez </span>
              Exchange
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Discover, collect, and trade exclusive Bonkeez NFTs on the most advanced marketplace. 
              Built by Adam, the anonymous dev behind the colorful revolution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleExploreCollection}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-lg font-bold hover:from-yellow-500 hover:to-orange-600 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={handleViewOpenSea}
                className="border-2 border-white/20 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all cursor-pointer"
              >
                View on OpenSea
              </button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Secure Trading</p>
                  <p className="text-gray-400 text-sm">Blockchain verified</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Low Fees</p>
                  <p className="text-gray-400 text-sm">2.5% marketplace fee</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Instant Trades</p>
                  <p className="text-gray-400 text-sm">Lightning fast</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Featured NFT */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              <img 
                src="https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/yelloo-bonkee-1755298146545-396548464.jpeg"
                alt="Yelloo Bonkee"
                className="w-full h-96 object-cover object-center rounded-2xl mb-6"
              />
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Yelloo Bonkee #001</h3>
                <p className="text-gray-300 mb-4">The original sunshine Bonkee</p>
                
                <div className="flex justify-between items-center bg-black/30 rounded-lg p-4">
                  <div>
                    <p className="text-gray-400 text-sm">Current Price</p>
                    <p className="text-white font-bold text-xl">15.5 SOL</p>
                  </div>
                  <button 
                    onClick={handleBuyNow}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-lg font-bold hover:from-yellow-500 hover:to-orange-600 transition-all cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-40 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
