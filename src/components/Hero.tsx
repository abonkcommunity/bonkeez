import React from 'react'
import { Zap, TrendingUp, Users, Star } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-slate-600/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-400/20 text-emerald-400 px-6 py-3 rounded-full text-lg font-bold mb-8">
            <Zap className="w-5 h-5 mr-2" />
            Coming Soon
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            The Ultimate
            <span className="block bg-gradient-to-r from-emerald-400 to-slate-300 bg-clip-text text-transparent">
              Bonkeez Exchange
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Trade exclusive Bonkeez NFTs with $BNKZ tokens on Solana. 
            Join the colorful revolution created by Adam, the anonymous dev.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105">
              Explore Collection
            </button>
            <button className="border-2 border-slate-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800/50 transition-all transform hover:scale-105">
              Buy $BNKZ Token
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">6</p>
            <p className="text-slate-400">Unique Characters</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">0</p>
            <p className="text-slate-400">Current Holders</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-slate-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">5,350</p>
            <p className="text-slate-400">Total Supply</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">Soon</p>
            <p className="text-slate-400">Launch Status</p>
          </div>
        </div>

        {/* Featured Preview */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Meet the Bonkeez</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Bloo', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-500/20' },
              { name: 'Yelloo', color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-500/20' },
              { name: 'Redz', color: 'from-red-500 to-red-600', bg: 'bg-red-500/20' },
              { name: 'Pinko', color: 'from-pink-500 to-pink-600', bg: 'bg-pink-500/20' },
              { name: 'Purpo', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-500/20' },
              { name: 'Greeno', color: 'from-green-500 to-green-600', bg: 'bg-green-500/20' }
            ].map((bonkee) => (
              <div key={bonkee.name} className={`${bonkee.bg} backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:scale-105 transition-transform cursor-pointer`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${bonkee.color} rounded-full mx-auto mb-3 shadow-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <p className="text-white font-bold">{bonkee.name}</p>
                <p className="text-slate-400 text-sm">Character</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
