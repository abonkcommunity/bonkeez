
import React, { useState, useEffect } from 'react'
import { User, Settings, Star, TrendingUp, Wallet, Edit2, ExternalLink, Loader } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { createUserProfile, generateUsername, type UserProfile as SolanaProfile, type NFTMetadata } from '../utils/solanaProfile'

const UserProfile = () => {
  const { publicKey, connected } = useWallet()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<SolanaProfile | null>(null)
  const [userInfo, setUserInfo] = useState({
    username: '',
    bio: 'Bonkeez NFT Collector & $BNKZ Holder',
    avatar: '/bonk.JPG'
  })

  // Auto-create profile when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      loadUserProfile()
    } else {
      setProfile(null)
    }
  }, [connected, publicKey])

  const loadUserProfile = async () => {
    if (!publicKey) return
    
    setLoading(true)
    try {
      const solanaProfile = await createUserProfile(publicKey.toString())
      setProfile(solanaProfile)
      
      // Auto-generate username if not set
      if (!userInfo.username) {
        setUserInfo(prev => ({
          ...prev,
          username: generateUsername(publicKey.toString())
        }))
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // In production, save to off-chain storage (Supabase/IPFS)
    alert('Profile updated successfully!')
  }

  const openSolscan = () => {
    if (publicKey) {
      window.open(`https://solscan.io/account/${publicKey.toString()}`, '_blank')
    }
  }

  if (!connected) {
    return (
      <div id="profile" className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h3>
        <p className="text-slate-400 mb-6">
          Connect your Solana wallet to automatically create your Bonkeez profile with your NFTs and $BNKZ balance
        </p>
        <WalletMultiButton className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all shadow-lg border border-pink-400/30 font-medium" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
        <Loader className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Loading Your Profile</h3>
        <p className="text-slate-400">Fetching your NFTs and $BNKZ balance from the blockchain...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">Profile Load Failed</h3>
        <p className="text-slate-400 mb-6">Unable to fetch your profile data from the blockchain</p>
        <button 
          onClick={loadUserProfile}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Your Bonkeez Profile</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={openSolscan}
            className="text-slate-400 hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-emerald-500/20"
            title="View on Solscan"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            {isEditing ? <Settings className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-lg p-3 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-400 text-sm font-medium">Connected Wallet</p>
            <p className="text-white font-mono text-sm">{`${profile.walletAddress.slice(0, 8)}...${profile.walletAddress.slice(-8)}`}</p>
          </div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Avatar and Basic Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={userInfo.avatar}
          alt="Avatar"
          className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30"
        />
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={userInfo.username}
                onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
                className="bg-white/10 text-white px-3 py-2 rounded-lg outline-none border border-white/20 w-full"
                placeholder="Username"
              />
              <textarea
                value={userInfo.bio}
                onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                className="bg-white/10 text-white px-3 py-2 rounded-lg outline-none border border-white/20 w-full"
                rows={2}
                placeholder="Bio"
              />
            </div>
          ) : (
            <div>
              <h4 className="text-white font-bold text-lg">{userInfo.username}</h4>
              <p className="text-slate-300 text-sm">{userInfo.bio}</p>
              <p className="text-slate-400 text-xs">Member since {profile.joinDate}</p>
            </div>
          )}
        </div>
      </div>

      {/* Real Blockchain Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-slate-400 text-sm">NFTs Owned</span>
          </div>
          <p className="text-white font-bold text-2xl">{profile.nftsOwned.length}</p>
          <p className="text-slate-300 text-xs">Verified on-chain</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg p-4 border border-emerald-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-slate-400 text-sm">Portfolio Value</span>
          </div>
          <p className="text-white font-bold text-2xl">{profile.solBalance.toFixed(2)} SOL</p>
          <p className="text-slate-300 text-xs">+ {profile.totalNFTValue.toFixed(1)} SOL (NFTs)</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg p-4 border border-pink-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <Wallet className="w-5 h-5 text-pink-400" />
            <span className="text-slate-400 text-sm">$BNKZ Balance</span>
          </div>
          <p className="text-white font-bold text-2xl">{profile.bnkzBalance.toLocaleString()}</p>
          <p className="text-slate-300 text-xs">Live from blockchain</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg p-4 border border-blue-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <User className="w-5 h-5 text-blue-400" />
            <span className="text-slate-400 text-sm">Rank</span>
          </div>
          <p className="text-white font-bold text-2xl">{profile.rank}</p>
          <p className="text-slate-300 text-xs">Based on holdings</p>
        </div>
      </div>

      {/* NFT Collection Preview */}
      {profile.nftsOwned.length > 0 && (
        <div className="mb-6">
          <h5 className="text-white font-bold mb-3">Your NFT Collection</h5>
          <div className="grid grid-cols-4 gap-2">
            {profile.nftsOwned.slice(0, 4).map((nft, index) => (
              <div key={index} className="aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/bonk.JPG'
                  }}
                />
              </div>
            ))}
          </div>
          {profile.nftsOwned.length > 4 && (
            <p className="text-slate-400 text-sm mt-2">
              +{profile.nftsOwned.length - 4} more NFTs
            </p>
          )}
        </div>
      )}

      {isEditing && (
        <div className="flex space-x-3">
          <button
            onClick={handleSaveProfile}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
          >
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 bg-slate-600 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-white/10">
        <button 
          onClick={loadUserProfile}
          className="w-full text-slate-400 hover:text-white transition-colors text-sm"
        >
          🔄 Refresh Profile Data
        </button>
      </div>
    </div>
  )
}

export default UserProfile
