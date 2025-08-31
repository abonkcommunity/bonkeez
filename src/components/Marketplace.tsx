import React, { useState } from 'react'
import { Search, Filter, Grid, List, Clock, Star, Users, Bell } from 'lucide-react'

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('price')
  const [searchTerm, setSearchTerm] = useState('')

  // Pre-launch state - no actual listings yet
  const previewListings = [
    {
      id: 1,
      name: 'Bloo Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/bloo-bonkee-1755298715025-223344300.jpeg',
      price: '0.8 SOL',
      bnkzPrice: '720 BNKZ',
      rarity: 'Rare',
      totalSupply: 500,
      status: 'Coming Soon'
    },
    {
      id: 2,
      name: 'Yelloo Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/yelloo-bonkee-1755298146545-396548464.jpeg',
      price: '0.5 SOL',
      bnkzPrice: '450 BNKZ',
      rarity: 'Common',
      totalSupply: 2000,
      status: 'Coming Soon'
    },
    {
      id: 3,
      name: 'Redz Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/redz-1755298949640-153157693.jpeg',
      price: '1.2 SOL',
      bnkzPrice: '1,080 BNKZ',
      rarity: 'Legendary',
      totalSupply: 100,
      status: 'Coming Soon'
    },
    {
      id: 4,
      name: 'Pinko Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/image-1755299183632-281941757.jpg',
      price: '0.4 SOL',
      bnkzPrice: '360 BNKZ',
      rarity: 'Common',
      totalSupply: 2000,
      status: 'Coming Soon'
    },
    {
      id: 5,
      name: 'Purpo Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/purpo-bonkee-1755299353407-767500589.jpeg',
      price: '0.9 SOL',
      bnkzPrice: '810 BNKZ',
      rarity: 'Ultra Rare',
      totalSupply: 250,
      status: 'Coming Soon'
    },
    {
      id: 6,
      name: 'Greeno Bonkee',
      image: 'https://cdn.chatandbuild.com/users/689bee88f300c9caf5f9881e/greeno-bonkee-1755299593663-446736790.jpeg',
      price: '0.7 SOL',
      bnkzPrice: '630 BNKZ',
      rarity: 'Rare',
      totalSupply: 500,
      status: 'Coming Soon'
    }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-slate-400 bg-slate-400/20'
      case 'Uncommon': return 'text-green-400 bg-green-400/20'
      case 'Rare': return 'text-blue-400 bg-blue-400/20'
      case 'Ultra Rare': return 'text-purple-400 bg-purple-400/20'
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/20'
      default: return 'text-slate-400 bg-slate-400/20'
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is now handled by real-time filtering in filteredListings
    if (searchTerm) {
      const results = filteredListings.length
      if (results === 0) {
        alert(`No results found for "${searchTerm}"`)
      }
    }
  }

  const handleFilter = () => {
    const filterOptions = ['All', 'Common', 'Rare', 'Ultra Rare', 'Legendary']
    const selectedFilter = prompt(`Filter by rarity:\n${filterOptions.join(', ')}`, 'All')
    
    if (selectedFilter && filterOptions.includes(selectedFilter)) {
      if (selectedFilter === 'All') {
        setSearchTerm('')
      } else {
        setSearchTerm(selectedFilter)
      }
    }
  }

  const handleNotifyLaunch = () => {
    alert('Launch notification signup coming soon! Get notified when the collection goes live.')
  }

  const handleComingSoon = () => {
    alert('This NFT will be available for minting at launch. Stay tuned!')
  }

  // Filter listings based on search term
  const filteredListings = previewListings.filter(listing =>
    listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.rarity.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section id="marketplace" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/20 via-fuchsia-900/15 to-pink-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Marketplace Preview
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Preview the upcoming Bonkeez collection. Launch pricing with 10% discount available with $BNKZ tokens.
          </p>
        </div>

        {/* Pre-launch Notice */}
        <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-2xl p-6 mb-8 text-center">
          <div className="inline-flex items-center bg-emerald-400/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Clock className="w-4 h-4 mr-2" />
            Pre-Launch Preview
          </div>
          <p className="text-white text-lg mb-2">Collection launching soon!</p>
          <p className="text-slate-300">All NFTs will be available for minting at launch. No items have been minted yet.</p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-lg px-4 py-3 w-full lg:w-96">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search Bonkeez..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white placeholder-slate-400 outline-none flex-1"
              />
            </form>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 text-white rounded-lg px-4 py-3 outline-none border border-white/10"
              >
                <option value="price">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rarity">Rarity</option>
                <option value="supply">Supply</option>
              </select>

              {/* Filter */}
              <button 
                onClick={handleFilter}
                className="bg-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-colors flex items-center space-x-2 border border-white/10"
              >
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>

              {/* View Mode */}
              <div className="flex bg-white/10 rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredListings.map((listing) => (
            <div key={listing.id} className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:scale-105 transition-all group cursor-pointer ${
              viewMode === 'list' ? 'flex items-center space-x-6' : ''
            }`} onClick={handleComingSoon}>
              {/* Image */}
              <div className={`relative overflow-hidden rounded-xl ${
                viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'mb-4'
              }`}>
                <img 
                  src={listing.image} 
                  alt={listing.name}
                  className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                    viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                  }`}
                />
                <div className="absolute top-2 right-2 flex flex-col space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRarityColor(listing.rarity)}`}>
                    {listing.rarity}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-400/20 text-emerald-400">
                    {listing.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : 'space-y-3'}`}>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{listing.name}</h3>
                    <p className="text-slate-400 text-sm">Launch Collection</p>
                    {viewMode === 'grid' && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-emerald-400">Full Supply Available</span>
                      </div>
                    )}
                  </div>

                  {viewMode === 'list' && (
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-white font-bold">{listing.price}</p>
                        <p className="text-emerald-400 text-sm">{listing.bnkzPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-sm">Supply</p>
                        <p className="text-emerald-400 font-medium">{listing.totalSupply.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-sm">Status</p>
                        <p className="text-emerald-400 font-medium">{listing.status}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleComingSoon()
                        }}
                        className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-2 rounded-lg font-bold opacity-75 cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    </div>
                  )}
                </div>

                {viewMode === 'grid' && (
                  <>
                    {/* Supply Info */}
                    <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">Total Supply</span>
                        <span className="text-emerald-400 text-sm font-medium">Full Supply Available</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">0 minted</span>
                        <span className="text-emerald-400">{listing.totalSupply.toLocaleString()} available</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-sm">Launch Price</span>
                        <span className="text-emerald-400 text-sm">10% off with $BNKZ</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-lg">{listing.price}</span>
                          <span className="text-slate-400 text-sm">SOL</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-400 font-bold">{listing.bnkzPrice}</span>
                          <span className="text-emerald-400 text-sm">$BNKZ</span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleComingSoon()
                      }}
                      className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 rounded-xl font-bold opacity-75 cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg mb-4">No Bonkeez found matching your search.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Launch Info */}
        <div className="text-center mt-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready for Launch</h3>
            <p className="text-slate-300 mb-6">
              All 5,350 Bonkeez NFTs will be available for minting at launch. 
              Be ready to secure your favorite characters!
            </p>
            <button 
              onClick={handleNotifyLaunch}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center space-x-2 mx-auto"
            >
              <Bell className="w-5 h-5" />
              <span>Get Notified at Launch</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Marketplace
