<script>
export default {
    props: {
        right: Boolean,
        left: Boolean,
        type: {
            default: 'button',
            type: String
        }
    }
}
</script>

<template>
    <button :class="{'left': left, 'right': right}" :type="type">
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
    background-color: var(--vibrant-blue);
    color: white;
    width: 100%;
}

button.right {
    float: right;
}

button.left{
    float: left;
}
</style>