<script>
import { useAlertStore } from '~~/store/alert';
import { useAuthStore } from '~~/store/auth';
import { useLoaderStore } from '~~/store/loader';
import { mapState } from 'pinia';

export default {
    setup() {
        definePageMeta({
            middleware: 'loader'
        })
        const auth = useAuthStore()
        const alertStore = useAlertStore()
        const loader = useLoaderStore()
        return {
            auth: auth,
            alertStore: alertStore,
            loader: loader
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
    },
    computed: {
        ...mapState(useAuthStore, ["isAdmin"]),
        ...mapState(useAlertStore, ["visible"]),
    },
    data() {
        return {
            eventData: {
                title: 'Event Title',
                month: 'MON',
                day: '##',
                time: '#:## PM - #:## PM',
                weekday: 'Wednesday'
            },
            entries: []
        }
    },
    methods: {
        async fetchEventData() {
            const res = await $fetch(this.$config.public.api + '/event/' + this.$route.params.eid + '/dashboard', {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                Object.assign(this.eventData, res.eventData)
                Object.assign(this.entries, res.entries)
                this.loader.loaded()
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        },
    },
    mounted() {
        this.fetchEventData()
    }
}
</script>

<template>
    <div class="container">
        <div class="headliner">
            <div class="content cal-date">
                <CalDate :month="eventData.month" :day="eventData.day"></CalDate>
                <div>
                    <div class="title">{{ eventData.title }}</div>
                    <div class="weekday">{{ eventData.weekday }}</div>
                    <div class="time">{{ eventData.time }}</div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="entries">
                <DasboardEntry v-for="entry in entries" :entry="entry" :auth-token="auth.token"></DasboardEntry>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    max-width: 540px;
}

.headliner {
    background-color: black;
    width: 100vw;
    transform: translateX(-12px) translateY(-24px);
    position: static;
    padding-top: 32px;
    padding-bottom: 16px;
    /* margin: 0 12px 12px 12px; */
}

.cal-date {
    color: white;
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    width: calc(100vw - 24px);
    margin: auto;
    gap: 12px;
}

.weekday {
    /* font-style: italic; */
}

.time {
    font-size: 20px;
}

.title {
    font-size: 22px;
    font-weight: 600;
}

.caldate {
    margin-top: 6px;
}

</style>