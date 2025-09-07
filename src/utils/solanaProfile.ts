import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js"
import { Metaplex } from "@metaplex-foundation/js"

// NFT metadata type
export interface NFTMetadata {
  name: string
  image: string
  mint: string
}

// User profile type
export interface UserProfile {
  walletAddress: string
  solBalance: number
  bnkzBalance: number
  nftsOwned: NFTMetadata[]
  totalNFTValue: number
  rank: number
  joinDate: string
}

// Setup Solana connection (mainnet)
const connection = new Connection(clusterApiUrl("mainnet-beta"))

// BNKZ token mint address (your CA)
const BNKZ_TOKEN_MINT = "Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F"

export async function createUserProfile(walletAddress: string): Promise<UserProfile> {
  const publicKey = new PublicKey(walletAddress)

  // --- 1. Get SOL balance
  let solBalance = 0
  try {
    const solBalanceLamports = await connection.getBalance(publicKey)
    solBalance = solBalanceLamports / 1e9
  } catch (err) {
    console.error("SOL balance fetch error:", err)
  }

  // --- 2. Get BNKZ token balance
  let bnkzBalance = 0
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
    })

    tokenAccounts.value.forEach((acc) => {
      const info = acc.account.data.parsed.info
      if (info.mint === BNKZ_TOKEN_MINT) {
        bnkzBalance = parseInt(info.tokenAmount.amount) / Math.pow(10, info.tokenAmount.decimals)
      }
    })
  } catch (err) {
    console.error("BNKZ fetch error:", err)
  }

  // --- 3. Get NFTs
  const metaplex = Metaplex.make(connection)
  const nftsOwned: NFTMetadata[] = []

  try {
    const nfts = await metaplex.nfts().findAllByOwner({ owner: publicKey })

    for (const nft of nfts.slice(0, 10)) {
      if ("uri" in nft && nft.uri) {
        try {
          const res = await fetch(nft.uri)
          if (!res.ok) continue
          const metadata = await res.json()
          nftsOwned.push({
            name: metadata?.name || "Unknown NFT",
            image: metadata?.image || "/placeholder-nft.png",
            mint: nft.mintAddress.toBase58(),
          })
        } catch (err) {
          console.error("Bad NFT metadata:", err)
        }
      }
    }
  } catch (err) {
    console.error("NFT fetch error:", err)
  }

  // --- 4. Calculate NFT value (stub for now)
  const totalNFTValue = nftsOwned.length * 0.1

  return {
    walletAddress,
    solBalance,
    bnkzBalance,
    nftsOwned,
    totalNFTValue,
    rank: 1,
    joinDate: new Date().toLocaleDateString(),
  }
}