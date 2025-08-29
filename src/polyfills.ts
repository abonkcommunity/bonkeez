
import { Buffer } from 'buffer'

// Make Buffer and other Node.js modules available globally
declare global {
  interface Window {
    Buffer: typeof Buffer
    global: typeof globalThis
    process: any
    util: any
  }
  var Buffer: typeof Buffer
  var global: typeof globalThis
  var process: any
  var util: any
}

// Create util polyfill
const utilPolyfill = {
  debuglog: (section: string) => () => {},
  inspect: (obj: any, options?: any) => {
    if (obj === null) return 'null'
    if (obj === undefined) return 'undefined'
    if (typeof obj === 'string') return obj
    if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj)
    try {
      return JSON.stringify(obj, null, 2)
    } catch {
      return '[object Object]'
    }
  },
  format: (f: string, ...args: any[]) => {
    let i = 0
    return f.replace(/%[sdj%]/g, (x) => {
      if (x === '%%') return x
      if (i >= args.length) return x
      switch (x) {
        case '%s': return String(args[i++])
        case '%d': return Number(args[i++])
        case '%j':
          try {
            return JSON.stringify(args[i++])
          } catch {
            return '[Circular]'
          }
        default:
          return x
      }
    })
  }
}

// Set up global polyfills
if (typeof globalThis !== 'undefined') {
  globalThis.Buffer = Buffer
  globalThis.global = globalThis
  globalThis.util = utilPolyfill

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
  window.util = utilPolyfill

  if (!window.process) {
    window.process = globalThis.process
  }
}

// Add polyfill for stream methods that might be undefined
const originalSlice = Array.prototype.slice;
if (typeof String.prototype.slice === 'undefined') {
  String.prototype.slice = function(start?: number, end?: number) {
    return originalSlice.call(this, start, end).join('');
  };
}

// Ensure ArrayBuffer and Uint8Array have proper slice methods
if (typeof Uint8Array.prototype.slice === 'undefined') {
  Uint8Array.prototype.slice = function(start?: number, end?: number) {
    const result = new Uint8Array(this.subarray(start, end));
    return result;
  };
}

// Handle dynamic require for readable-stream modules
if (typeof window !== 'undefined') {
  // Mock require function for dynamic requires
  const mockRequire = (id: string) => {
    if (id === 'readable-stream/lib/_stream_readable.js') {
      return require('readable-stream/lib/_stream_readable.js');
    }
    if (id === 'readable-stream/lib/_stream_writable.js') {
      return require('readable-stream/lib/_stream_writable.js');
    }
    if (id === 'readable-stream/lib/_stream_duplex.js') {
      return require('readable-stream/lib/_stream_duplex.js');
    }
    throw new Error(`Cannot require module: ${id}`);
  };
  
  // Set up require for modules that need it
  (globalThis as any).require = mockRequire;
  (window as any).require = mockRequire;
}

export {}
