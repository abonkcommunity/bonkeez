import { Buffer } from 'buffer'

declare global {
  interface Window {
    Buffer: typeof Buffer
    global: typeof globalThis
    solana?: any
    phantom?: {
      solana?: any
    }
  }

  var Buffer: typeof import('buffer').Buffer
  var global: typeof globalThis
}

export {}