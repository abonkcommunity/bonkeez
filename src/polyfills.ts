import { Buffer } from 'buffer'
import * as util from 'util'

// Make Buffer and other Node.js modules available globally
if (typeof globalThis !== 'undefined') {
  globalThis.Buffer = Buffer
  globalThis.global = globalThis
  globalThis.util = util

  // Additional polyfills for crypto and other Node.js modules
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
  window.global = window
  window.util = util

  if (!window.process) {
    window.process = { 
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

// For Node.js environment compatibility
if (typeof global !== 'undefined' && !global.Buffer) {
  global.Buffer = Buffer
  global.util = util
}

export {}