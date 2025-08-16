import React from 'react'
import { Star, Heart, ExternalLink } from 'lucide-react'

const FeaturedCollection = () => {
  const bonkeezCharacters = [
    {
      id: 1,
      name: 'Bloo Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/bloo-bonkee-1755298715025-223344300.jpeg',
      price: '12.3 SOL',
      rarity: 'Rare',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      name: 'Yelloo Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/yelloo-bonkee-1755298146545-396548464.jpeg',
      price: '15.5 SOL',
      rarity: 'Ultra Rare',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 3,
      name: 'Redz Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/redz-1755298949640-153157693.jpeg',
      price: '18.7 SOL',
      rarity: 'Legendary',
      color: 'from-red-400 to-red-600'
    },
    {
      id: 4,
      name: 'Pinko Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/image-1755299183632-281941757.jpg',
      price: '9.8 SOL',
      rarity: 'Common',
      color: 'from-pink-400 to-pink-600'
    },
    {
      id: 5,
      name: 'Greeno Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/greeno-bonkee-1755299593663-446736790.jpeg',
      price: '14.2 SOL',
      rarity: 'Rare',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 6,
      name: 'Purpo Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/purpo-bonkee-1755299353407-767500589.jpeg',
      price: '11.6 SOL',
      rarity: 'Uncommon',
      color: 'from-purple-400 to-purple-600'
    }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 bg-gray-400/20'
      case 'Uncommon': return 'text-green-400 bg-green-400/20'
      case 'Rare': return 'text-blue-400 bg-blue-400/20'
      case 'Ultra Rare': return 'text-purple-400 bg-purple-400/20'
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Meet the <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Bonkeez</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each Bonkee is a unique digital collectible with its own personality and rarity. 
            Discover the colorful world created by Adam, the anonymous artist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bonkeezCharacters.map((bonkee) => (
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
              </div>

              {/* NFT Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{bonkee.name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-gray-400 text-sm">(4.2)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm">Current Price</p>
                    <p className="text-white font-bold text-lg">{bonkee.price}</p>
                  </div>
                  <button className={`bg-gradient-to-r ${bonkee.color} text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform`}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all">
            View Full Collection
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection
