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
    emits:["clacked"],
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
    padding: 10px;
    font-weight: 600;
    border: 2px solid var(--vibrant-blue);
    border-radius: 10px;
    font-size: 18px;
    background-color: transparent;
    color: var(--vibrant-blue);
    width: 100%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

button:disabled {
    border-color: grey;
    background-color: grey;
    cursor: not-allowed;
}

button.right {
    float: right;
}

button.left{
    float: left;
}
</style>