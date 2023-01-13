<script>
export default {
    props: ["events", "empty"],
    data(){
        return {
            isEmpty: true
        }
    },
    watch: {
        events:{
            immediate: true,
            handler(n, o) {
                if (n[0] != undefined) {
                    this.isEmpty = false
                }
            }
        }
    }
}
</script>

<template>
    <div class="events">
        <EventListing v-if="!isEmpty" v-for="e in events" :ev="e"></EventListing>
        <p v-else>{{ empty }}</p>
    </div>
</template>

<style scoped>
.events{
    width: 100%;
}

.events > p {
    text-align: center;
    font-style: italic;
}
</style>