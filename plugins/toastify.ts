import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {

    let options = {
        autoClose: 5000,
        position: 'top-right',
    }
  nuxtApp.vueApp.use(Vue3Toastify, options);

  return {
    provide: { toast },
  };
});