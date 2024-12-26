import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173, // Use PORT from environment variable or default to 5173
    host: true, // Bind to all network interfaces
  }
})
