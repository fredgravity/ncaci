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
      '@nuxtjs/google-fonts',
      '@vueuse/nuxt',
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
    googleFonts: {
      families: {
        Roboto: true,
        'Josefin+Sans': true,
        Lato: [100, 300],
        Raleway: {
          wght: [100, 400],
          ital: [100]
        },
      },
      display: 'swap',
      download: true,
      base64: false,
      inject: true,
      overwriting: false,
      stylePath: 'assets/css/fonts.css',
      fontsDir: 'fonts',
      fontsPath: '~assets/fonts'
      
    },

    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE || 'http://127.0.0.1:8000/api/v1'
        }
    },

})
