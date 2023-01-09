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
        }
    },
}
</script>

<template>
    <div class="event">
        <CalDate :month="ev.month" :day="ev.day"></CalDate>
        <div>
            <div class="weekday">{{ ev.weekday }}</div>
            <div class="title">{{ ev.title }}</div>
            <div class="time">{{ ev.time }}</div>
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
</style>