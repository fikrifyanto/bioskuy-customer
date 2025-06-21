// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    'dayjs-nuxt',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080'
    }
  },
  devServer: {
    https: {
      key: './https/localhost-key.pem',
      cert: './https/localhost.pem'
    }
  },
  ssr: false,
})