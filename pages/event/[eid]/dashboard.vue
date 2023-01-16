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
        else {
            this.fetchEventData()
        }
    },
    computed: {
        ...mapState(useAuthStore, ["isAdmin"]),
        ...mapState(useAlertStore, ["visible"]),
        filled() {
            return this.eventLimits.max - this.eventLimits.available
        },
        roles() {
            let combinedRoles = ''
            for (const entry of this.entries) {
                if (entry.position) {
                    combinedRoles += `/${entry.position}/`
                }
            }
            let tags = []
            for (const role of this.$config.public.roles) {
                const regex = new RegExp(`/${role}/`, 'g')
                const count = (combinedRoles.match(regex) || []).length
                if (count > 0) {
                    tags.push(`${count} ${role}`)
                }
            }
            return tags
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
            entries: [],
            eventLimits: {
                max: 100,
                reserved: 50,
                available: 25,
                reserved_available: 12
            },
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
                Object.assign(this.eventLimits, res.eventLimits)
                this.loader.loaded()
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        },
        edited(index, editedEntry) {
            this.entries[index] = editedEntry
        }
    },
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
        <div class="content cal-date placeholder">
                <CalDate :month="eventData.month" :day="eventData.day"></CalDate>
                <div>
                    <div class="title">{{ eventData.title }}</div>
                    <div class="weekday">{{ eventData.weekday }}</div>
                    <div class="time">{{ eventData.time }}</div>
                </div>
            </div>
        <div class="content">
            <p>{{ filled }} of {{ eventLimits.max }} positions filled</p>
            <div class="tags"><div class="tag" v-for="r in roles">{{ r }}</div></div>
            <div class="entries">
                <DasboardEntry v-for="(entry, i) in entries" :entry="entry" :auth-token="auth.token" :index="i" @edited="edited"></DasboardEntry>
            </div>
        </div>
    </div>
    <ClientOnly>
        <Teleport to="#nav-bar-slot">
            <IconButton white @clacked="navigateTo(`/event/${this.$route.params.eid}/edit`)"><img src="@/assets/edit-pencil.svg" /></IconButton>
            <IconButton white @clacked="navigateTo('/scan')"><img src="@/assets/scan-qr-code.svg" /></IconButton>
        </Teleport>
    </ClientOnly>
</template>



<style scoped>
.content {
    max-width: 540px;
    margin: auto;
}

p {
    text-align: center;
    margin-top: 0px;
}

.headliner {
    background-color: black;
    /* width: 100vw; */
    /* transform: translateX(-12px) translateY(-24px); */
    position: fixed;
    padding-top: 12px;
    padding-bottom: 16px;
    left: 0px;
    right: 0px;
    margin-top: -24px;
    /* margin: 0 12px 12px 12px; */
}

.placeholder {
    margin-bottom: 12px !important;
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

.tag {
    border: 1px solid;
    border-radius: 10px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 500;
}

.tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    gap: 4px;
}
</style>