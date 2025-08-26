
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'stream', 'util', 'http', 'url', 'crypto'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    })
  ],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
      util: 'util',
    }
  },
  optimizeDeps: {
    include: ['buffer', 'stream-browserify', 'util']
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['.replit.dev', '.repl.co'],
    hmr: {
      port: 5173
    }
  }
})
