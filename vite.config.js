import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    host: '0.0.0.0', // Доступ из сети
    port: 8080, // Порт, который вы хотите использовать
  },
  resolve: {
    alias: {
      // '@': '/src',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    base: '/',
  }
})
