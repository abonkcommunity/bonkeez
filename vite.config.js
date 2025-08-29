
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.replit.dev', '.repl.co'],
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
    rollupOptions: {
      external: [],
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
})
