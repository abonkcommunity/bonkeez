
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
    process: {
      env: {}
    },
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
  ssr: {
    noExternal: ['@solana/web3.js', '@metaplex-foundation/js', '@solana/spl-token']
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
    exclude: ['@solana/web3.js', '@metaplex-foundation/js', '@solana/spl-token']
  },
  build: {
    rollupOptions: {
      external: [],
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
})
