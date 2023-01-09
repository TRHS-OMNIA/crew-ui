<script>
export default {
    props: {
        ev: {
            default: {
                title: "Event Title",
                month: "MON",
                day: "##",
                time: "#:## PM - #:## PM",
                weekday: "Wednesday",
                event_id: "id",
                check_in: null,
                check_out: null,
                start: '',
                position: null
            },
            type: Object
        }
    },
    data() {
        return {
            now: new Date()
        }
    },
    mounted() {
        setInterval(() => {this.now = new Date()}, 100)
    },
    methods: {
        navToEvent() {
            navigateTo(`/event/${this.ev.event_id}/qr`)
        }
    },
    computed: {
        countdownString() {
            return countdown(this.ev.start, this.now)
        }
    },
}
</script>

<template>
    <div class="event" @click="navToEvent">
        <div class="counter" v-if="countdownString">Starts in {{ countdownString }}</div>
        <div class="counter" v-else>Event Started</div>
        <CalDate :month="ev.month" :day="ev.day"></CalDate>
        <div>
            <div class="title">{{ ev.title }}</div>
            <div class="time">{{ ev.time }}</div>
            <div class="weekday">
                <span class="emphasis">Role: </span>
                <span v-if="ev.position != null">{{ ev.position }}</span>
                <span v-else class="italic">Unassigned</span>
            </div>
        </div>
        <div class="buuttons">
            <img src="@/assets/qr.svg" />
        </div>
    </div>
</template>

<style scoped>
.event {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-items: center;
    background-color: var(--vibrant-blue);
    border-radius: 15px;
    padding: 15px;
    box-sizing: border-box;
    color: white;
    margin-bottom: 8px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.counter {
    grid-column: 1/-1;
    text-align: center;
    font-variant-numeric: tabular-nums;
    border-bottom: 1px solid white;
    padding-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 5px;
}

.emphasis {
    font-weight: 600;
}

.italic {
    font-style: italic;
}

.caldate {
    border-color: white;
}


.time {
    font-size: 16px;
}

.title {
    font-size: 22px;
    font-weight: 600;
}

.weekday {
    font-size: 14px;
}

.buuttons {
    display: flex;
}

img {
    aspect-ratio: 1 / 1;
    height: 45px;
    margin: auto;
    filter: invert(1);
}
</style>