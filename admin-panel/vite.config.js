import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/onesignal': {
        target: 'https://onesignal.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/onesignal/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('origin', 'https://onesignal.com');
          });
        },
      }
    }
  }
})