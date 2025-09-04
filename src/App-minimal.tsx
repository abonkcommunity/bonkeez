import React, { useState, useEffect } from 'react'
import './polyfills'

function AppMinimal() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set loading to false after brief delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-bold">Loading Bonkeez Exchange...</h2>
          <p className="text-slate-400 mt-2">Preparing your NFT marketplace experience</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600">
      <main>
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-white mb-6">
                Welcome to
                <span className="block bg-gradient-to-r from-purple-400 to-slate-300 bg-clip-text text-transparent">
                  Bonkeez Exchange
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                The premier NFT marketplace for the Bonkeez collection on Solana.
              </p>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
                <h3 className="text-emerald-400 font-bold text-lg mb-2">App is Loading Successfully!</h3>
                <p className="text-slate-300">All components will be added step by step</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AppMinimal