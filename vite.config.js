import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://p01--taskmanagement--9hx4wpjvrmrm.code.run',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        //secure: false, // only if your backend doesn't use HTTPS
      }
    }
  }
})
