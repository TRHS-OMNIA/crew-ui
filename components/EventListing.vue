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
    methods: {
        navToEvent(middle=false) {
            if (this.isAdmin) {
                if(middle) {
                    let dest = this.$router.resolve(`/event/${this.ev.id}/dashboard`)
                    window.open(dest.href, '_blank')
                    return
                }
                return navigateTo(`/event/${this.ev.id}/dashboard`)
            }
            if(middle) {
                    let dest = this.$router.resolve(`/event/${this.ev.id}`)
                    window.open(dest.href, '_blank')
                    return
                }
            return navigateTo(`/event/${this.ev.id}`)
        }
    },
    computed: {
        ...mapState(useAuthStore, ['isAdmin']),
        limitsAvailable() {
            return this.ev.eventLimits != undefined
        },
        userCantJoin() {
            if (! this.isAdmin) {
                return this.limitsAvailable && ! this.ev.userEventLimits.user_available
            }
            return this.limitsAvailable && this.ev.eventLimits.available == 0
        }
    },
}
</script>

<template>
    <div class="event" :class="{cantjoin: userCantJoin}" @click="navToEvent()" @click.middle="navToEvent(true)">
        <CalDate :month="ev.month" :day="ev.day"></CalDate>
        <div>
            <div class="weekday flex" v-if="limitsAvailable && isAdmin">
                {{ ev.weekday }}
                <div class="tag">{{ ev.eventLimits.available }} of {{ ev.eventLimits.max }} available</div>
            </div>
            <div class="weekday" v-else>{{ ev.weekday }}</div>
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

.event.cantjoin {
    background-color: var(--dark-grey);
}

.caldate {
    border-color: white;
    margin-top: 0px;
    transform: scale(0.7);
}

.tag {
    background-color: white;
    color: var(--vibrant-blue);
    border-radius: 10px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 500;
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

.weekday.flex{
    display: flex;
    gap: 5px;
    /* justify-content: center; */
    align-items: center;
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