
import { Buffer } from 'buffer'
import process from 'process/browser'

// Make Buffer globally available
;(globalThis as any).Buffer = Buffer
;(globalThis as any).process = process

// Define global for older packages
;(globalThis as any).global = globalThis

// Mock async_hooks if needed
if (typeof (globalThis as any).AsyncResource === 'undefined') {
  ;(globalThis as any).AsyncResource = class AsyncResource {
    constructor() {}
    static bind(fn: Function) { return fn }
    bind(fn: Function) { return fn }
    runInAsyncScope(fn: Function, ...args: any[]) { return fn(...args) }
  }
}

export {}
