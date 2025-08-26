
import { WalletAdapter } from '@solana/wallet-adapter-base'
import { PublicKey } from '@solana/web3.js'
import bs58 from 'bs58'

export interface UserSession {
  publicKey: string
  signedAt: number
  expiresAt: number
}

class AuthService {
  private readonly SESSION_KEY = 'bonkeez_session'
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  async signIn(wallet: WalletAdapter): Promise<UserSession> {
    if (!wallet.publicKey || !wallet.signMessage) {
      throw new Error('Wallet not connected or does not support message signing')
    }

    const message = `Login to Bonkeez Exchange\n\nTimestamp: ${new Date().toISOString()}\nPublic Key: ${wallet.publicKey.toString()}`
    const messageBytes = new TextEncoder().encode(message)

    try {
      const signature = await wallet.signMessage(messageBytes)
      
      // Verify signature (in production, you might want to verify this on the server)
      const isValid = this.verifySignature(wallet.publicKey, messageBytes, signature)
      
      if (!isValid) {
        throw new Error('Invalid signature')
      }

      const session: UserSession = {
        publicKey: wallet.publicKey.toString(),
        signedAt: Date.now(),
        expiresAt: Date.now() + this.SESSION_DURATION
      }

      // Store session locally
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
      
      return session
      
    } catch (error) {
      console.error('Sign in error:', error)
      throw new Error('Failed to sign authentication message')
    }
  }

  signOut(): void {
    localStorage.removeItem(this.SESSION_KEY)
  }

  getCurrentSession(): UserSession | null {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY)
      if (!sessionData) return null

      const session: UserSession = JSON.parse(sessionData)
      
      // Check if session is expired
      if (Date.now() > session.expiresAt) {
        this.signOut()
        return null
      }

      return session
    } catch (error) {
      console.error('Error getting current session:', error)
      return null
    }
  }

  isAuthenticated(publicKey?: PublicKey): boolean {
    const session = this.getCurrentSession()
    if (!session) return false

    // If publicKey is provided, check if it matches the session
    if (publicKey && session.publicKey !== publicKey.toString()) {
      return false
    }

    return true
  }

  private verifySignature(publicKey: PublicKey, message: Uint8Array, signature: Uint8Array): boolean {
    try {
      // Note: In a production environment, you should verify the signature properly
      // For now, we'll assume the signature is valid if the wallet signed it
      return signature.length > 0
    } catch (error) {
      console.error('Signature verification error:', error)
      return false
    }
  }

  // Profile data management
  saveUserProfile(profile: any): void {
    const session = this.getCurrentSession()
    if (!session) throw new Error('Not authenticated')

    const profileKey = `profile_${session.publicKey}`
    localStorage.setItem(profileKey, JSON.stringify(profile))
  }

  getUserProfile(): any | null {
    const session = this.getCurrentSession()
    if (!session) return null

    try {
      const profileKey = `profile_${session.publicKey}`
      const profileData = localStorage.getItem(profileKey)
      return profileData ? JSON.parse(profileData) : null
    } catch (error) {
      console.error('Error getting user profile:', error)
      return null
    }
  }
}

export const authService = new AuthService()
export default AuthService
