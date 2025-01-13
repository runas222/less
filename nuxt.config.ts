// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },

  nitro: {
    preset: 'node-server'
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],

  experimental: {
    componentIslands: true,
    payloadExtraction: false
  },

  typescript: {
    strict: true,
    typeCheck: true
  }
})
