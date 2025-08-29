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
      'readable-stream': 'readable-stream',
      'readable-stream/lib/_stream_readable.js': 'readable-stream/lib/_stream_readable.js',
      'readable-stream/lib/_stream_writable.js': 'readable-stream/lib/_stream_writable.js',
      'readable-stream/lib/_stream_duplex.js': 'readable-stream/lib/_stream_duplex.js',
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
      'readable-stream',
    ],
    exclude: [],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
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
            '@solana/wallet-adapter-solflare'
          ],
          'vendor': [
            'react',
            'react-dom'
          ]
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/]
    }
  },
})