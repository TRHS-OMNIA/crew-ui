

<script>
import { useAuthStore } from '~~/store/auth';
import { mapState } from 'pinia';
import { useLoaderStore } from '~~/store/loader';
import { useAlertStore } from '~~/store/alert';

export default {
    setup() {
        definePageMeta({
            middleware: 'loader'
        })
        const auth = useAuthStore()
        const loader = useLoaderStore()
        const alertStore = useAlertStore()
        // loader.start()
        return {
            auth: auth,
            loader: loader,
            alertStore: alertStore
        }
    },
    computed: {
        ...mapState(useAuthStore, ['isLoggedIn'])
    },
    watch: {
        isLoggedIn(newValue, old) {
            if (newValue) {
                this.fetchEventData()
            }
        }
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
            eventLimits: {
                max: 100,
                reserved: 50,
                available: 25,
                reserved_available: 12
            },
            userEventLimits: {
                user_available: false,
                user_justification: 'Join Event'
            },
        }
        
    },
    methods: {
        async fetchEventData() {
            const res = await $fetch(this.$config.public.api + '/event/' + this.$route.params.id, {
                method: 'GET',
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                Object.assign(this.eventData, res.eventData)
                Object.assign(this.eventLimits, res.eventLimits)
                Object.assign(this.userEventLimits, res.userEventLimits)
                this.loader.loaded()
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        },
        async joinEvent() {
            this.userEventLimits.user_available = false
            const res = await $fetch(this.$config.public.api + '/join', {
                method: 'POST',
                body: {eventId: this.$route.params.id},
                headers: {
                    authorization: this.auth.token
                }
            })
            if (res.success) {
                this.userEventLimits.user_justification = 'Event Joined'
                this.eventLimits.available -= 1
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        }
    },
    mounted() {
        this.fetchEventData()
    }
}
</script>

<template>
    <div class="container">
        <br>
        <div class="event-data">
            <CalDate :month="eventData.month" :day="eventData.day"></CalDate>
            <div class="weekday">{{ eventData.weekday }}</div>
            <div class="time">{{ eventData.time }}</div>
            <div class="title">{{ eventData.title }}</div>
        </div>

        <div class="crew-data">
            <IconBar><img src="@/assets/team.svg"/></IconBar>
            <div v-if="eventLimits.max >= 0">
                <div class="crewing">{{ eventLimits.available }} of {{ eventLimits.max }} positions available</div>
                <div class="crewing italic" v-show="eventLimits.reserved > 0">({{ eventLimits.reserved_available }} of {{ eventLimits.reserved }} reserved positions are unclaimed)</div>
            </div>
            <div v-else>
                <div class="crewing">#  positions filled</div>
            </div>
            
        </div>

        <div class="space"></div>

        <div class="login-required" v-if="!isLoggedIn">
            <div>
                <IconBar><img src="@/assets/lock.svg" /></IconBar>
                <p>Addional actions are available for authenticated users.</p>
                <Auth></Auth></div>
            </div>
        <div class="space-again" v-else>
            <StandardButton :disabled="!userEventLimits.user_available" @clacked="joinEvent">{{ userEventLimits.user_justification }}</StandardButton>
        </div>
    </div>
</template>

<style scoped>
.login-required{
    text-align: center;
}
.event-data {
    text-align: center;
}

.weekday {
    font-style: italic;
    margin-top: 8px;
}

.time {
    font-size: 20px;
    margin-bottom: 16px;
}

.title {
    font-size: 28px;
    font-weight: 600;
}

.crew-data {
    text-align: center;
}

.crewing.italic {
    font-style: italic;
}

.space {
    height: 55px;
}

.space-again {
    margin-top: 25px;
}

.container {
    margin: auto;
    max-width: 540px;
}
</style>
