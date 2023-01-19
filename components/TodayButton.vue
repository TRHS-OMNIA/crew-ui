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
            if (!this.checkedOut){navigateTo(`/event/${this.ev.event_id}/qr`)}
        }
    },
    computed: {
        countdownString() {
            return countdown(this.ev.start, this.now)
        },
        checkinout() {
            if (this.ev.check_in == null) {
                return ''
            }
            if (this.ev.check_out == null) {
                return prettyTime(this.ev.check_in)
            }
            return `${prettyTime(this.ev.check_in)} - ${prettyTime(this.ev.check_out)}`
        },
        checkedIn() {
            return this.ev.check_in != null
        },
        checkedOut() {
            return this.ev.check_out != null
        }
    },
}
</script>

<template>
    <div class="event-btn" @click="navToEvent" :class="{green: checkedIn && !checkedOut, out: checkedOut}">
        <div class="counter" v-if="checkedOut">Completed</div>
        <div class="counter" v-else-if="checkedIn">Checked in @ {{ checkinout }}</div>
        <div class="counter" v-else-if="countdownString">Starts in {{ countdownString }}</div>
        <div class="counter" v-else>Event Started</div>
        <CalDate :month="ev.month" :day="ev.day"></CalDate>
        <div>
            <div class="title">{{ ev.title }}</div>
            <div class="time" v-if="!checkedOut">{{ ev.time }}</div>
            <div class="time" v-else>{{ checkinout }}</div>
            <div class="weekday">
                <span class="emphasis">Role: </span>
                <span v-if="ev.position != null">{{ ev.position }}</span>
                <span v-else class="italic">Unassigned</span>
            </div>
        </div>
        <div class="buuttons">
            <img src="@/assets/qr.svg" v-if="!checkedOut"/>
            <img src="@/assets/check.svg" v-else/>
        </div>
    </div>
</template>

<style scoped>
.event-btn {
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

.event-btn.green {
    background-color: var(--less-vibrant-green);
}

.event-btn.out {
    background-color: grey;
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

.out > .caldate, .green > .caldate {
    border-color: var(--vibrant-blue);
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