<script>
import { useLoaderStore } from '~~/store/loader'
import { mapState } from 'pinia'
export default {
    setup() {
        const loader = useLoaderStore()
        return {
            loader
        }
    },
    computed: {
        ...mapState(useLoaderStore, ['isLoading'])
    }
}
</script>

<template>
    <div class="takeover" v-if="isLoading">
        <video disableRemotePlayback autoplay muted loop playsinline src="@/assets/loader.mp4"></video>
    </div>
</template>

<style scoped>
.takeover {
    z-index: 99;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
}

video {
    max-width: 512px;
    max-height: 512px;
    width: 30%;
    aspect-ratio: 1 / 1;
    margin: auto;
}

video::-internal-media-controls-overlay-cast-button {
    display: none;
}
</style>