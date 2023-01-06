import {defineStore} from 'pinia'

export const useAuthStore  = defineStore({
    id: 'auth',
    state: () => {
        return {
            admin: false,
            class: "",
            display_name: "",
            exp: Date.now(),
            first_name: "",
            grade: 0,
            id: "",
            last_name: "",
            nickname: null,
            period: 0,
            token: ''
        }
    },
    getters: {
        isLoggedIn: (state) => {
            return state.id != '' && Date.now() < state.exp
        },
        isAdmin(state) {
            return this.isLoggedIn && state.admin
        }
    },
    actions: {
        login(payload, token) {
            this.$patch(payload)
            this.token = token
        }, 
        logout() {
            this.$reset()
        }
    },
    persist: {
        storage: persistedState.localStorage,
    }
})