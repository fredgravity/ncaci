import { defineStore } from 'pinia'

export const useMenuStore = defineStore('useMenuStore', {
    state: () => ({
        drawer: false,
        theme: localStorage.getItem('theme') || 'light'
      }),
    actions: {
        openMenu() {
            this.drawer = !this.drawer    
        },
        changeTheme(){
            this.theme = this.theme == 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', this.theme)
        }
    },

    getters: {
        getDrawer(state){
            return state.drawer
        }   
    }
  
})