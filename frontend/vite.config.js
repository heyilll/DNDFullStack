import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], 
  test: {
    environment: 'jsdom',
    coverage: {provider: 'istanbul'},
    setupFiles: ['./tests/setup.js'],
    testMatch: ['./tests/**/*.test.jsx$?'],
    globals: true
  }
})
