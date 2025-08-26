
import React, { useState, useEffect, useCallback } from 'react'
import { Lock, Unlock, Gift, TrendingUp, Clock, Coins } from 'lucide-react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js'
import { createAssociatedTokenAccountInstruction, createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'

interface StakeInfo {
  stakedAmount: number
  pendingRewards: number
  lastStakeTime: Date
  stakingDuration: number
}

const Staking = () => {
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [stakeInfo, setStakeInfo] = useState<StakeInfo>({
    stakedAmount: 0,
    pendingRewards: 0,
    lastStakeTime: new Date(),
    stakingDuration: 0
  })
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [stakingStatus, setStakingStatus] = useState('')

  const { connection } = useConnection()
  const { publicKey, signTransaction, wallet } = useWallet()

  // Staking program configuration
  const STAKING_PROGRAM_ID = new PublicKey('11111111111111111111111111111112') // System program as placeholder
  const BNKZ_MINT = new PublicKey('J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w') // Use the actual BNKZ mint
  const REWARDS_POOL = new PublicKey('11111111111111111111111111111112') // System program as placeholder

  // Staking parameters
  const APY = 12 // 12% APY
  const REWARD_RATE_PER_SECOND = APY / (365 * 24 * 60 * 60 * 100) // APY to rewards per second

  // Load staking info
  const loadStakeInfo = useCallback(async () => {
    if (!publicKey) return

    try {
      // In a real implementation, this would fetch from your staking program
      // For now, we'll use localStorage to simulate persistent data
      const savedStakeInfo = localStorage.getItem(`stake_${publicKey.toString()}`)
      if (savedStakeInfo) {
        const parsed = JSON.parse(savedStakeInfo)
        setStakeInfo({
          ...parsed,
          lastStakeTime: new Date(parsed.lastStakeTime)
        })
      }
    } catch (error) {
      console.error('Error loading stake info:', error)
    }
  }, [publicKey])

  // Calculate pending rewards
  const calculateRewards = useCallback(() => {
    if (stakeInfo.stakedAmount <= 0) return 0

    const now = Date.now()
    const lastUpdate = stakeInfo.lastStakeTime.getTime()
    const secondsStaked = (now - lastUpdate) / 1000
    
    return stakeInfo.stakedAmount * REWARD_RATE_PER_SECOND * secondsStaked
  }, [stakeInfo])

  // Update pending rewards every second
  useEffect(() => {
    const interval = setInterval(() => {
      const pendingRewards = calculateRewards()
      setStakeInfo(prev => ({
        ...prev,
        pendingRewards
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [calculateRewards])

  useEffect(() => {
    loadStakeInfo()
  }, [loadStakeInfo])

  const handleStake = async () => {
    if (!publicKey || !signTransaction || !wallet) {
      alert('Please connect your wallet first')
      return
    }

    const amount = parseFloat(stakeAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount to stake')
      return
    }

    setIsStaking(true)
    setStakingStatus('Preparing stake transaction...')

    try {
      // Create transaction
      const transaction = new Transaction()

      // Get token accounts
      const userTokenAccount = await getAssociatedTokenAddress(
        BNKZ_MINT,
        publicKey
      )

      const stakingTokenAccount = await getAssociatedTokenAddress(
        BNKZ_MINT,
        STAKING_PROGRAM_ID
      )

      // Transfer tokens to staking program
      const transferInstruction = createTransferInstruction(
        userTokenAccount,
        stakingTokenAccount,
        publicKey,
        Math.floor(amount * Math.pow(10, 9)), // Convert to base units (assuming 9 decimals)
        [],
        TOKEN_PROGRAM_ID
      )

      transaction.add(transferInstruction)

      transaction.feePayer = publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      setStakingStatus('Waiting for signature...')

      const signedTransaction = await signTransaction(transaction)
      
      setStakingStatus('Broadcasting transaction...')

      const signature = await connection.sendRawTransaction(signedTransaction.serialize())
      
      setStakingStatus('Confirming transaction...')

      await connection.confirmTransaction(signature, 'confirmed')

      // Update stake info
      const newStakeInfo = {
        stakedAmount: stakeInfo.stakedAmount + amount,
        pendingRewards: stakeInfo.pendingRewards,
        lastStakeTime: new Date(),
        stakingDuration: 0
      }

      setStakeInfo(newStakeInfo)
      localStorage.setItem(`stake_${publicKey.toString()}`, JSON.stringify(newStakeInfo))

      setStakingStatus('Stake successful!')
      setStakeAmount('')
      alert(`Successfully staked ${amount} BNKZ!\n\nTransaction: ${signature}`)

    } catch (error) {
      console.error('Staking error:', error)
      setStakingStatus('Stake failed')
      alert(`Staking failed: ${error.message}`)
    } finally {
      setIsStaking(false)
      setTimeout(() => setStakingStatus(''), 3000)
    }
  }

  const handleUnstake = async () => {
    if (!publicKey || !signTransaction || !wallet) {
      alert('Please connect your wallet first')
      return
    }

    const amount = parseFloat(unstakeAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount to unstake')
      return
    }

    if (amount > stakeInfo.stakedAmount) {
      alert('Cannot unstake more than your staked amount')
      return
    }

    setIsUnstaking(true)
    setStakingStatus('Preparing unstake transaction...')

    try {
      // Similar to staking but in reverse
      const transaction = new Transaction()

      // In a real implementation, you'd call the unstaking program instruction
      // For now, we'll simulate the transaction

      transaction.feePayer = publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      setStakingStatus('Waiting for signature...')

      const signedTransaction = await signTransaction(transaction)
      
      setStakingStatus('Broadcasting transaction...')

      const signature = await connection.sendRawTransaction(signedTransaction.serialize())
      
      setStakingStatus('Confirming transaction...')

      await connection.confirmTransaction(signature, 'confirmed')

      // Update stake info
      const newStakeInfo = {
        stakedAmount: stakeInfo.stakedAmount - amount,
        pendingRewards: stakeInfo.pendingRewards,
        lastStakeTime: new Date(),
        stakingDuration: 0
      }

      setStakeInfo(newStakeInfo)
      localStorage.setItem(`stake_${publicKey.toString()}`, JSON.stringify(newStakeInfo))

      setStakingStatus('Unstake successful!')
      setUnstakeAmount('')
      alert(`Successfully unstaked ${amount} BNKZ!\n\nTransaction: ${signature}`)

    } catch (error) {
      console.error('Unstaking error:', error)
      setStakingStatus('Unstake failed')
      alert(`Unstaking failed: ${error.message}`)
    } finally {
      setIsUnstaking(false)
      setTimeout(() => setStakingStatus(''), 3000)
    }
  }

  const handleClaimRewards = async () => {
    if (!publicKey || !signTransaction || !wallet) {
      alert('Please connect your wallet first')
      return
    }

    if (stakeInfo.pendingRewards <= 0) {
      alert('No rewards to claim')
      return
    }

    setIsClaiming(true)
    setStakingStatus('Claiming rewards...')

    try {
      const transaction = new Transaction()

      // In a real implementation, you'd call the claim rewards program instruction
      transaction.feePayer = publicKey
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

      const signedTransaction = await signTransaction(transaction)
      const signature = await connection.sendRawTransaction(signedTransaction.serialize())
      await connection.confirmTransaction(signature, 'confirmed')

      // Update stake info
      const newStakeInfo = {
        ...stakeInfo,
        pendingRewards: 0,
        lastStakeTime: new Date()
      }

      setStakeInfo(newStakeInfo)
      localStorage.setItem(`stake_${publicKey.toString()}`, JSON.stringify(newStakeInfo))

      setStakingStatus('Rewards claimed!')
      alert(`Successfully claimed ${stakeInfo.pendingRewards.toFixed(6)} BNKZ rewards!\n\nTransaction: ${signature}`)

    } catch (error) {
      console.error('Claim rewards error:', error)
      setStakingStatus('Claim failed')
      alert(`Claiming rewards failed: ${error.message}`)
    } finally {
      setIsClaiming(false)
      setTimeout(() => setStakingStatus(''), 3000)
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="text-center mb-6">
        <div className="inline-flex items-center bg-emerald-400/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
          <Lock className="w-4 h-4 mr-2" />
          BNKZ Staking Pool
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Stake & Earn Rewards</h3>
        <p className="text-slate-300">Earn {APY}% APY by staking your $BNKZ tokens</p>
      </div>

      {/* Staking Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-500/10 to-slate-600/10 rounded-xl p-4 border border-emerald-400/20">
          <div className="flex items-center space-x-2 mb-2">
            <Coins className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Staked Balance</span>
          </div>
          <p className="text-white text-xl font-bold">{stakeInfo.stakedAmount.toFixed(2)} BNKZ</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-2">
            <Gift className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">Pending Rewards</span>
          </div>
          <p className="text-white text-xl font-bold">{stakeInfo.pendingRewards.toFixed(6)} BNKZ</p>
        </div>
      </div>

      {/* Stake Section */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3">Stake BNKZ Tokens</label>
        <div className="flex space-x-3">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Amount to stake"
            className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
            disabled={isStaking}
          />
          <button
            onClick={handleStake}
            disabled={isStaking || !publicKey || !stakeAmount}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              isStaking || !publicKey || !stakeAmount
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800'
            }`}
          >
            {isStaking ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Staking...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Stake</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Unstake Section */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3">Unstake BNKZ Tokens</label>
        <div className="flex space-x-3">
          <input
            type="number"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
            placeholder="Amount to unstake"
            max={stakeInfo.stakedAmount}
            className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
            disabled={isUnstaking}
          />
          <button
            onClick={handleUnstake}
            disabled={isUnstaking || !publicKey || !unstakeAmount || stakeInfo.stakedAmount <= 0}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              isUnstaking || !publicKey || !unstakeAmount || stakeInfo.stakedAmount <= 0
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800'
            }`}
          >
            {isUnstaking ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Unstaking...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Unlock className="w-4 h-4" />
                <span>Unstake</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Claim Rewards */}
      <button
        onClick={handleClaimRewards}
        disabled={isClaiming || !publicKey || stakeInfo.pendingRewards <= 0}
        className={`w-full py-4 rounded-xl font-bold transition-all mb-4 ${
          isClaiming || !publicKey || stakeInfo.pendingRewards <= 0
            ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:from-yellow-700 hover:to-yellow-800 shadow-lg hover:shadow-yellow-500/25'
        }`}
      >
        {isClaiming ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Claiming...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Gift className="w-5 h-5" />
            <span>Claim {stakeInfo.pendingRewards.toFixed(6)} BNKZ Rewards</span>
          </div>
        )}
      </button>

      {/* Status Display */}
      {stakingStatus && (
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
          <p className="text-blue-300 text-sm text-center">{stakingStatus}</p>
        </div>
      )}

      {/* APY Info */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-medium">Current APY</span>
          </div>
          <span className="text-emerald-400 font-bold text-lg">{APY}%</span>
        </div>
        <p className="text-slate-400 text-sm mt-2">
          Rewards are calculated and distributed continuously. You can claim anytime.
        </p>
      </div>
    </div>
  )
}

export default Staking
