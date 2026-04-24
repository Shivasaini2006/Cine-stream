import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/tmdb-api': {
        target: 'https://api.themoviedb.org/3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tmdb-api/, '')
      },
      '/gemini-api/generateContent': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: () => '/v1beta/models/gemini-1.5-flash:generateContent'
      }
    }
  }
})
