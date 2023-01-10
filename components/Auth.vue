<script>
import { useAuthStore } from '~~/store/auth';
import { useAlertStore } from '~~/store/alert';
import { GoogleLogin } from 'vue3-google-login';

export default {
    setup() {
        const auth = useAuthStore()
        const alertStore = useAlertStore()
        return {
            auth: auth,
            alertStore: alertStore
        }
    },
    methods: {
        async gCallback(res) {
            const authRes = await $fetch(this.$config.public.api + '/auth/google', {
                method: 'POST',
                body: {token: res.credential},
            })
            if (authRes.success) {
                this.auth.login(authRes.payload, authRes.token)
            }
            else {
                this.alertStore.alert(authRes.error, authRes.friendly)
            }
            
        },
    },
    data() {
        return {
            gButtonConfig: {
                theme: 'filled_blue',
                size: 'medium',
                shape: 'pill'
            },
        }
    },
    computed: {

    },
    components: {
        GoogleLogin
    }
}
</script>

<template>
    <div>
        <GoogleLogin :client-id="$config.public.googleClientId" :callback="gCallback" :prompt="false" :buttonConfig="gButtonConfig"></GoogleLogin>
    </div>
</template>