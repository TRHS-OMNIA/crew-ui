<script>
import QRCode from 'qrcode'
export default {
    props: ['qdata'],
    watch: {
        async qdata(n, o) {
            this.qrDataSrc = await QRCode.toDataURL(n, {width: 326, margin: 1})
        }
    },
    data() {
        return {
            qrDataSrc: ''
        }
    },
    async mounted() {
        this.qrDataSrc = await QRCode.toDataURL(this.qdata, {width: 326, margin: 1})
    }
}
</script>

<template>
    <img :src="qrDataSrc" />
</template>

<style scoped>
    img {
        width: 100%;
        aspect-ratio: 1/1;
    }
</style>