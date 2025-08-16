import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FeaturedNFTs from './components/FeaturedNFTs'
import TokenStats from './components/TokenStats'
import TokenTrading from './components/TokenTrading'
import MarketplaceGrid from './components/MarketplaceGrid'
import Footer from './components/Footer'
import SecurityCheck from './components/SecurityCheck'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <SecurityCheck />
      <Header />
      <main>
        <Hero />
        <FeaturedNFTs />
        <TokenStats />
        <TokenTrading />
        <MarketplaceGrid />
      </main>
      <Footer />
    </div>
  )
}

export default App
