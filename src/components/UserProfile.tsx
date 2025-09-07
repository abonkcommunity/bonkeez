import React, { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { createUserProfile, UserProfile as SolanaUserProfile } from "../utils/solanaProfile"

const UserProfile: React.FC = () => {
  const { publicKey, connected } = useWallet()
  const [profile, setProfile] = useState<SolanaUserProfile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (connected && publicKey) {
      fetchUserProfile(publicKey.toString())
    } else {
      setProfile(null)
    }
  }, [connected, publicKey])

  const fetchUserProfile = async (walletAddress: string) => {
    setLoading(true)
    try {
      const solanaProfile = await createUserProfile(walletAddress)
      setProfile(solanaProfile)
    } catch (err) {
      console.error("Error fetching profile:", err)
    } finally {
      setLoading(false)
    }
  }

  // Not connected
  if (!connected) {
    return (
      <div className="p-6 bg-transparent rounded-2xl shadow-md text-center">
        
       
        <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 text-white px-6 py-2 rounded-xl font-medium" />
      </div>
    )
  }

  // Loading profile
  if (loading || !profile) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-md text-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    )
  }

  // Profile UI
  return (
    <section id="profile" className="py-10 bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Profile</h2>
            <p className="text-gray-500 mt-2">
              Wallet: {profile.walletAddress.slice(0, 6)}...{profile.walletAddress.slice(-4)}
            </p>
          </div>

          {/* Balances */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center mb-8">
            <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">SOL Balance</p>
              <p className="text-xl font-semibold text-gray-800">{profile.solBalance.toFixed(2)} SOL</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">BNKZ Balance</p>
              <p className="text-xl font-semibold text-gray-800">{profile.bnkzBalance.toFixed(2)} BNKZ</p>
            </div>
          </div>

          {/* NFTs */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">NFTs Owned</h3>
            {profile.nftsOwned.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {profile.nftsOwned.map((nft, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl shadow p-2 text-center">
                    <img
                      src={nft.image || "/placeholder-nft.png"}
                      alt={nft.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                      onError={(e) => (e.currentTarget.src = "/placeholder-nft.png")}
                    />
                    <p className="text-sm text-gray-700 truncate">{nft.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No NFTs found</p>
            )}
          </div>

          {/* Refresh button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => fetchUserProfile(profile.walletAddress)}
              className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
            >
              🔄 Refresh Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserProfile
