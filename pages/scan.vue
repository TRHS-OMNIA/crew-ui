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
            this.scanner = new Html5Qrcode("qr-scan-preview")
            const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                this.scanned(decodedText)
            };
            const config = { fps: 10,  videoConstraints: {aspectRatio: 1, facingMode: "environment"}}
            this.scanner.start({ facingMode: "environment" }, config, qrCodeSuccessCallback).then( () => {
                const qrCrapVideo = document.getElementById("qr-scan-preview").getElementsByTagName("video")[0]
                qrCrapVideo.id = 'qr-video-crap'
                qrCrapVideo.addEventListener('playing', () => {
                    document.getElementById("qr-scan-preview").getElementsByTagName("div")[0].id = 'qr-pause-crap'
                })
            })
            
        }
    },
    data() {
        return {
            scanner: Html5Qrcode,
            scanData : {
                first_name: 'First',
                nickname: null,
                last_name: 'Last',
                title: 'Event Title',
                grade: 0,
                period: 1,
                class: 'Class',
                action: ''
            },
            scanViz: false,
        }
    },
    computed: {
        ...mapState(useAuthStore, ["isAdmin", "token"]),
        ...mapState(useAlertStore, ["visible"]),
    },
    beforeUnmount() {
        document.querySelector('body').style.backgroundColor='#fff'
    },
    methods: {
        async scanned(scannedText) {
            console.log(scannedText)
            this.scanner.pause()
            const res = await $fetch(this.$config.public.api + '/scan/qr/' + scannedText, {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                console.log(res)
                this.scanData = Object.assign({}, res.data)
                this.scanViz = true
                setTimeout(() => {this.scanner.resume()}, 5000) 
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        },
        clearScan() {
            // this.scanner.resume()
            this.scanViz = false
        }
    }
}

</script>

<template>
    <div class="content">
        <br><br>
        <div class="qr" id="qr-scan-preview">

        </div>
        <div class="bottom">
            <DasboardEntry :auth-token="token" :entry="scanData" v-if="scanViz"></DasboardEntry>
            <br>
            <StandardButton @clacked="clearScan">Clear Scanner</StandardButton>
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
    background-color: white;
    padding: 15px;
    border-radius: 15px;
}

.entry {
    margin: 0;
}

.content {
    width: 100%;
    max-width: 540px;
    margin: auto;
}

</style>

<style>
#qr-video-crap {
    width: 100% !important;
    aspect-ratio: 1 / 1 !important;
}

#qr-canvas-crap, #qr-canvas {
    display: none !important;
}

#qr-pause-crap {
    display: none !important;
}
</style>
