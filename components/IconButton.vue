<script>
export default {
    props: {
        right: Boolean,
        left: Boolean,
        type: {
            default: 'button',
            type: String
        },
        disabled: {
            default: false,
            type: Boolean
        }
    },
    emits:["clacked"]
}
</script>

<template>
    <button :class="{'left': left, 'right': right}" :type="type" @click="$emit('clacked')" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    font-family: 'Outfit';
    padding: 5px;
    font-weight: 600;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 18px;
    color: white;
    width: 100%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    aspect-ratio: 1/1;
    display: flex;
}

button:disabled {
    border-color: grey;
    background-color: grey;
    cursor: not-allowed;
}

::v-deep(img) {
    aspect-ratio: 1 / 1;
    height: 33px;
    margin: auto;
}

button.right {
    float: right;
}

button.left{
    float: left;
}
</style>