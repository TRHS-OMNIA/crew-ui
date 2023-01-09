<script>
import { useAuthStore } from '~~/store/auth';

export default {
    setup() {
        const auth = useAuthStore()

        return {
            auth
        }
    },
    mounted() {
        if (this.auth.isLoggedIn) {
            navigateTo('/dashboard')
        }
        else {
            navigateTo('/events')
        }
    }
}
</script>

<template>
    Home
    <div v-show="auth.isLoggedIn">Logged In</div>
    <div v-show="auth.isAdmin">Administrator</div>
</template>