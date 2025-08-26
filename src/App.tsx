import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TokenStats from './components/TokenStats'
import TokenTrading from './components/TokenTrading'
import Marketplace from './components/Marketplace'
import Footer from './components/Footer'
import NotificationSystem, { useNotifications } from './components/NotificationSystem'
import UserProfile from './components/UserProfile'
import NFTMinting from './components/NFTMinting'

function App() {
  const { notifications, addNotification, removeNotification } = useNotifications()

  // Add welcome notification
  React.useEffect(() => {
    setTimeout(() => {
      addNotification('info', 'Welcome to Bonkeez Exchange!', 'All systems are now fully functional')
    }, 2000)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900">
      <NotificationSystem 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
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
