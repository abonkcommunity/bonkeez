import { Buffer } from 'buffer'

// Make Buffer available globally
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer
  // Also make it available as global.Buffer for compatibility
  if (typeof (window as any).global === 'undefined') {
    (window as any).global = window
  }
  (window as any).global.Buffer = Buffer
}

// Polyfill for global
if (typeof global === 'undefined') {
  (globalThis as any).global = globalThis
}