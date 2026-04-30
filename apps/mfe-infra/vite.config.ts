import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import path from 'node:path'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
  ],
  base: '/infra/',
  resolve: {
    alias: { '#': path.resolve(__dirname, './src') },
  },
  server: {
    port: 3004,
    proxy: {
      // proxy K8s API calls in dev to avoid CORS + credential exposure
      '/api/pods': {
        target: process.env.K8S_API_URL ?? 'http://localhost:8001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/pods/, '/api/v1/namespaces/portfolio/pods'),
        headers: {
          Authorization: `Bearer ${process.env.K8S_TOKEN ?? ''}`,
        },
      },
    },
  },
  preview: { port: 3004 },
  build: {
    outDir: 'dist',
    rollupOptions: { input: 'index.html' },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})

export default config
