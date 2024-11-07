import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@flamingo-data': resolve(__dirname, 'src/flamingo-data'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@routes': resolve(__dirname, 'src/routes'),
      '@services': resolve(__dirname, 'src/services'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@custom-types': resolve(__dirname, 'src/custom-types'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
})