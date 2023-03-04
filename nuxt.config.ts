// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css', '~/assets/css/main.css',

        '@/assets/assets/css/main.css',
        // '~/assets/assets/vendor/fonts/boxicons.css',
        '~/assets/assets/vendor/css/core.css',
        '~/assets/assets/vendor/css/theme-default.css',
        // '~/assets/assets/css/demo.css',
        // '~/assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css',
        // '~/assets/assets/vendor/fonts/boxicons.css',
        // '~/assets/assets/vendor/css/core.css',
       
        // // '~/assets/vendor/libs/apex-charts/apex-charts.css',
        // '~/assets/assets/vendor/css/pages/page-misc.css',

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
      dirs: ['stores'],
    },
    pages: true,
    plugins: [
        // { src: '~/plugins/apex.js', mode: 'client' },
        // '@/plugins/flowbite.client.ts'
    ],
    ssr: false, 
    // target: 'assets',

    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE || 'http://127.0.0.1:8000/api/v1'
        }
    },

})
