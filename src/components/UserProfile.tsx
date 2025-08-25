
import React, { useState } from 'react'
import { User, Settings, Star, TrendingUp, Wallet, Edit2 } from 'lucide-react'

interface UserStats {
  nftsOwned: number
  totalValue: number
  bnkzBalance: number
  joinDate: string
}

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [userStats] = useState<UserStats>({
    nftsOwned: 12,
    totalValue: 45.7,
    bnkzBalance: 2850,
    joinDate: 'March 2024'
  })

  const [userInfo, setUserInfo] = useState({
    username: 'BonkeezCollector',
    bio: 'Passionate NFT collector and $BNKZ holder',
    avatar: '/bonk.JPG'
  })

  const handleSaveProfile = () => {
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Profile</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {isEditing ? <Settings className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
        </button>
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
                className="bg-white/10 text-white px-3 py-2 rounded-lg outline-none border border-white/20"
              />
              <textarea
                value={userInfo.bio}
                onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                className="bg-white/10 text-white px-3 py-2 rounded-lg outline-none border border-white/20 w-full"
                rows={2}
              />
            </div>
          ) : (
            <div>
              <h4 className="text-white font-bold text-lg">{userInfo.username}</h4>
              <p className="text-slate-300 text-sm">{userInfo.bio}</p>
              <p className="text-slate-400 text-xs">Member since {userStats.joinDate}</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-400 text-sm">NFTs Owned</span>
          </div>
          <p className="text-white font-bold text-lg">{userStats.nftsOwned}</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-400 text-sm">Portfolio Value</span>
          </div>
          <p className="text-white font-bold text-lg">{userStats.totalValue} SOL</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <Wallet className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 text-sm">$BNKZ Balance</span>
          </div>
          <p className="text-white font-bold text-lg">{userStats.bnkzBalance.toLocaleString()}</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex items-center space-x-2 mb-1">
            <User className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 text-sm">Rank</span>
          </div>
          <p className="text-white font-bold text-lg">Top 10%</p>
        </div>
      </div>

      {isEditing && (
        <div className="flex space-x-3">
          <button
            onClick={handleSaveProfile}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
          >
            Save Changes
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 bg-slate-600 text-white py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfile
