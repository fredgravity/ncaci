import vuetify from "./plugins/vuetify"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'vuetify/lib/styles/main.sass', 
        '@mdi/font/css/materialdesignicons.min.css', 
        '~/assets/css/main.css',
        '@/assets/assets/css/main.css',
        '~/assets/assets/vendor/css/core.css',
        '~/assets/assets/vendor/css/theme-default.css',
    ],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
        'process.env.DEBUG': false,
        },
    },
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    modules: [
      [
        '@pinia/nuxt',
        {
          autoImports: ['defineStore', 'acceptHMRUpdate'],
        },
      ],
    ],
    imports: {
      dirs: ['stores', 'composables/**'],
    },
    pages: true,
    plugins: [
        // { src: '~/plugins/apex.js', mode: 'client' },
        // '@/plugins/flowbite.client.ts'
        // '@/plugins/userMiddleware.js'
    ],
    ssr: false, 
    // target: 'assets',

    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE || 'http://127.0.0.1:8000/api/v1'
        }
    },

})
