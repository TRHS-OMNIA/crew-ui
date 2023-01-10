<script>
import { useAlertStore } from '~~/store/alert';
import { useAuthStore } from '~~/store/auth';
import { useLoaderStore } from '~~/store/loader';
import { mapState } from 'pinia';

import {Html5Qrcode} from "html5-qrcode"

export default {
    setup() {
        definePageMeta({
            // 'middleware': 'loader'
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
        if (!this.isAdmin) {
            this.alertStore.alert("Administrators Only", "You are not authorized to validate check in / out codes.");
            this.$watch("visible", (newVisibility) => {
                if (!newVisibility) {
                    this.loader.loaded()
                    navigateTo({ path: "/" });
                }
            });
        }
        else {
            const html5QrCode = new Html5Qrcode("qr-scan-preview")
            const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                console.log(decodedResult)
            };
            const config = { fps: 10,  videoConstraints: {aspectRatio: 1}}
            html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
        }
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState(useAuthStore, ["isAdmin"]),
        ...mapState(useAlertStore, ["visible"]),
    },
    beforeUnmount() {
        document.querySelector('body').style.backgroundColor='#fff'
    },
    methods: {

    }
}

</script>

<template>
    <div class="content">
        <br><br>
        <div class="qr" id="qr-scan-preview">

        </div>
        <div class="bottom">

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
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;

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


