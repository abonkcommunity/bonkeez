
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

// Enhanced stream and buffer polyfills
const originalSlice = Array.prototype.slice;

// Fix slice method for various types
const ensureSliceMethod = (proto: any) => {
  if (!proto.slice) {
    proto.slice = function(start?: number, end?: number) {
      if (this.subarray) {
        return new this.constructor(this.subarray(start, end));
      } else if (this.substring) {
        return this.substring(start, end);
      } else if (Array.isArray(this)) {
        return originalSlice.call(this, start, end);
      }
      return this;
    };
  }
};

// Apply slice method to all relevant prototypes
[Uint8Array.prototype, Int8Array.prototype, Uint16Array.prototype, Int16Array.prototype,
 Uint32Array.prototype, Int32Array.prototype, Float32Array.prototype, Float64Array.prototype,
 ArrayBuffer.prototype, String.prototype].forEach(ensureSliceMethod);

// Additional Buffer polyfills for crypto operations
if (typeof globalThis.Buffer !== 'undefined') {
  const BufferProto = globalThis.Buffer.prototype;
  if (!BufferProto.slice) {
    BufferProto.slice = function(start?: number, end?: number) {
      return new globalThis.Buffer(this.subarray(start, end));
    };
  }
}

// Stream polyfills for readable-stream compatibility
class MockReadableStream {
  constructor(options: any = {}) {
    this.readable = true;
    this.ended = false;
    this._readableState = {
      objectMode: false,
      highWaterMark: 16384,
      buffer: { head: null, tail: null, length: 0 }
    };
  }
  readable = true;
  ended = false;
  _readableState: any;
  
  pipe(destination: any) { return destination; }
  unpipe() {}
  on(event: string, listener: Function) { return this; }
  once(event: string, listener: Function) { return this; }
  emit(event: string, ...args: any[]) { return false; }
  read() { return null; }
  push(chunk: any) { return true; }
  unshift(chunk: any) {}
  wrap(stream: any) { return this; }
}

class MockWritableStream {
  constructor(options: any = {}) {
    this.writable = true;
    this.destroyed = false;
    this._writableState = {
      objectMode: false,
      highWaterMark: 16384,
      corked: 0,
      bufferedRequest: null,
      bufferedRequestCount: 0
    };
  }
  writable = true;
  destroyed = false;
  _writableState: any;
  
  write(chunk: any, encoding?: any, callback?: Function) {
    if (typeof encoding === 'function') callback = encoding;
    if (callback) callback();
    return true;
  }
  end(chunk?: any, encoding?: any, callback?: Function) {
    if (typeof chunk === 'function') callback = chunk;
    else if (typeof encoding === 'function') callback = encoding;
    if (callback) callback();
  }
  destroy() { this.destroyed = true; }
  on(event: string, listener: Function) { return this; }
  once(event: string, listener: Function) { return this; }
  emit(event: string, ...args: any[]) { return false; }
}

// Set up stream polyfills
const streamPolyfills = {
  Readable: MockReadableStream,
  Writable: MockWritableStream,
  Duplex: class extends MockReadableStream {
    write = MockWritableStream.prototype.write;
    end = MockWritableStream.prototype.end;
    destroy = MockWritableStream.prototype.destroy;
    writable = true;
  },
  Transform: class extends MockReadableStream {
    write = MockWritableStream.prototype.write;
    end = MockWritableStream.prototype.end;
    destroy = MockWritableStream.prototype.destroy;
    writable = true;
    _transform(chunk: any, encoding: any, callback: Function) { callback(); }
  }
};

// Set up global stream access
if (typeof globalThis !== 'undefined') {
  globalThis.stream = streamPolyfills;
  (globalThis as any).Stream = streamPolyfills;
}

if (typeof window !== 'undefined') {
  (window as any).stream = streamPolyfills;
  (window as any).Stream = streamPolyfills;
}

export {}
