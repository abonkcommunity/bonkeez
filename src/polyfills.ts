
import { Buffer } from 'buffer'
import process from 'process'

// Make Buffer available globally
globalThis.Buffer = Buffer
window.Buffer = Buffer

// Process polyfill
globalThis.process = process
window.process = process

// Additional polyfills for Solana libraries
if (typeof global === 'undefined') {
  globalThis.global = globalThis
}
