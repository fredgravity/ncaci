import {defineStore} from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => ({
        user: (JSON.parse(localStorage.getItem('user')) || {}) ,
        token: {
            accessToken: (JSON.parse(localStorage.getItem('accessToken')) || ''),
        },
        error: '',
        api_base: useRuntimeConfig().public.apiBase,
        user_id: ''
    }),
    getters:{
        getUser: async (state) => {
            if (Object.keys(state.user).length !== 0){
                
                return state.user
            }
            return false
        },
        getAccessToken: async (state) =>{
         
            return  state.token
        },
        getUserId: async (state)=>{
            return state.user_id
        }
    },
    actions: {
        async login(loginForm){
            const { data, error, refresh } = await useFetch(this.api_base+"/login", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: loginForm,
                initialCache: false
            });

            if (error.value == null){
                // console.log(data.value.data.token)
                this.token.accessToken = data.value.data.token
                
            
                localStorage.setItem('accessToken', JSON.stringify(data.value.data.token))
                localStorage.setItem('user', JSON.stringify(data.value.data.user))
                setInterval(function(){
                    window.location.href = '/dashboard'
                }, 2000)
                // localStorage.setItem('refreshToken', JSON.stringify(data.value.refresh))
                
                
            }else{
                
                this.error = 'Something went wrong. Please try again later'
                localStorage.setItem('error', JSON.stringify(error))
                // this.error = error.value.data.detail
            }
            
            
        },

        async setUser(user){
            localStorage.setItem('user', JSON.stringify(user))
        },
        
        async setToken(token){
            // console.log(token)
            localStorage.setItem('accessToken', JSON.stringify(token))
                // localStorage.setItem('refreshToken', JSON.stringify(data.value.refresh))
        },
        async logout() {
            let accessToken = await this.getAccessToken;
            const { data, error, refresh } = await useFetch(this.api_base+"/logout", {
                method: "get",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": 'application/json', 
                    Authorization: "Bearer " + accessToken.accessToken, 
                },
                initialCache: false
            });
            if(!error.value){
                localStorage.removeItem('user')
                localStorage.removeItem('accessToken')
                window.location.href = '/'

            }
            
          },

        async setUserID(userId){
            return this.$state.user_id = userId
        }
    }
})
