import React from 'react'
import { ExternalLink, Heart, Eye, Users, Clock } from 'lucide-react'

const Collection = () => {
  const bonkeez = [
    {
      id: 1,
      name: 'Bloo the Explorer',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/bloo-bonkee-1755298715025-223344300.jpeg',
      price: '0.8 SOL',
      bnkzPrice: '720 BNKZ',
      rarity: 'Rare',
      color: 'Blue',
      personality: 'Adventurous and curious, always seeking new horizons',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-500/10 to-blue-600/10',
      totalSupply: 500,
      minted: 127,
      holders: 89
    },
    {
      id: 2,
      name: 'Yelloo the Optimist',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/yelloo-bonkee-1755298146545-396548464.jpeg',
      price: '0.5 SOL',
      bnkzPrice: '450 BNKZ',
      rarity: 'Common',
      color: 'Yellow',
      personality: 'Bright and cheerful, spreads joy wherever they go',
      gradient: 'from-yellow-500 to-yellow-600',
      bgGradient: 'from-yellow-500/10 to-yellow-600/10',
      totalSupply: 2000,
      minted: 834,
      holders: 567
    },
    {
      id: 3,
      name: 'Redz the Warrior',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/redz-1755298949640-153157693.jpeg',
      price: '1.2 SOL',
      bnkzPrice: '1,080 BNKZ',
      rarity: 'Legendary',
      color: 'Red',
      personality: 'Bold and fierce, never backs down from a challenge',
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-500/10 to-red-600/10',
      totalSupply: 100,
      minted: 23,
      holders: 21
    },
    {
      id: 4,
      name: 'Pinko the Dreamer',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/image-1755299183632-281941757.jpg',
      price: '0.4 SOL',
      bnkzPrice: '360 BNKZ',
      rarity: 'Common',
      color: 'Pink',
      personality: 'Creative and imaginative, lives in a world of possibilities',
      gradient: 'from-pink-500 to-pink-600',
      bgGradient: 'from-pink-500/10 to-pink-600/10',
      totalSupply: 2000,
      minted: 1456,
      holders: 892
    },
    {
      id: 5,
      name: 'Purpo the Mystic',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/purpo-bonkee-1755299353407-767500589.jpeg',
      price: '0.9 SOL',
      bnkzPrice: '810 BNKZ',
      rarity: 'Ultra Rare',
      color: 'Purple',
      personality: 'Wise and mysterious, holds ancient secrets',
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-500/10 to-purple-600/10',
      totalSupply: 250,
      minted: 67,
      holders: 54
    },
    {
      id: 6,
      name: 'Greeno the Guardian',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/greeno-bonkee-1755299593663-446736790.jpeg',
      price: '0.7 SOL',
      bnkzPrice: '630 BNKZ',
      rarity: 'Rare',
      color: 'Green',
      personality: 'Protective and nurturing, cares for all living things',
      gradient: 'from-purple-700 to-purple-800',
      bgGradient: 'from-purple-700/10 to-purple-800/10',
      totalSupply: 500,
      minted: 289,
      holders: 201
    }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-slate-400 bg-slate-400/20'
      case 'Uncommon': return 'text-purple-300 bg-purple-700/20'
      case 'Rare': return 'text-blue-400 bg-blue-400/20'
      case 'Ultra Rare': return 'text-purple-400 bg-purple-400/20'
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/20'
      default: return 'text-slate-400 bg-slate-400/20'
    }
  }

  const getScarcityLevel = (minted: number, total: number) => {
    const percentage = (minted / total) * 100
    if (percentage >= 90) return { level: 'Extremely Rare', color: 'text-red-400' }
    if (percentage >= 70) return { level: 'Very Scarce', color: 'text-orange-400' }
    if (percentage >= 40) return { level: 'Limited', color: 'text-yellow-400' }
    return { level: 'Available', color: 'text-purple-300' }
  }

  return (
    <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The Bonkeez Collection
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Six unique characters, each with their own personality and story. 
            Collect them all and unlock the full potential of the Bonkeez universe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bonkeez.map((bonkee) => {
            const remaining = bonkee.totalSupply - bonkee.minted
            const progressPercentage = (bonkee.minted / bonkee.totalSupply) * 100
            const scarcity = getScarcityLevel(bonkee.minted, bonkee.totalSupply)

            return (
              <div key={bonkee.id} className={`bg-gradient-to-br ${bonkee.bgGradient} backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:scale-105 transition-all duration-300 group`}>
                {/* Image */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img 
                    src={bonkee.image} 
                    alt={bonkee.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRarityColor(bonkee.rarity)}`}>
                      {bonkee.rarity}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold bg-black/50 backdrop-blur-sm ${scarcity.color}`}>
                      {scarcity.level}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{bonkee.name}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{bonkee.personality}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-r ${bonkee.gradient} rounded-full shadow-lg flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">B</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{bonkee.color} Bonkee</p>
                      <p className="text-slate-400 text-sm">Character #{bonkee.id}</p>
                    </div>
                  </div>

                  {/* Supply Stats */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Users className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-400 text-xs">Supply</span>
                        </div>
                        <p className="text-white font-bold text-sm">{bonkee.totalSupply.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Clock className="w-3 h-3 text-purple-300" />
                          <span className="text-purple-300 text-xs">Minted</span>
                        </div>
                        <p className="text-white font-bold text-sm">{bonkee.minted.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <Heart className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-400 text-xs">Holders</span>
                        </div>
                        <p className="text-white font-bold text-sm">{bonkee.holders}</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                      <div 
                        className={`bg-gradient-to-r ${bonkee.gradient} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">{remaining.toLocaleString()} left</span>
                      <span className="text-purple-300 font-medium">{progressPercentage.toFixed(1)}% sold</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-slate-400 text-sm">Launch Price</span>
                      <span className="text-purple-300 text-sm font-medium">10% off with $BNKZ</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-bold text-lg">{bonkee.price}</span>
                        <span className="text-slate-400 text-sm">SOL</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-300 font-bold">{bonkee.bnkzPrice}</span>
                        <span className="text-purple-300 text-sm">$BNKZ</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button 
                      className={`flex-1 bg-gradient-to-r ${bonkee.gradient} text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity ${
                        remaining === 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={remaining === 0}
                    >
                      {remaining === 0 ? 'Sold Out' : 'Mint Now'}
                    </button>
                    <button className="bg-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:from-slate-600 hover:to-slate-700 transition-all shadow-lg border border-slate-600">
            View Full Collection
          </button>
        </div>
      </div>
    </section>
  )
}

export default Collection
