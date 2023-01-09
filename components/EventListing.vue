<script>
import { useAuthStore } from '~~/store/auth';
import { mapState } from 'pinia';
export default {
    props: {
        ev: {
            default: {
                title: "Event Title",
                month: "MON",
                day: "##",
                time: "#:## PM - #:## PM",
                weekday: "Wednesday",
                id: "id"
            },
            type: Object
        }
    },
    mounted() {
        this.e = this.event;
    },
    methods: {
        navToEvent() {
            if (this.isAdmin) {
                navigateTo(`/event/${this.ev.id}/dashboard`)
                return
            }
            navigateTo(`/event/${this.ev.id}`)
        }
    },
    computed: {
        ...mapState(useAuthStore, ['isAdmin'])
    },
}
</script>

<template>
    <div class="event" @click="navToEvent">
        <CalDate :month="ev.month" :day="ev.day"></CalDate>
        <div>
            <div class="weekday">{{ ev.weekday }}</div>
            <div class="title">{{ ev.title }}</div>
            <div class="time">{{ ev.time }}</div>
        </div>
        <div class="buuttons">
            <img src="@/assets/nav-arrow-right.svg" />
        </div>
    </div>
</template>

<style scoped>
.event {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    /* gap: 10px; */
    align-items: center;
    background-color: var(--vibrant-blue);
    border-radius: 15px;
    /* padding: 15px; */
    box-sizing: border-box;
    color: white;
    margin-bottom: 8px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}

.caldate {
    border-color: white;
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