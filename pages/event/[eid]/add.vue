<script>
import { useAlertStore } from '~~/store/alert';
import { useAuthStore } from '~~/store/auth';
import { useLoaderStore } from '~~/store/loader';
import { mapState } from 'pinia';

export default {
    setup() {
        definePageMeta({
            middleware: 'loader'
        })
        const auth = useAuthStore()
        const alertStore = useAlertStore()
        const loader = useLoaderStore()
        return {
            auth: auth,
            alertStore: alertStore,
            loader: loader
        }
    },
    mounted() {
        if (!this.isAdmin) {
            this.alertStore.alert('Admins Only', "You don't have permission to manage an event.")
            this.$watch('visible', (newVisibility) => {
                if (! newVisibility) {
                    navigateTo({path: '/'})
                }
            })
        }
        else {
            this.fetchUsers()
        }
    },
    computed: {
        ...mapState(useAuthStore, ["isAdmin"]),
        ...mapState(useAlertStore, ["visible"]),
    },
    data() {
        return {
            users: [],
            search: ''
        }
    },
    methods: {
        async fetchUsers() {
            const res = await $fetch(this.$config.public.api + '/users', {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                Object.assign(this.users, res.users)
                this.loader.loaded()
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        }
    }
}
</script>

<template>
    <div class="content">
        <img src="@/assets/add-user.svg" class="header-icon"/>
        <h1>Add Users</h1>

        <TextField label="Search" v-model="search" placeholder="Start entering a name..." inputmode="default" :valid="true"></TextField>
        <br><br>
        <UserAdder v-for="user in users" :user="user" :query="search"></UserAdder>
    </div>
    <ClientOnly>
        <Teleport to="#nav-bar-slot">
            <IconButton white @clacked="navigateTo(`/event/${this.$route.params.eid}/dashboard`)"><img src="@/assets/check.svg" /></IconButton>
        </Teleport>
    </ClientOnly>
</template>

<style scoped>
.content {
    text-align: center;
    max-width: 560px;
    margin: auto;
}
</style>