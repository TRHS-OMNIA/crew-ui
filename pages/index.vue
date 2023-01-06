<script>
import { useAuthStore } from '~~/store/auth';

export default {
    setup() {
        const auth = useAuthStore()

        return {
            auth
        }
    }
}
</script>

<template>
    Home
    <div v-show="auth.isLoggedIn">Logged In</div>
    <div v-show="auth.isAdmin">Administrator</div>
</template>