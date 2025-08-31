
import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TokenStats from './components/TokenStats'
import FeaturedNFTs from './components/FeaturedNFTs'
import Marketplace from './components/Marketplace'
import NFTMinting from './components/NFTMinting'
import UserProfile from './components/UserProfile'
import Footer from './components/Footer'
import NotificationSystem from './components/NotificationSystem'
import SecurityCheck from './components/SecurityCheck'
import './polyfills'

function App() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    timestamp: Date
  }>>([])

  useEffect(() => {
   
    
  

    // Set loading to false after brief delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    console.log('🎨 App component rendering…')
    console.log('🔍 Current loading state:', loading)
    
    if (!loading) {
      console.log('🎨 Rendering main app content…')
    }
    
    return () => {
      console.log('🧹 Cleaning up timers')
    }
  }, [loading])

  useEffect(() => {
    console.log('⏰ Setting up timers…')
    
    const intervalId = setInterval(() => {
      // Clean up old notifications (older than 10 seconds)
      setNotifications(prev => 
        prev.filter(notif => Date.now() - notif.timestamp.getTime() < 10000)
      )
    }, 1000)
    
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const addNotification = (notification: Omit<typeof notifications[0], 'id' | 'timestamp'>) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setNotifications(prev => [...prev, newNotification])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-bold">Loading Bonkeez Exchange...</h2>
          <p className="text-slate-400 mt-2">Preparing your NFT marketplace experience</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bonkee-pink/90 via-bonkee-purple/80 to-bonkee-blue/90">
      <SecurityCheck />
      <NotificationSystem 
        notifications={notifications} 
        onRemove={removeNotification}
      />
      <Header />
      <main>
        <Hero  />
        <TokenStats />
        <Marketplace />
        <NFTMinting  />
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Your Profile
              </h2>
              <p className="text-xl text-slate-300">
                Connect your wallet to view your NFTs, $BNKZ balance, and portfolio stats
              </p>
            </div>
            <UserProfile />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
