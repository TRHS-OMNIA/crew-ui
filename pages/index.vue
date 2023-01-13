<script>
import { useAuthStore } from '~~/store/auth';
import { mapState } from 'pinia';

export default {
    setup() {
        const auth = useAuthStore()

        return {
            auth
        }
    },
    computed: {
        ...mapState(useAuthStore, ['isLoggedIn'])
    },
    watch:{
        isLoggedIn(n, o) {
            if (n) {
                navigateTo('/dashboard')
            }
        }
    },
    mounted() {
        if (this.auth.isLoggedIn) {
            navigateTo('/dashboard')
        }
        // else {
        //     navigateTo('/events')
        // }
    }
}
</script>

<template>
    <div class="container">
        <img class="logo" src="@/assets/tower-light.svg" />
        <IconBar>
            <img src="@/assets/user.svg" class="section-header"/>
        </IconBar>
        <p>Sign in to view your upcoming events and check-in codes.</p>
        <br>
        <Auth></Auth>
        <br><br>
        <IconBar><img src="@/assets/calendar.svg" /></IconBar>
        <p>View the upcoming schedule and join events.</p>
        <br>
        <OutlineButton @clacked="navigateTo('/events')">View Events</OutlineButton>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    max-width: 540px;
    margin: auto;
    text-align: center;
    margin-top: 10vh;
}

img.logo {
    max-height: 150px;
    width: 100%;
}
</style>