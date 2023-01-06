import {defineStore} from 'pinia'

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => {
        return {
            header: '',
            content: ''
        }
    },
    getters: {
        visible() {
            return this.header != '' && this.content != ''
        }
    },
    actions: {
        close() {
            this.$reset()
        }, 
        alert(title, body) {
            this.header = title
            this.content = body
        }
    }
}
)