export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['@repo/ui/styles', '~/assets/global.css'],
devtools: { enabled: true },
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
      langs: ['ts', 'js', 'tsx', 'vue', 'bash', 'yaml', 'go', 'java', 'json', 'css'],
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