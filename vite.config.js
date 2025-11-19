import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseConfig = {
    plugins: [react()],
  }
  
  if (mode === 'cloudflare') {
    return {
      ...baseConfig,
      base: '/'
    }
  }
  
  return {
    ...baseConfig,
    base: '/portfolio-react/'
  }
})