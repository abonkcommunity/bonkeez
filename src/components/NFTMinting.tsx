import React, { useState, useCallback } from 'react'
import { Zap, Clock, Star, Coins } from 'lucide-react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, Keypair } from '@solana/web3.js'
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js'

const NFTMinting = () => {
  const [mintQuantity, setMintQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<'SOL' | 'BNKZ'>('SOL')
  const [isMinting, setIsMinting] = useState(false)
  const [mintStatus, setMintStatus] = useState<string>('')
  const [collectionSupply, setCollectionSupply] = useState(3247) // Will be updated from contract

  const { connection } = useConnection()
  const { publicKey, signTransaction, wallet } = useWallet()

  // Candy Machine configuration
  const CANDY_MACHINE_ID = new PublicKey('YOUR_CANDY_MACHINE_ID') // Replace with actual ID
  const COLLECTION_SIZE = 5350

  const mintPrice = {
    SOL: 0.8,
    BNKZ: 720
  }

  const handleMint = useCallback(async () => {
    if (!publicKey || !signTransaction || !wallet) {
      alert('Please connect your wallet first')
      return
    }

    setIsMinting(true)
    setMintStatus('Preparing mint...')

    try {
      // Initialize Metaplex
      const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet.adapter))

      setMintStatus('Loading Candy Machine...')

      // Fetch Candy Machine data
      const candyMachine = await metaplex.candyMachines().findByAddress({
        address: CANDY_MACHINE_ID
      })

      setMintStatus('Creating mint transaction...')

      // For demonstration - replace with actual candy machine mint logic
      const nftBuilder = await metaplex
        .nfts()
        .builders()
        .create({
          uri: "https://example.com/metadata.json", // Replace with actual metadata URI
          name: "Bonkeez NFT",
          sellerFeeBasisPoints: 500,
        })

      setMintStatus('Waiting for signature...')

      const { signature } = await metaplex.rpc().sendAndConfirmTransaction(nftBuilder, {
        commitment: 'confirmed'
      })

      setMintStatus('Mint successful!')
      alert(`Successfully minted ${mintQuantity} Bonkeez NFT${mintQuantity > 1 ? 's' : ''}!\n\nTransaction: ${signature}`)

      // Update collection supply (simulate)
      setCollectionSupply(prev => Math.max(0, prev - mintQuantity))

    } catch (error) {
      console.error('Minting error:', error)
      setMintStatus('Mint failed')
      alert(`Minting failed: ${error?.message || 'Unknown error'}`)
    } finally {
      setIsMinting(false)
      setTimeout(() => setMintStatus(''), 3000)
    }
  }, [publicKey, signTransaction, wallet, connection, mintQuantity, paymentMethod])

  const totalCost = mintPrice[paymentMethod] * mintQuantity

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="text-center mb-6">
        <div className="inline-flex items-center bg-green-400/20 text-green-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
          <Zap className="w-4 h-4 mr-2" />
          Live Minting
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Mint Bonkeez NFTs</h3>
        <p className="text-slate-300">Choose your quantity and payment method</p>
        <div className="text-sm text-slate-400 mt-2">
          {collectionSupply} / {COLLECTION_SIZE} remaining
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3">Quantity</label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMintQuantity(Math.max(1, mintQuantity - 1))}
            className="w-10 h-10 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-bold"
            disabled={isMinting}
          >
            -
          </button>
          <div className="flex-1 text-center">
            <div className="text-3xl font-bold text-white">{mintQuantity}</div>
            <div className="text-slate-400 text-sm">NFTs to mint</div>
          </div>
          <button
            onClick={() => setMintQuantity(Math.min(10, mintQuantity + 1))}
            className="w-10 h-10 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-bold"
            disabled={isMinting}
          >
            +
          </button>
        </div>
        <p className="text-slate-400 text-sm text-center mt-2">Maximum 10 per transaction</p>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3">Payment Method</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPaymentMethod('SOL')}
            disabled={isMinting}
            className={`p-4 rounded-lg border transition-all ${
              paymentMethod === 'SOL'
                ? 'border-purple-500 bg-purple-500/20 text-white'
                : 'border-white/20 bg-white/5 text-slate-300 hover:bg-white/10'
            } ${isMinting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="text-center">
              <div className="font-bold">SOL</div>
              <div className="text-sm">{mintPrice.SOL} SOL each</div>
            </div>
          </button>
          <button
            onClick={() => setPaymentMethod('BNKZ')}
            disabled={isMinting}
            className={`p-4 rounded-lg border transition-all ${
              paymentMethod === 'BNKZ'
                ? 'border-green-500 bg-green-500/20 text-white'
                : 'border-white/20 bg-white/5 text-slate-300 hover:bg-white/10'
            } ${isMinting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="text-center">
              <div className="font-bold">$BNKZ</div>
              <div className="text-sm">{mintPrice.BNKZ} BNKZ each</div>
              <div className="text-xs text-green-400">10% Discount</div>
            </div>
          </button>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400">Quantity</span>
          <span className="text-white">{mintQuantity} NFTs</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400">Price per NFT</span>
          <span className="text-white">{mintPrice[paymentMethod]} {paymentMethod}</span>
        </div>
        {paymentMethod === 'BNKZ' && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-400 text-sm">Discount applied</span>
            <span className="text-green-400 text-sm">-10%</span>
          </div>
        )}
        <hr className="border-white/20 my-3" />
        <div className="flex justify-between items-center">
          <span className="text-white font-bold">Total Cost</span>
          <span className="text-white font-bold text-lg">{totalCost} {paymentMethod}</span>
        </div>
      </div>

      {/* Mint Status */}
      {mintStatus && (
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
          <p className="text-blue-300 text-sm text-center">{mintStatus}</p>
        </div>
      )}

      {/* Mint Button */}
      <button
        onClick={handleMint}
        disabled={isMinting || !publicKey}
        className={`w-full py-4 rounded-xl font-bold transition-all ${
          isMinting || !publicKey
            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-purple-500/25'
        }`}
      >
        {!publicKey ? (
          'Connect Wallet to Mint'
        ) : isMinting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Minting...</span>
          </div>
        ) : (
          `Mint ${mintQuantity} NFT${mintQuantity > 1 ? 's' : ''}`
        )}
      </button>

      <p className="text-slate-400 text-sm text-center mt-3">
        You will receive randomly generated Bonkeez characters
      </p>
    </div>
  )
}

export default NFTMinting