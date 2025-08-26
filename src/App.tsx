import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TokenStats from './components/TokenStats'
import TokenTrading from './components/TokenTrading'
import Marketplace from './components/Marketplace'
import Footer from './components/Footer'
import UserProfile from './components/UserProfile'
import NFTMinting from './components/NFTMinting'
import Staking from './components/Staking'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900">
      <Header />
      <Hero />
      <TokenStats />
      <TokenTrading />
      <Marketplace />
      
      {/* New Functional Sections */}
      <section id="minting" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Mint Your Bonkeez
            </h2>
            <p className="text-xl text-slate-300">
              Mint unique Bonkeez NFTs directly from the collection
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <NFTMinting />
          </div>
        </div>
      </section>

      <section id="staking" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Stake & Earn
            </h2>
            <p className="text-xl text-slate-300">
              Earn passive rewards by staking your $BNKZ tokens
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Staking />
          </div>
        </div>
      </section>

      <section id="profile" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Profile
            </h2>
            <p className="text-xl text-slate-300">
              Manage your Bonkeez collection and account
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <UserProfile />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App
