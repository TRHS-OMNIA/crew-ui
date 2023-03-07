<script>
import { useAlertStore } from '~~/store/alert';
import { useLoaderStore } from '~~/store/loader';
import { useAuthStore } from '~~/store/auth';
import { mapState } from 'pinia';

export default {
    setup() {
        definePageMeta({
            middleware: 'loader'
        })
        const alertStore = useAlertStore()
        const loader = useLoaderStore()
        const auth = useAuthStore()
        return {
            alertStore: alertStore,
            loader: loader,
            auth: auth,
        }
    },
    data() {
        return {
            u: [
                {
                    title: 'Event Title',
                    month: 'MON',
                    day: '##',
                    time: '#:## PM - #:## PM',
                    weekday: 'Wednesday',
                    id: 'id'
                }
            ],
            p: [
                {
                    title: 'Event Title',
                    month: 'MON',
                    day: '##',
                    time: '#:## PM - #:## PM',
                    weekday: 'Wednesday',
                    id: 'id'
                }
            ],
            t: [
                {
                    title: 'Event Title',
                    month: 'MON',
                    day: '##',
                    time: '#:## PM - #:## PM',
                    weekday: 'Wednesday',
                    id: 'id'
                }
            ],
            selected: 'upcoming'
        }
    },
    methods: {
        async getEventData() {
            const res = await $fetch(this.$config.public.api + '/events', {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                this.u = Object.assign({}, res.upcoming)
                this.p = Object.assign({}, res.previous)
                this.t = Object.assign({}, res.today)
                if (res.today.length > 0) {
                    this.selected = 'today'
                }
                this.loader.loaded()
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        }, 
        changeOption(newOption) {
            this.selected = newOption
        }
    },
    mounted() {
        this.getEventData()
    },
    computed: {
        ...mapState(useAuthStore, ["isAdmin"])
    }
}
</script>

<template>
    <div class="content">
        <div class="center"><img src="@/assets/calendar.svg" /></div>
        <h1>Events</h1>
        <div class="triple">
            <div :class="{option: selected == 'today'}" @click="changeOption('today')">Today</div>
            <div :class="{option: selected == 'upcoming'}" @click="changeOption('upcoming')">Upcoming</div>
            <div :class="{option: selected == 'prev'}" @click="changeOption('prev')">Previous</div>
        </div>
        <EventsList :events="u" empty="There aren't currently any upcoming events, check back often as events are regulary added." v-if="selected == 'upcoming'"></EventsList>
        <EventsList :events="p" empty="There haven't been any events." v-else-if="selected == 'prev'"></EventsList>
        <EventsList :events="t" empty="There aren't any events today." v-else-if="selected == 'today'"></EventsList>
    </div>
    <ClientOnly>
        <Teleport to="#nav-bar-slot">
            <IconButton white @clacked="navigateTo('/create')" v-if="isAdmin"><img src="@/assets/plus.svg" /></IconButton>
        </Teleport>
    </ClientOnly>
</template>

<style scoped>
    .content {
        width: 100%;
        max-width: 540px;
        margin: auto;
    }

    div.center > img {
        height: 55px;
        margin: auto;
    }

    .center {
        width: 100%;
        text-align: center;
    }

    h1 {
        text-align: center;
        margin-bottom: 14px;
    }
    .triple {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        text-align: center;
        margin-bottom: 12px;
        font-weight: 700;
        font-size: 20px;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    .option {
        border-bottom: 2px solid;
        padding-bottom: 4px;
    }
    
</style>