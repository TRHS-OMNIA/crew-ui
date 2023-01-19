<script>
import { useAuthStore } from '~~/store/auth';
import { useLoaderStore } from '~~/store/loader';
import { useAlertStore } from '~~/store/alert';
export default {
    setup() {
        const auth = useAuthStore();
        const loader = useLoaderStore();
        const alertStore = useAlertStore()
        return {
            auth: auth,
            loader: loader,
            alertStore: alertStore
        };
    },
    props: {
        user: {
            type: Object
        },
        query: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            added: false,
            adding: false
        }
    },
    computed: {
        displayName() {
            if (this.user.nickname) {
                return `${this.user.first_name} (${this.user.nickname}) ${this.user.last_name}`;
            }
            return `${this.user.first_name} ${this.user.last_name}`;
        },
        show() {
            if (this.query == "") {
                return true;
            }
            return this.displayName.toLowerCase().includes(this.query.toLowerCase());
        }
    },
    methods: {
        async addUser() {
            this.adding = true
            const res = await $fetch(`${this.$config.public.api}/event/${this.$route.params.eid}/add/${this.user.id}`, {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                this.added = true
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
                this.adding = false
            }
        }
    }
}
</script>

<template>
    <div class="user" v-if="show">
        <div class="name">{{ displayName }}</div>
        <IconButton :disabled="adding" @clacked="addUser">
            <img v-if="!added" src="@/assets/plus.svg" />
            <img v-else src="@/assets/check.svg" />
        </IconButton>
    </div>
    
</template>

<style scoped>
.user {
    width: 100%;
    text-align: left;
    border-bottom: 2px solid black;
    padding: 12px 0;
    font-size: 20px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
}
</style>