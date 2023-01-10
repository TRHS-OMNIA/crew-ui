<script>
import { useAlertStore } from '~~/store/alert';
import { mapState } from 'pinia';

export default {
    setup() {
        const alertStore = useAlertStore()

        return {alertStore}
    },
    computed: {
        ...mapState(useAlertStore, ['content', 'header', 'visible'])
    },
    methods: {
        close() {
            this.alertStore.close()
        }
    }
}
</script>

<template>
    <div class="blackout" v-if="visible" @click="close">
        <div class="alert">
            <div class="header">{{ header }}</div>
            <div class="content">{{ content }}</div>
        </div>
    </div>
</template>

<style scoped>
.blackout {
    position: fixed;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    display: flex;
    background-color: rgba(1, 1, 1, 0.5);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 100;
}
.alert {
    background-color: var(--vibrant-red);
    color: white;
    padding: 30px;
    border-radius: 15px;
    width: 100%;
    max-width: 520px;
    margin: 15px;
}

.header {
    text-align: center;
    font-family: 700;
    font-size: 24px;
    border-bottom: 1.5px solid white;
    padding-bottom: 12px;
    margin-bottom: 12px;
}

.content {
    font-size: 16px;
}
</style>