// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@nuxt/http'],
  http: {
    baseURL: 'http://localhost:3000/wp-json/',  // URL API WordPress lokal
    headers: {
      common: {
        'Access-Control-Allow-Origin': '*', // Mengizinkan permintaan dari domain manapun
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-WP-Nonce',
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
    }
  },
  css: ['~/assets/style.css'],
  tailwindcss: {
    configPath: 'tailwind.config',
  },
})