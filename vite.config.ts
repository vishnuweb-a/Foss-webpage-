import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  build: {
    // The WebGL layer is the single heaviest asset. Splitting it keeps the
    // opening scene interactive while three.js streams in behind Suspense.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/three|@react-three/.test(id)) return 'three'
            if (id.includes('gsap')) return 'gsap'
          }
          return undefined
        },
      },
    },
  },
})
