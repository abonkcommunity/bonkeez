
import { Buffer } from 'buffer'
import process from 'process'

// Make Buffer available globally
if (typeof globalThis !== 'undefined') {
  // @ts-ignore
  globalThis.Buffer = Buffer
  // @ts-ignore
  globalThis.process = process
}

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.Buffer = Buffer
  // @ts-ignore
  window.process = process
  // @ts-ignore
  window.global = globalThis
}

export { Buffer, process }
