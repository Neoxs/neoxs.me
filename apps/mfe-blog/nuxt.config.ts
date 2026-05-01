export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['@repo/ui/styles'],
  devtools: { enabled: true },
  devServer: { port: 3002 },
  nitro: {
    preset: 'node-server',
  },
  routeRules: {
    '/blog/**': { prerender: true },
  },
  content: {
    highlight: {
      theme: 'github-dark',
      langs: ['ts', 'tsx', 'vue', 'bash', 'yaml', 'go', 'java', 'json', 'css'],
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