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
            this.fetchQR()
        }
    },
    data() {
        return {
            qr: '',
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
            },
            scanned: false,
            qrTimeout: undefined,
            scanTimeout: undefined
        }
    },
    watch: {
        scanned(n, o) {
            if (n) {
                setTimeout(() => {navigateTo('/dashboard')}, 10 * 1000)
                window.navigator.vibrate(200)
            }
        }
    },
    computed: {
        ...mapState(useAuthStore, ["isLoggedIn"]),
        ...mapState(useAlertStore, ["visible"]),
    },
    beforeUnmount() {
        document.querySelector('body').style.backgroundColor='#fff'
        clearTimeout(this.qrTimeout)
        clearTimeout(this.scanTimeout)
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
        },
        async fetchQR() {
            const res = await $fetch(this.$config.public.api + '/event/' + this.$route.params.eid + '/qr', {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                clearTimeout(this.scanTimeout)
                if (this.qr != '') {this.checkScan()}
                
                this.qr = res.qrid
                if (document.visibilityState) {
                    this.qrTimeout= setTimeout(() => {this.fetchQR()}, 145 * 1000)
                    this.scanTimeout = setTimeout(() => {this.checkScan()}, 5 * 1000)
                }
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        },
        async checkScan() {
            clearTimeout(this.scanTimeout)
            const res = await $fetch(this.$config.public.api + '/qr/' + this.qr, {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                if (res.scanned) {
                    this.scanned = true
                    clearTimeout(this.qrTimeout)
                    clearTimeout(this.scanTimeout)
                }
                else {
                    clearTimeout(this.scanTimeout)
                    if (document.visibilityState) {this.scanTimeout = setTimeout(() => {this.checkScan()}, 5 * 1000)}
                }
            }
        }
    }
}

</script>

<template>
    <div class="content">
        <div class="qr" :class="{green: scanned}">
            <QRender :qdata="qr" v-if="qr != '' && !scanned"></QRender>
            <img class="invert" src="@/assets/check.svg" v-else-if="scanned"/>
        </div>
        <div class="bottom">
            <QREventInfo :display-name="auth.display_name" :ev="eventData"></QREventInfo>
        </div>
    </div>
    
</template>

<style scoped>
div.qr {
    max-width: 450px;
    width: 75%;
    margin: auto;
    background-color: white;
    border-radius: 15px;
    padding: 15px;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 1s;
}

.qr.green {
    background-color: var(--vibrant-green);
}

img.invert {
    filter: invert(1);
}

.bottom {
    margin-top: 15px;
}

.content {
    width: 100%;
    max-width: 540px;
    margin: auto;
}
</style>


