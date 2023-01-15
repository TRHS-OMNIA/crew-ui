<script>
import { useAuthStore } from '~~/store/auth';

export default {
    setup() {
        definePageMeta({
            middleware: 'loader'
        })
        const auth = useAuthStore()
        return {
            auth: auth
        }
    },
    data() {
        return {
            removeButtonPending: false
        }
    },
    methods: {
        async removeEntry() {
            this.removeButtonPending = true
            const res = await $fetch(this.$config.public.api + '/event/' + this.$route.params.eid + '/delete', {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                navigateTo('/')
            }
            else {
                this.removeButtonPending = false
                this.alertStore.alert(res.error, res.friendly)
            }
        }
    }
}
</script>

<template>
    <EventEditor :creating="false"></EventEditor>
    <ClientOnly>
        <Teleport to="#nav-bar-slot">
            <IconButton @clacked="removeEntry" :disabled="removeButtonPending" danger><img src="@/assets/trash.svg" /></IconButton>
        </Teleport>
    </ClientOnly>
</template>