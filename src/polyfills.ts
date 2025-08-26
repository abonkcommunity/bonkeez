
import { Buffer } from 'buffer'

// Polyfill Buffer for browser
if (typeof globalThis !== 'undefined') {
  globalThis.Buffer = Buffer
}

if (typeof window !== 'undefined') {
  window.Buffer = Buffer
  // Add global process if it doesn't exist
  if (!window.process) {
    window.process = {
      env: {},
      nextTick: (cb: Function) => setTimeout(cb, 0),
      version: '',
      versions: { node: '' }
    } as any
  }
}

// Export for module compatibility
export { Buffer }
