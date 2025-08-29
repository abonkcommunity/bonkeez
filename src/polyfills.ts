import { Buffer } from 'buffer'

// Make Buffer and other Node.js modules available globally
declare global {
  interface Window {
    Buffer: typeof Buffer
    global: typeof globalThis
    process: any
  }
  var Buffer: typeof Buffer
  var global: typeof globalThis
  var process: any
}

// Set up global polyfills
if (typeof globalThis !== 'undefined') {
  globalThis.Buffer = Buffer
  globalThis.global = globalThis

  if (!globalThis.process) {
    globalThis.process = { 
      env: {},
      version: 'v16.0.0',
      platform: 'browser',
      browser: true,
      nextTick: (callback: Function, ...args: any[]) => {
        setTimeout(() => callback(...args), 0)
      }
    } as any
  }
}

// For window environment
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
  window.global = globalThis

  if (!window.process) {
    window.process = globalThis.process
  }
}

export {}