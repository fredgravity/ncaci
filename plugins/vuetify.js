// plugins/vuetify.js
import { createVuetify, } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'
import {mdi} from "vuetify/lib/iconsets/mdi";
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import colors from 'vuetify/lib/util/colors'



export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "lightTheme",
      themes: {
        lightTheme: {
          dark: false,
          colors: {
            primary: "#ad1c3d",
            "page-header-background": "#d7d7ce",
            "page-background": "#cdcdc1",
            "table-header": "#cdcdc1",
            background: "#c0c0b5",
            "header-background": "#b5b5a6",
            "info-text": "#666660",
          },
        },
        darkTheme: {
          dark: true,
          colors: {
            primary: "#52E3C2",
            "page-header-background": "#282831",
            "page-background": "#32323E",
            "table-header": "#2e2e2e",
            background: "#3F3F4A",
            "header-background": "#4a4a59",
            "info-text": "#99999F",
          },
        },
      },
    },
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            mdi,
            fa
        }
    },
    
  })

  nuxtApp.vueApp.use(vuetify)
})
