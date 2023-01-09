<script>
export default {
    props: ["events"],
}
</script>

<template>
    <div class="events">
        <EventListing v-for="e in events" :ev="e"></EventListing>
    </div>
</template>

<style scoped>
.events{
    width: 100%;
}
</style>