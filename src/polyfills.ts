
import { Buffer } from 'buffer'
import process from 'process'

// Make Buffer available globally
globalThis.Buffer = Buffer
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

// Process polyfill
globalThis.process = process
if (typeof window !== 'undefined') {
  window.process = process
}

// Additional polyfills for Solana libraries
if (typeof global === 'undefined') {
  globalThis.global = globalThis
}

// Mock crypto for Node.js compatibility
if (typeof window !== 'undefined' && !window.crypto?.subtle) {
  // @ts-ignore
  window.crypto = window.crypto || {}
  // @ts-ignore
  window.crypto.subtle = window.crypto.subtle || {}
}

// Additional Node.js globals
globalThis.process.env = globalThis.process.env || {}
