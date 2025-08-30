import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: [".replit.dev", ".repl.co"],
  },
  define: {
    global: "globalThis",
    "process.env": "{}",
    "process.version": '"v16.0.0"',
    "process.platform": '"browser"',
    "process.browser": "true",
  },
  resolve: {
    alias: {
      buffer: "buffer",
      stream: "stream-browserify",
      http: "stream-http",
      https: "https-browserify",
      url: "url",
      crypto: "crypto-browserify",
      util: "util",
    },
  },
  optimizeDeps: {
    include: [
      "buffer",
      "stream-browserify",
      "stream-http",
      "https-browserify",
      "url",
      "crypto-browserify",
      "util",
    ],
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    target: "esnext",
    assetsDir: "assets",
  },
});