<script>

</script>

<template>
    <div>
        <slot />
        <hr>
    </div>
</template>

<style scoped>
::v-deep(img) {
    aspect-ratio: 1 / 1;
    height: 55px;
    margin: auto;
    background-color: white;
}

hr {
    width: 100%;
    height: 2px;
    margin: 0;
    background-color: black;
    border: none;
    margin-top: -27.5px;
}

div {
    text-align: center;
    width: 75%;
    margin: auto;
    margin-top: 25px;
    margin-bottom: 20px;
}
</style>