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
    'process.version': '"v16.0.0"',
    'process.platform': '"browser"',
    'process.browser': true,
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      url: 'url',
      crypto: 'crypto-browserify',
      util: 'util',
    },
  },
  optimizeDeps: {
    include: [
      'buffer',
      'stream-browserify',
      'stream-http', 
      'https-browserify',
      'url',
      'crypto-browserify',
      'util',
    ],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          'solana-core': [
            '@solana/web3.js',
            '@solana/spl-token'
          ],
          'solana-wallet': [
            '@solana/wallet-adapter-base',
            '@solana/wallet-adapter-react',
            '@solana/wallet-adapter-react-ui',
            '@solana/wallet-adapter-phantom',
            '@solana/wallet-adapter-backpack',
            '@solana/wallet-adapter-solflare',
            '@solana/wallet-adapter-torus'
          ],
          'metaplex': [
            '@metaplex-foundation/js'
          ],
          'vendor': [
            'react',
            'react-dom'
          ],
          'charts': [
            'recharts'
          ],
          'icons': [
            'lucide-react'
          ]
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
})