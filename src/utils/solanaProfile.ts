
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { Metaplex } from '@metaplex-foundation/js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

// BNKZ Token Contract Address
export const BNKZ_TOKEN_MINT = new PublicKey('Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F')

// Solana Connection
export const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed')

// Metaplex SDK for NFT fetching
export const metaplex = Metaplex.make(connection)

export interface NFTMetadata {
  name: string
  image: string
  mint: string
  collection?: string
}

export interface UserProfile {
  walletAddress: string
  username?: string
  bio?: string
  avatar?: string
  nftsOwned: NFTMetadata[]
  bnkzBalance: number
  solBalance: number
  totalNFTValue: number
  rank: string
  joinDate: string
}

export async function fetchUserNFTs(walletAddress: string): Promise<NFTMetadata[]> {
  try {
    const publicKey = new PublicKey(walletAddress)
    const nfts = await metaplex.nfts().findAllByOwner({ owner: publicKey })
    
    const nftMetadata: NFTMetadata[] = []
    
    for (const nft of nfts) {
      try {
        if (nft.model === 'metadata') {
          const metadata = await metaplex.nfts().load({ metadata: nft })
          
          nftMetadata.push({
            name: metadata.name || 'Unknown NFT',
            image: metadata.json?.image || '/bonk.JPG',
            mint: metadata.address.toString(),
            collection: metadata.collection?.address.toString()
          })
        }
      } catch (error) {
        console.warn('Failed to load NFT metadata:', error)
      }
    }
    
    return nftMetadata
  } catch (error) {
    console.error('Error fetching NFTs:', error)
    return []
  }
}

export async function fetchBNKZBalance(walletAddress: string): Promise<number> {
  try {
    const publicKey = new PublicKey(walletAddress)
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { mint: BNKZ_TOKEN_MINT }
    )
    
    if (tokenAccounts.value.length === 0) {
      return 0
    }
    
    const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount
    return balance || 0
  } catch (error) {
    console.error('Error fetching BNKZ balance:', error)
    return 0
  }
}

export async function fetchSOLBalance(walletAddress: string): Promise<number> {
  try {
    const publicKey = new PublicKey(walletAddress)
    const balance = await connection.getBalance(publicKey)
    return balance / 1e9 // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching SOL balance:', error)
    return 0
  }
}

export async function createUserProfile(walletAddress: string): Promise<UserProfile> {
  const [nfts, bnkzBalance, solBalance] = await Promise.all([
    fetchUserNFTs(walletAddress),
    fetchBNKZBalance(walletAddress),
    fetchSOLBalance(walletAddress)
  ])
  
  // Calculate total NFT value (estimated)
  const totalNFTValue = nfts.length * 0.5 // Placeholder calculation
  
  // Calculate user rank based on holdings
  const totalValue = bnkzBalance * 0.0001 + solBalance + totalNFTValue
  let rank = 'Newcomer'
  
  if (totalValue > 100) rank = 'Top 1%'
  else if (totalValue > 50) rank = 'Top 5%'
  else if (totalValue > 20) rank = 'Top 10%'
  else if (totalValue > 5) rank = 'Top 25%'
  
  return {
    walletAddress,
    nftsOwned: nfts,
    bnkzBalance,
    solBalance,
    totalNFTValue,
    rank,
    joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
}

export function generateUsername(walletAddress: string): string {
  const shortAddress = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
  return `Bonkeez_${shortAddress}`
}
