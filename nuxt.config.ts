// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Smart Hotel Management',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Professional hotel management system' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    // Private keys (server-side only)
    apiSecret: '',

    // Public keys (exposed to client)
    public: {
      apiBase: '/api'
    }
  },

  routeRules: {
    '/admin/**': { ssr: false },
    '/staff/**': { ssr: false },
  },

  compatibilityDate: '2024-01-27'
})