import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/Cosas/',
    server: {
        port: 5173,
        host: true,
        allowedHosts: ['alba-unhypnotizable-river.ngrok-free.dev'],
        proxy: {
            '/api': 'http://localhost:3001'
        }
    }
})
