
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

// Fix slice method for various types with better error handling
const ensureSliceMethod = (proto: any) => {
  if (!proto || typeof proto !== 'object') return;
  
  if (!proto.slice) {
    proto.slice = function(start?: number, end?: number) {
      try {
        if (this === null || this === undefined) {
          return new Uint8Array(0);
        }
        
        if (this.subarray && typeof this.subarray === 'function') {
          return new this.constructor(this.subarray(start, end));
        } else if (this.substring && typeof this.substring === 'function') {
          return this.substring(start, end);
        } else if (Array.isArray(this)) {
          return originalSlice.call(this, start, end);
        } else if (this.length !== undefined) {
          // Handle array-like objects
          const length = Math.max(0, this.length);
          const actualStart = start === undefined ? 0 : Math.max(0, start < 0 ? length + start : start);
          const actualEnd = end === undefined ? length : Math.min(length, end < 0 ? length + end : end);
          const result = [];
          for (let i = actualStart; i < actualEnd; i++) {
            result.push(this[i]);
          }
          return result;
        }
        return this;
      } catch (error) {
        console.warn('Slice operation failed, returning empty array:', error);
        return new Uint8Array(0);
      }
    };
  }
};

// Apply slice method to all relevant prototypes with safety checks
try {
  [Uint8Array.prototype, Int8Array.prototype, Uint16Array.prototype, Int16Array.prototype,
   Uint32Array.prototype, Int32Array.prototype, Float32Array.prototype, Float64Array.prototype,
   ArrayBuffer.prototype, String.prototype].forEach(proto => {
     if (proto) ensureSliceMethod(proto);
   });
} catch (error) {
  console.warn('Failed to setup array prototype slice methods:', error);
}

// Additional Buffer polyfills for crypto operations
if (typeof globalThis.Buffer !== 'undefined' && globalThis.Buffer.prototype) {
  const BufferProto = globalThis.Buffer.prototype;
  if (!BufferProto.slice) {
    BufferProto.slice = function(start?: number, end?: number) {
      try {
        if (this && this.subarray) {
          return new globalThis.Buffer(this.subarray(start, end));
        }
        return new globalThis.Buffer(0);
      } catch (error) {
        console.warn('Buffer slice failed:', error);
        return new globalThis.Buffer(0);
      }
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
