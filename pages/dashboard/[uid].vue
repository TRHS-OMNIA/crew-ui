<script>
import { useAlertStore } from '~~/store/alert';
import { useAuthStore } from '~~/store/auth';
import { useLoaderStore } from '~~/store/loader';
import { mapState } from 'pinia';

export default {
    setup() {
        definePageMeta({
        'middleware': 'loader'
        });
        const auth = useAuthStore();
        const alertStore = useAlertStore();
        const loader = useLoaderStore();
        return {
            auth: auth,
            alertStore: alertStore,
            loader: loader,
        };
    },
    data() {
        return {
            today: [
                {
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
                }
            ],
            upcoming: [
                {
                    check_in: null,
                    check_out: null,
                    day: "##",
                    event_id: "",
                    month: "MON",
                    position: null,
                    start: "",
                    time: "#:## AM - #:## PM",
                    title: "Event Title",
                    weekday: "Weekday"
                }
            ],
            previous: [
                {
                    check_in: null,
                    check_out: null,
                    day: "##",
                    event_id: "",
                    month: "MON",
                    position: null,
                    start: "",
                    time: "#:## AM - #:## PM",
                    title: "Event Title",
                    weekday: "Weekday"
                }
            ]
        };
    },
    methods: {
        async fetchData() {
            const res = await $fetch(this.$config.public.api + '/events/user/' + this.$route.params.uid, {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                this.today = res.today
                this.upcoming = res.upcoming
                this.previous = res.previous
                this.loader.loaded()
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        }
    },
    computed: {
        ...mapState(useAuthStore, ["isAdmin"]),
        ...mapState(useAlertStore, ["visible"]),
        nextTime() {
            if (this.upcoming.length > 0) {
                return prettyUpcomingEvent(this.upcoming[0].start);
            }
            else {
                return "";
            }
        },
        nextEvent() {
            if (this.upcoming.length > 0) {
                return this.upcoming[0].title;
            }
            else {
                return "";
            }
        },
        showUpcoming() {
            return this.upcoming.length > 0
        }
    },
    mounted() {
        if (!this.isAdmin) {
            this.alertStore.alert('Admins Only', "You don't have permission to manage an event.")
            this.$watch('visible', (newVisibility) => {
                if (! newVisibility) {
                    navigateTo({path: '/'})
                }
            })
        }
        else {
            this.fetchData()
        }
    },
}
</script>

<template>
    <div class="content">
        <div class="mod divide" v-if="today.length > 0">You'll use the button below to check in and out of today's event.  If you can't make it, inform your teacher immediately.</div>
        <div class="mod divide" v-else-if="showUpcoming">Your next event is {{ nextTime }} for {{ nextEvent }}, see you then!</div>
        <div class="mod divide" v-else>You don't have any upcoming events, but you can join one <span class="alink" @click="navigateTo('/events')">here</span>.</div>

        <div class="today divide" v-if="today.length > 0">
            <TodayButton v-for="ev in today" :ev="ev"></TodayButton>
        </div>

        <div class="divide">
            <h2>Future Events</h2>
            <DashboardEvent v-for="ev in upcoming" :ev="ev"></DashboardEvent>
            <div class="nothing" v-if="upcoming.length == 0">No upcoming events, click below to find one to join.</div>
            <OutlineButton @clacked="navigateTo('/events')">View All Events</OutlineButton>
            <p></p>
        </div>

        <div class="divide" v-if="previous.length > 0">
            <h2>Completed Events</h2>
            <DashboardEvent v-for="ev in previous" :ev="ev" previous></DashboardEvent>
        </div>
    </div>
</template>

<style scoped>
.nothing {
    width: 100%;
    text-align: center;
    margin: 16px 0 24px;
    font-style: italic;
}

.content {
    margin: auto;
    max-width: 540px;
    width: 100%;
}

.today {
    margin-top: 12px;
    
}

.divide {
    border-bottom: 1.5px solid black;
    padding-bottom: 4px;
}
</style>