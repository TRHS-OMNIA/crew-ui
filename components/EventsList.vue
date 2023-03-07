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
    },
    computed: {
        showJoinableKey() {
            return !this.isEmpty && this.events[0].eventLimits != undefined
        }
    }
}
</script>

<template>
    <div class="events">
        <div class="joinable-key" v-if="showJoinableKey">
            <div class="key-item">Event Positions are </div>
            <div class="key-item tag blue">Available</div>
            <div class="key-item tag grey">Unavailable</div>
        </div>
        <EventListing v-if="!isEmpty" v-for="e in events" :ev="e"></EventListing>
        <p v-else>{{ empty }}</p>
    </div>
</template>

<style scoped>
.joinable-key {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
}

.tag {
    /* border: 1px solid; */
    border-radius: 10px;
    padding: 2px 10px;
    font-size: 14px;
    font-weight: 500;
}

.tag.blue {
    background-color: var(--vibrant-blue);
    color: white;
}

.tag.grey {
    background-color: var(--dark-grey);
    color: white;
}
.events{
    width: 100%;
}

.events > p {
    text-align: center;
    font-style: italic;
}
</style>