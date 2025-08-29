
import { Buffer } from 'buffer'

// Make Buffer available globally for Solana/Metaplex libraries
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
  window.global = window
  
  // Additional polyfills for crypto and other Node.js modules
  if (!window.process) {
    window.process = { env: {} } as any
  }
}

// For Node.js environment compatibility
if (typeof global !== 'undefined' && !global.Buffer) {
  global.Buffer = Buffer
}
