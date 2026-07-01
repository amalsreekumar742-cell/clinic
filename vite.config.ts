import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  root: process.cwd(),
  resolve: {
    preserveSymlinks: true,
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
