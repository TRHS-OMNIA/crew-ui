<script>
import { useAlertStore } from '~~/store/alert';
import { useAuthStore } from '~~/store/auth';
import { useLoaderStore } from '~~/store/loader';
import { mapState } from 'pinia';

export default {
    setup() {
        definePageMeta({
        'middleware': 'loader'
        });
        const auth = useAuthStore();
        const alertStore = useAlertStore();
        const loader = useLoaderStore();
        return {
            auth: auth,
            alertStore: alertStore,
            loader: loader,
        };
    },
    async mounted() {
        document.querySelector('body').style.backgroundColor='#000'
        if (!this.isLoggedIn) {
            this.alertStore.alert("Authenticated Users Only", "Sign in to access check in QR codes.");
            this.$watch("visible", (newVisibility) => {
                if (!newVisibility) {
                    this.loader.loaded()
                    navigateTo({ path: "/login" });
                }
            });
        }
        else {
            this.fetchData()
        }
    },
    data() {
        return {
            qr: 'crew',
            eventData: {
                    check_in: null,
                    check_out: null,
                    day: "##",
                    event_id: "",
                    month: "MON",
                    position: null,
                    start: "Sun, 09 Jan 2023 18:00:00 GMT",
                    time: "#:## AM - #:## PM",
                    title: "Event Title",
                    weekday: "Weekday"
                }
        }
    },
    computed: {
        ...mapState(useAuthStore, ["isLoggedIn"]),
        ...mapState(useAlertStore, ["visible"]),
    },
    beforeUnmount() {
        document.querySelector('body').style.backgroundColor='#fff'
    },
    methods: {
        async fetchData() {
            const res = await $fetch(this.$config.public.api + '/event/' + this.$route.params.eid + '/user', {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                this.eventData = res.userEventData
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
        <br><br>
        <div class="qr">
            <QRender :qdata="qr"></QRender>
        </div>
        <div class="bottom">
            <QREventInfo :display-name="auth.display_name" :ev="eventData"></QREventInfo>
        </div>
    </div>
    
</template>

<style scoped>
.qr {
    max-width: 450px;
    width: 75%;
    margin: auto;
    background-color: white;
    border-radius: 15px;
    padding: 15px;
}

.bottom {
    margin-top: 80px;
}

.content {
    width: 100%;
    max-width: 540px;
    margin: auto;
}
</style>


