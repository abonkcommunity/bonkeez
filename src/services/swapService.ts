
import { Connection, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js'
import { WalletAdapter } from '@solana/wallet-adapter-base'

export interface SwapQuote {
  inputAmount: number
  outputAmount: number
  priceImpact: number
  fee: number
  route: string
}

export interface SwapParams {
  inputMint: string
  outputMint: string
  amount: number
  slippageBps: number
  userPublicKey: string
}

class SwapService {
  private connection: Connection
  private jupiterApiUrl = 'https://quote-api.jup.ag/v6'
  private pumpfunApiUrl = 'https://frontend-api.pump.fun'
  
  // Token addresses
  private readonly SOL_MINT = 'So11111111111111111111111111111111111111112'
  private readonly BNKZ_MINT = 'Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F'

  constructor(connection: Connection) {
    this.connection = connection
  }

  async getQuote(params: SwapParams): Promise<SwapQuote> {
    try {
      // Try Jupiter first
      const jupiterQuote = await this.getJupiterQuote(params)
      if (jupiterQuote) return jupiterQuote

      // Fallback to Pumpfun for BNKZ swaps
      if (params.inputMint === this.BNKZ_MINT || params.outputMint === this.BNKZ_MINT) {
        return await this.getPumpfunQuote(params)
      }

      throw new Error('No quote available')
    } catch (error) {
      console.error('Error getting swap quote:', error)
      throw error
    }
  }

  private async getJupiterQuote(params: SwapParams): Promise<SwapQuote | null> {
    try {
      const response = await fetch(
        `${this.jupiterApiUrl}/quote?` + new URLSearchParams({
          inputMint: params.inputMint,
          outputMint: params.outputMint,
          amount: params.amount.toString(),
          slippageBps: params.slippageBps.toString(),
        })
      )

      if (!response.ok) return null

      const data = await response.json()
      
      return {
        inputAmount: parseInt(data.inAmount),
        outputAmount: parseInt(data.outAmount),
        priceImpact: parseFloat(data.priceImpactPct || '0'),
        fee: parseInt(data.platformFee?.amount || '0'),
        route: data.routePlan?.map((r: any) => r.swapInfo.label).join(' → ') || 'Direct'
      }
    } catch (error) {
      console.error('Jupiter quote error:', error)
      return null
    }
  }

  private async getPumpfunQuote(params: SwapParams): Promise<SwapQuote> {
    // Simplified Pumpfun quote calculation
    // In production, you'd integrate with actual Pumpfun API
    const rate = params.inputMint === this.SOL_MINT ? 900 : 1/900 // 1 SOL = 900 BNKZ
    const outputAmount = params.amount * rate
    const slippageAmount = outputAmount * (params.slippageBps / 10000)
    
    return {
      inputAmount: params.amount,
      outputAmount: Math.floor(outputAmount - slippageAmount),
      priceImpact: 0.1, // Estimated
      fee: params.amount * 0.006, // 0.6% fee
      route: 'Pumpfun'
    }
  }

  async executeSwap(
    params: SwapParams, 
    wallet: WalletAdapter,
    quote: SwapQuote
  ): Promise<string> {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected')
    }

    try {
      // Try Jupiter swap first
      if (quote.route !== 'Pumpfun') {
        return await this.executeJupiterSwap(params, wallet, quote)
      } else {
        return await this.executePumpfunSwap(params, wallet, quote)
      }
    } catch (error) {
      console.error('Swap execution error:', error)
      throw error
    }
  }

  private async executeJupiterSwap(
    params: SwapParams,
    wallet: WalletAdapter,
    quote: SwapQuote
  ): Promise<string> {
    // Get swap transaction from Jupiter
    const response = await fetch(`${this.jupiterApiUrl}/swap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userPublicKey: params.userPublicKey,
        quoteResponse: quote,
        wrapAndUnwrapSol: true,
        prioritizationFeeLamports: 'auto'
      })
    })

    const { swapTransaction } = await response.json()
    
    // Deserialize and sign transaction
    const transaction = VersionedTransaction.deserialize(
      Buffer.from(swapTransaction, 'base64')
    )

    if (!wallet.signTransaction) {
      throw new Error('Wallet does not support transaction signing')
    }

    const signedTransaction = await wallet.signTransaction(transaction as any)
    
    // Send transaction
    const signature = await this.connection.sendRawTransaction(
      signedTransaction.serialize()
    )

    // Confirm transaction
    await this.connection.confirmTransaction(signature, 'confirmed')
    
    return signature
  }

  private async executePumpfunSwap(
    params: SwapParams,
    wallet: WalletAdapter,
    quote: SwapQuote
  ): Promise<string> {
    // For Pumpfun swaps, redirect to their platform or implement direct integration
    // This is a simplified implementation - in production you'd integrate with their API
    
    if (!wallet.signTransaction) {
      throw new Error('Wallet does not support transaction signing')
    }

    // Create a basic swap transaction (this would be replaced with actual Pumpfun integration)
    const transaction = new Transaction()
    
    // Add swap instructions here based on Pumpfun's requirements
    // This is where you'd add the actual token swap logic
    
    transaction.feePayer = wallet.publicKey!
    transaction.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash

    const signedTransaction = await wallet.signTransaction(transaction)
    const signature = await this.connection.sendRawTransaction(signedTransaction.serialize())
    
    await this.connection.confirmTransaction(signature, 'confirmed')
    return signature
  }

  // Helper methods for token info
  getTokenMint(symbol: string): string {
    switch (symbol.toUpperCase()) {
      case 'SOL': return this.SOL_MINT
      case 'BNKZ': return this.BNKZ_MINT
      default: throw new Error(`Unknown token: ${symbol}`)
    }
  }

  formatAmount(amount: number, decimals: number = 9): number {
    return amount / Math.pow(10, decimals)
  }

  parseAmount(amount: number, decimals: number = 9): number {
    return Math.floor(amount * Math.pow(10, decimals))
  }
}

export default SwapService
