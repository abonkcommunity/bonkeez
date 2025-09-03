import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TokenStats from './components/TokenStats'
import Marketplace from './components/Marketplace'
import Footer from './components/Footer'
import SecurityCheck from './components/SecurityCheck'
import TokenTrading  from './components/TokenTrading'
import './polyfills'
 

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Set loading to false after brief delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Global error handler
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error)
      setError('An unexpected error occurred. Please refresh the page.')
    }

    window.addEventListener('error', handleError)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('error', handleError)
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-white text-xl font-bold mb-4">Something went wrong</h2>
          <p className="text-slate-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

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
      <SecurityCheck />
      <Header />
      <main>
        <Hero />
        <TokenStats />
        <TokenTrading /> 
           <Marketplace />
        <section id="profile" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Your Profile
              </h2>
              <p className="text-xl text-slate-300">
                Connect your wallet to view your NFTs, $BNKZ balance, and portfolio stats
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App