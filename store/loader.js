import {defineStore} from 'pinia'

export const useLoaderStore = defineStore({
    id: 'loader',
    state: () => {
        return {
            loading: false
        }
    },
    getters: {
        isLoading: (state) => {
            return state.loading
        },
    },
    actions: {
        start() {
            this.loading = true
        }, 
        loaded() {
            this.loading = false
        }
    }
})