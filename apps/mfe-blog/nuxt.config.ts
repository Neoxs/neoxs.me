export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['@repo/ui/styles', '~/assets/global.css'],
  build: {
    transpile: ['@repo/seo'],
  },
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  devServer: { port: 3002 },
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3002,
        clientPort: 3002,
      },
    },
  },
  nitro: {
    preset: 'node-server',
  },
  routeRules: {
    '/blog/**': { prerender: true },
  },
  content: {
    highlight: {
      theme: 'github-dark',
      langs: ['ts', 'js', 'jsx', 'tsx', 'vue', 'bash', 'yaml', 'go', 'java', 'json', 'css', 'nginx'],
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
  },
  compatibilityDate: '2025-01-01',
})