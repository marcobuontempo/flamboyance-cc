import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@flamingo-data': resolve(__dirname, 'src/flamingo-data'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@redux': resolve(__dirname, 'src/redux'),
      '@routes': resolve(__dirname, 'src/routes'),
      '@services': resolve(__dirname, 'src/services'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@custom-types': resolve(__dirname, 'src/custom-types'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
})