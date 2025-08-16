import React, { useState } from 'react'
import { Filter, Grid, List, Search, SlidersHorizontal, Coins } from 'lucide-react'

const Marketplace = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('price-low')
  const [filterOpen, setFilterOpen] = useState(false)

  const listings = [
    { id: 1, name: 'Bloo Bonkee #123', price: '8.5 SOL', bnkzPrice: '460,271 BNKZ', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/bloo-bonkee-1755298715025-223344300.jpeg', rarity: 'Rare' },
    { id: 2, name: 'Yelloo Bonkee #456', price: '12.3 SOL', bnkzPrice: '666,124 BNKZ', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/yelloo-bonkee-1755298146545-396548464.jpeg', rarity: 'Ultra Rare' },
    { id: 3, name: 'Redz Bonkee #789', price: '15.7 SOL', bnkzPrice: '850,027 BNKZ', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/redz-1755298949640-153157693.jpeg', rarity: 'Legendary' },
    { id: 4, name: 'Pinko Bonkee #012', price: '6.8 SOL', bnkzPrice: '368,271 BNKZ', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/image-1755299183632-281941757.jpg', rarity: 'Common' },
    { id: 5, name: 'Greeno Bonkee #345', price: '10.2 SOL', bnkzPrice: '552,271 BNKZ', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/greeno-bonkee-1755299593663-446736790.jpeg', rarity: 'Rare' },
    { id: 6, name: 'Purpo Bonkee #678', price: '9.1 SOL', bnkzPrice: '492,671 BNKZ', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/purpo-bonkee-1755299353407-767500589.jpeg', rarity: 'Uncommon' },
    { id: 7, name: 'Bloo Bonkee #901', price: '11.4 SOL', bnkzPrice: '617,271 BNKZ', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/bloo-bonkee-1755298715025-223344300.jpeg', rarity: 'Rare' },
    { id: 8, name: 'Yelloo Bonkee #234', price: '18.9 SOL', bnkzPrice: '1,023,271 BNKZ', image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/yelloo-bonkee-1755298146545-396548464.jpeg', rarity: 'Legendary' }
  ]

  const handleBuyWithSOL = (listing: any) => {
    if (window.solana && window.solana.isConnected) {
      alert(`Purchasing ${listing.name} for ${listing.price}`)
    } else {
      alert('Please connect your Solana wallet first')
    }
  }

  const handleBuyWithBNKZ = (listing: any) => {
    if (window.solana && window.solana.isConnected) {
      alert(`Purchasing ${listing.name} for ${listing.bnkzPrice} (10% discount applied!)`)
    } else {
      alert('Please connect your Solana wallet first')
    }
  }

  const handleLoadMore = () => {
    alert('Loading more NFTs...')
  }

  return (
    <section id="marketplace" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Marketplace
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Browse and trade Bonkeez NFTs with other collectors
          </p>
          <div className="inline-flex items-center bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium">
            <Coins className="w-4 h-4 mr-2" />
            Now accepting $BNKZ payments with 10% discount!
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 w-full lg:w-96">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 outline-none cursor-pointer"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rarity">Rarity</option>
                <option value="newest">Newest</option>
              </select>

              {/* Filter Toggle */}
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>

              {/* View Mode */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded cursor-pointer ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded cursor-pointer ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {filterOpen && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Price Range</label>
                  <div className="flex space-x-2">
                    <input type="number" placeholder="Min" className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 w-full outline-none" />
                    <input type="number" placeholder="Max" className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 w-full outline-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Payment Method</label>
                  <select className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 w-full outline-none cursor-pointer">
                    <option value="">All Payments</option>
                    <option value="sol">SOL Only</option>
                    <option value="bnkz">$BNKZ Only</option>
                    <option value="both">SOL & $BNKZ</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Rarity</label>
                  <select className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 w-full outline-none cursor-pointer">
                    <option value="">All Rarities</option>
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="ultra-rare">Ultra Rare</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Character</label>
                  <select className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-2 w-full outline-none cursor-pointer">
                    <option value="">All Characters</option>
                    <option value="bloo">Bloo Bonkee</option>
                    <option value="yelloo">Yelloo Bonkee</option>
                    <option value="redz">Redz Bonkee</option>
                    <option value="pinko">Pinko Bonkee</option>
                    <option value="greeno">Greeno Bonkee</option>
                    <option value="purpo">Purpo Bonkee</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Listings Grid */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img 
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-48 object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                  {listing.rarity}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-white font-bold">{listing.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">SOL Price</span>
                    <span className="text-white font-bold">{listing.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 text-sm">$BNKZ Price</span>
                    <span className="text-yellow-400 font-bold">{listing.bnkzPrice}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleBuyWithSOL(listing)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all text-sm cursor-pointer"
                  >
                    Buy with SOL
                  </button>
                  <button 
                    onClick={() => handleBuyWithBNKZ(listing)}
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-2 rounded-lg font-bold hover:from-yellow-500 hover:to-orange-600 transition-all text-sm cursor-pointer"
                  >
                    Buy with $BNKZ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button 
            onClick={handleLoadMore}
            className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors cursor-pointer"
          >
            Load More NFTs
          </button>
        </div>
      </div>
    </section>
  )
}

export default Marketplace
