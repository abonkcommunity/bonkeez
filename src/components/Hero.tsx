
import React from 'react'
import { ArrowRight, Zap, Star, Users, TrendingUp } from 'lucide-react'

const Hero = () => {
  const scrollToMarketplace = () => {
    const element = document.getElementById('marketplace')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToToken = () => {
    const element = document.getElementById('token')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLearnMore = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-slate-600/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Status Badge */}
          <div className="inline-flex items-center bg-purple-400/20 text-purple-400 px-6 py-3 rounded-full text-lg font-bold mb-8">
            <Zap className="w-5 h-5 mr-2" />
            Pre-Launch • Collection Ready
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-purple-400 to-slate-300 bg-clip-text text-transparent">
              Bonkeez Exchange
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            The premier NFT marketplace for the Bonkeez collection on Solana. 
            Trade with $BNKZ tokens and unlock exclusive benefits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={scrollToMarketplace}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-150 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/25 text-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollToToken}
              className="border-2 border-slate-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800/50 transition-all duration-150 text-lg"
            >
              Get $BNKZ Token
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">5,350</h3>
            <p className="text-slate-400">Unique Bonkeez NFTs</p>
            <p className="text-purple-400 text-sm mt-1">Ready for Launch</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">1,247</h3>
            <p className="text-slate-400">$BNKZ Token Holders</p>
            <p className="text-purple-400 text-sm mt-1">Growing Community</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">0.4 SOL</h3>
            <p className="text-slate-400">Launch Price</p>
            <p className="text-blue-400 text-sm mt-1">Mint Price</p>
          </div>
        </div>

        {/* Featured Preview */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Meet the Bonkeez</h2>
            <p className="text-slate-300 text-lg">Six unique characters, each with their own rarity and personality</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Bloo', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/bloo-bonkee-1755298715025-223344300.jpeg', rarity: 'Rare' },
              { name: 'Yelloo', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/yelloo-bonkee-1755298146545-396548464.jpeg', rarity: 'Common' },
              { name: 'Redz', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/redz-1755298949640-153157693.jpeg', rarity: 'Legendary' },
              { name: 'Pinko', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/image-1755299183632-281941757.jpg', rarity: 'Common' },
              { name: 'Purpo', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/purpo-bonkee-1755299353407-767500589.jpeg', rarity: 'Ultra Rare' },
              { name: 'Greeno', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/greeno-bonkee-1755299593663-446736790.jpeg', rarity: 'Rare' }
            ].map((bonkee, index) => (
              <div key={index} className="group cursor-pointer" onClick={scrollToMarketplace}>
                <div className="relative overflow-hidden rounded-xl mb-3">
                  <img 
                    src={bonkee.image} 
                    alt={bonkee.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
                </div>
                <h4 className="text-white font-bold text-center">{bonkee.name}</h4>
                <p className="text-purple-400 text-sm text-center">{bonkee.rarity}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={scrollToMarketplace}
              className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:from-slate-600 hover:to-slate-700 transition-all duration-150"
            >
              View Full Collection
            </button>
          </div>
        </div>

        {/* Learn More */}
        <div className="text-center mt-16">
          <button 
            onClick={handleLearnMore}
            className="text-slate-400 hover:text-purple-400 transition-colors duration-150 flex items-center space-x-2 mx-auto"
          >
            <span>Learn more about Bonkeez</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
