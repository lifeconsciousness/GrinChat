import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:${process.env.PORT || 6000}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: '',
  build: {
    outDir: '../dist',
  },
})
