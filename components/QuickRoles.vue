<script>
export default {
    props: ["role"],
    emits: ["quickRole"],
    methods: {
        quack() {
            this.$emit('quickRole', this.role)
        }
    }
}
</script>

<template>
    <div @click="quack">{{ role }}</div>
</template>

<style scoped>
div {
    border: 1px solid;
    border-radius: 10px;
    padding: 0 8px;
    /* font-size: 12px; */
    font-weight: 500;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}
</style>