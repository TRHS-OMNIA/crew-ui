<script>
export default {
    props: {
        ev: {
            default: {
                check_in: null,
                check_out: null,
                day: "##",
                event_id: "",
                month: "MON",
                position: null,
                start: "Sun, 09 Jan 2023 18:00:00 GMT",
                time: "#:## AM - #:## PM",
                title: "Event Title",
                weekday: "Weekday"
            },
            type: Object
        },
        previous: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isNoShow() {
            return (this.ev.check_in == null && this.previous)
        },
        isStillCheckedIn() {
            return (this.ev.check_in != null && this.ev.check_out == null && this.previous)
        },
        checkinout() {
            if (this.ev.check_in == null) {
                return ''
            }
            if (this.ev.check_out == null) {
                return prettyTime(this.ev.check_in)
            }
            return `${prettyTime(this.ev.check_in)} - ${prettyTime(this.ev.check_out)}`
        }
    }
}
</script>

<template>
    <div class="event">
        <CalDate :month="ev.month" :day="ev.day" :red="isNoShow || isStillCheckedIn"></CalDate>
        <div>
            <div class="weekday">{{ ev.weekday }}</div>
            <div class="title">{{ ev.title }}</div>
            <div class="time" v-if="!previous">{{ ev.time }}</div>
            <div class="time" v-else-if="isNoShow">
                <span class="alert">No Show</span>
            </div>
            <div class="time" v-else-if="isStillCheckedIn">
                <span class="alert">Never Checked Out</span>
            </div>
            <div class="time" v-else>{{ checkinout }}</div>
        </div>
    </div>
</template>

<style scoped>
.event {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    /* gap: 10px; */
    align-items: center;
    /* background-color: var(--vibrant-blue); */
    border-radius: 15px;
    /* padding: 15px; */
    box-sizing: border-box;
    color: black;
    /* margin-bottom: 8px; */
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transform: translateX(-10px);
}

.caldate {
    /* border-color: white; */
    margin-top: 0px;
    transform: scale(0.7);
}


.time {
    font-size: 12px;
}

.title {
    font-size: 18px;
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

span.alert {
    color: var(--vibrant-red);
    font-weight: 900;
    font-size: 16px;
}
</style>