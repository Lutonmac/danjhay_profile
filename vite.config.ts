import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '0395f64b3b68.ngrok-free.dev', 'b1d2-102-91-78-142.ngrok-free.app' 
    ]
  }
})
