import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TokenStats from './components/TokenStats'
import TokenTrading from './components/TokenTrading'
import Marketplace from './components/Marketplace'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      <Header />
      <Hero />
      <TokenStats />
      <TokenTrading />
      <Marketplace />
      <Footer />
    </div>
  )
}

export default App
