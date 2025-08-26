
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.replit.dev', '.repl.co'],
  },
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
      util: 'util',
      stream: 'stream-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      url: 'url',
      path: 'path-browserify',
      fs: 'browserify-fs',
      crypto: 'crypto-browserify',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'stream-browserify', 'stream-http', 'https-browserify', 'url', 'path-browserify', 'crypto-browserify'],
    exclude: ['node:async_hooks', 'async_hooks'],
  },
  build: {
    rollupOptions: {
      external: ['node:async_hooks', 'async_hooks', 'fs', 'path', 'os'],
    },
  },
})
