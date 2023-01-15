<script>
export default {
    setup() {
        definePageMeta({
            middleware: 'loader'
        })
    }
}
</script>

<template>
    <EventEditor :creating="false"></EventEditor>
</template>