export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['@repo/ui/styles'],
  devtools: { enabled: true },
  nitro: {
    preset: 'node-server',
  },
  routeRules: {
    '/blog/**': { prerender: true },
  },
  content: {
    highlight: {
      theme: 'github-dark',
      langs: ['ts', 'tsx', 'vue', 'bash', 'yaml', 'go', 'java'],
    },
  },
  compatibilityDate: '2025-01-01',
})