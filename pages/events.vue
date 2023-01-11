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
        return {
            alertStore: alertStore,
            loader: loader
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
            upcoming: true,
        }
    },
    methods: {
        async getEventData() {
            const res = await $fetch(this.$config.public.api + '/events', {
                method: 'GET'
            })
            if (res.success) {
                this.u = Object.assign({}, res.upcoming)
                this.p = Object.assign({}, res.previous)
                this.loader.loaded()
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
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
        <div class="double">
            <div :class="{option: upcoming}" @click="upcoming = true">Upcoming</div>
            <div :class="{option: !upcoming}" @click="upcoming = false">Previous</div>
        </div>
        <EventsList :events="u" v-if="upcoming"></EventsList>
        <EventsList :events="p" v-else></EventsList>
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
    .double {
        display: grid;
        grid-template-columns: 1fr 1fr;
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