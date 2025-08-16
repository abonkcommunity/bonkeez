import React from 'react'
import { Star, Heart, ExternalLink, TrendingUp } from 'lucide-react'

const FeaturedNFTs = () => {
  const featuredNFTs = [
    {
      id: 1,
      name: 'Bloo Bonkee #001',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/bloo-bonkee-1755298715025-223344300.jpeg',
      price: '12.3 SOL',
      lastSale: '10.8 SOL',
      change: '+13.9%',
      rarity: 'Rare',
      owner: '0x1234...5678',
      likes: 247
    },
    {
      id: 2,
      name: 'Yelloo Bonkee #042',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/yelloo-bonkee-1755298146545-396548464.jpeg',
      price: '15.5 SOL',
      lastSale: '14.2 SOL',
      change: '+9.2%',
      rarity: 'Ultra Rare',
      owner: '0x9876...4321',
      likes: 389
    },
    {
      id: 3,
      name: 'Redz Bonkee #123',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/redz-1755298949640-153157693.jpeg',
      price: '18.7 SOL',
      lastSale: '16.1 SOL',
      change: '+16.1%',
      rarity: 'Legendary',
      owner: '0x5555...9999',
      likes: 512
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

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? 'text-green-400' : 'text-red-400'
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Featured <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NFTs</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Discover the most sought-after Bonkeez in our collection
            </p>
          </div>
          <button className="hidden md:flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors">
            <TrendingUp className="w-5 h-5" />
            <span>View All</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredNFTs.map((nft) => (
            <div key={nft.id} className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
              {/* NFT Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img 
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${getRarityColor(nft.rarity)}`}>
                  {nft.rarity}
                </div>
              </div>

              {/* NFT Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{nft.name}</h3>
                  <p className="text-gray-400 text-sm">Owned by {nft.owner}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-gray-400 text-sm">{nft.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-400 text-sm">4.8</span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${getChangeColor(nft.change)}`}>
                    {nft.change}
                  </div>
                </div>

                {/* Price Info */}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-gray-400 text-sm">Current Price</p>
                      <p className="text-white font-bold text-lg">{nft.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Last Sale</p>
                      <p className="text-gray-300 text-sm">{nft.lastSale}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
                      Buy Now
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      Make Offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-8 md:hidden">
          <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors mx-auto">
            <TrendingUp className="w-5 h-5" />
            <span>View All NFTs</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedNFTs
