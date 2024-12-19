// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  serverMiddleware: ['~/middleware/cors.js'],
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
