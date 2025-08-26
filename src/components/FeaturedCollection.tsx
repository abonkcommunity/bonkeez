import React from 'react'
import { Star, Heart, ExternalLink, Users } from 'lucide-react'

const FeaturedCollection = () => {
  const bonkeezCharacters = [
    {
      id: 1,
      name: 'Bloo Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/bloo-bonkee-1755298715025-223344300.jpeg',
      price: '0.8 SOL',
      rarity: 'Rare',
      totalSupply: 500,
      minted: 0,
      color: 'from-slate-600 to-slate-700'
    },
    {
      id: 2,
      name: 'Yelloo Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/yelloo-bonkee-1755298146545-396548464.jpeg',
      price: '0.5 SOL',
      rarity: 'Common',
      totalSupply: 2000,
      minted: 0,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      name: 'Redz Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/redz-1755298949640-153157693.jpeg',
      price: '1.2 SOL',
      rarity: 'Legendary',
      totalSupply: 100,
      minted: 0,
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 4,
      name: 'Pinko Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/image-1755299183632-281941757.jpg',
      price: '0.4 SOL',
      rarity: 'Common',
      totalSupply: 2000,
      minted: 0,
      color: 'from-slate-700 to-gray-700'
    },
    {
      id: 5,
      name: 'Greeno Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/greeno-bonkee-1755299593663-446736790.jpeg',
      price: '0.7 SOL',
      rarity: 'Rare',
      totalSupply: 500,
      minted: 0,
      color: 'from-pink-600 to-pink-700'
    },
    {
      id: 6,
      name: 'Purpo Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/purpo-bonkee-1755299353407-767500589.jpeg',
      price: '0.9 SOL',
      rarity: 'Ultra Rare',
      totalSupply: 250,
      minted: 0,
      color: 'from-slate-600 to-purple-600'
    }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-slate-400 bg-slate-400/20'
      case 'Uncommon': return 'text-emerald-400 bg-emerald-400/20'
      case 'Rare': return 'text-emerald-300 bg-emerald-300/20'
      case 'Ultra Rare': return 'text-emerald-200 bg-emerald-200/20'
      case 'Legendary': return 'text-emerald-100 bg-emerald-100/20'
      default: return 'text-slate-400 bg-slate-400/20'
    }
  }

  return (
    <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet the <span className="bg-gradient-to-r from-emerald-400 to-slate-300 bg-clip-text text-transparent">Bonkeez</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Each Bonkee is a unique digital collectible with its own personality and rarity. 
            Discover the colorful world created by Adam, the anonymous artist.
          </p>

          {/* Collection Stats */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">5,350</p>
                <p className="text-slate-400 text-sm">Total Supply</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-400">0</p>
                <p className="text-slate-400 text-sm">Minted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">5,350</p>
                <p className="text-slate-400 text-sm">Available</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">Pre-Launch</p>
                <p className="text-slate-400 text-sm">Status</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bonkeezCharacters.map((bonkee) => {
            const remaining = bonkee.totalSupply - bonkee.minted
            const progressPercentage = (bonkee.minted / bonkee.totalSupply) * 100

            return (
              <div key={bonkee.id} className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                {/* NFT Image */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img 
                    src={bonkee.image}
                    alt={bonkee.name}
                    className="w-full h-80 object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                      <button className="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors">
                        <Heart className="w-5 h-5 text-white" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm p-2 rounded-lg hover:bg-white/30 transition-colors">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Rarity Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${getRarityColor(bonkee.rarity)}`}>
                    {bonkee.rarity}
                  </div>

                  {/* Supply Status */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-black/50 backdrop-blur-sm text-emerald-400">
                    Full Supply Available
                  </div>
                </div>

                {/* NFT Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{bonkee.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-emerald-400 fill-current" />
                        <Star className="w-4 h-4 text-emerald-400 fill-current" />
                        <Star className="w-4 h-4 text-emerald-400 fill-current" />
                        <Star className="w-4 h-4 text-emerald-400 fill-current" />
                        <Star className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-slate-400 text-sm">(Pre-Launch)</span>
                    </div>
                  </div>

                  {/* Supply Progress */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">Supply</span>
                      </div>
                      <span className="text-white text-sm font-medium">
                        0 / {bonkee.totalSupply.toLocaleString()}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-400">{remaining.toLocaleString()} available</span>
                      <span className="text-slate-400 font-medium">Ready to mint</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-slate-400 text-sm">Launch Price</p>
                      <p className="text-white font-bold text-lg">{bonkee.price}</p>
                    </div>
                    <button 
                      className={`bg-gradient-to-r ${bonkee.color} text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg`}
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Supply Breakdown */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Collection Supply Breakdown</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-slate-400 bg-slate-400/20 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                Common
              </div>
              <p className="text-3xl font-bold text-white mb-2">4,000</p>
              <p className="text-slate-400 text-sm mb-2">Total Supply</p>
              <p className="text-emerald-400 font-medium">0.4 - 0.5 SOL</p>
            </div>

            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-blue-400 bg-blue-400/20 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                Rare
              </div>
              <p className="text-3xl font-bold text-white mb-2">1,000</p>
              <p className="text-slate-400 text-sm mb-2">Total Supply</p>
              <p className="text-emerald-400 font-medium">0.7 - 0.8 SOL</p>
            </div>

            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-purple-400 bg-purple-400/20 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                Ultra Rare
              </div>
              <p className="text-3xl font-bold text-white mb-2">250</p>
              <p className="text-slate-400 text-sm mb-2">Total Supply</p>
              <p className="text-emerald-400 font-medium">0.9 SOL</p>
            </div>

            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-yellow-400 bg-yellow-400/20 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                Legendary
              </div>
              <p className="text-3xl font-bold text-white mb-2">100</p>
              <p className="text-slate-400 text-sm mb-2">Total Supply</p>
              <p className="text-emerald-400 font-medium">1.2 SOL</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-lg font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-emerald-500/25">
            View Full Collection
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection