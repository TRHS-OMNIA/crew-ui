<script>
import { useAlertStore } from '~~/store/alert';
import { useAuthStore } from '~~/store/auth';
import { useLoaderStore } from '~~/store/loader';
import { mapState } from 'pinia';

export default {
    setup() {
        const auth = useAuthStore()
        const alertStore = useAlertStore()
        const loader = useLoaderStore()
        return {
            auth: auth,
            alertStore: alertStore,
            loader: loader
        }
    },
    props: {
        creating: {
            default: true,
            type: Boolean
        }
    },
    async mounted() {
        if (!this.isAdmin) {
            this.alertStore.alert('Admins Only', "You don't have permission to create or modify events.")
            this.$watch('visible', (newVisibility) => {
                if (! newVisibility) {
                    navigateTo({path: '/'})
                }
            })
        }
        else {
            if (!this.creating) {
                const res = await $fetch(this.$config.public.api + `/event/${this.$route.params.eid}/edit`, {
                    method: 'GET',
                    headers: {
                        authorization: this.auth.token
                    }
                })

                if (res.success) {
                    this.eventTitle =  res.eventTitle
                    this.date =  res.date
                    this.startTime =  res.startTime
                    this.endTime =  res.endTime
                    this.limit =  res.limit
                    this.reserved =  res.reserved
                    this.loader.loaded()
                }
                else {
                    this.alertStore.alert(res.error, res.friendly)
                }
            }
        }
    },
    computed: {
        ...mapState(useAuthStore, ["isAdmin", "token"]),
        ...mapState(useAlertStore, ["visible"]),
    },
    data() {
        return {
            eventTitle: '',
            date: '',
            startTime: '',
            endTime: '',
            limit: '10',
            reserved: '4',
            eventTitleValid: true,
            dateValid: true,
            startTimeValid: true,
            endTimeValid: true,
            limitValid: true,
            reservedValid: true,
            submitable: true
        }
    },
    watch: {
        eventTitle(newValue, old) {
            this.eventTitleValid = true
        },
        date(newValue, old) {
            this.dateValid = true
        },
        startTime(newValue, old) {
            this.startTimeValid = true
        },
        endTime(newValue, old) {
            this.endTimeValid = true
        },
        limit(newValue, old) {
            this.limitValid = true
        },
        reserved(newValue, old) {
            this.reservedValid = true
        },
    },
    methods: {
        validation() {
            let valid = true
            if (this.eventTitle.length < 1) {
                this.eventTitleValid = false
                valid = false
            }

            if (this.date.length < 10) {
                this.dateValid = false
                valid = false
            }
            else {
                let month = ~~this.date.slice(0, 2)
                let day = ~~this.date.slice(3, 5)
                let year = ~~this.date.slice(6)
                if (month > 12 || day > 31 || (year > 2100 && year < 2000)) {
                    this.dateValid = false
                    valid = false
                }
            }
            
            if (this.endTime.length < 5) {
                this.endTimeValid = false
                valid = false
            }
            else {
                let hour = ~~this.endTime.slice(0, 2)
                let minu = ~~this.endTime.slice(3)
                if (hour > 23 || minu > 59) {
                    this.endTimeValid = false
                    valid = false
                }
            }

            if (this.startTime.length < 5) {
                this.startTimeValid = false
                valid = false
            }
            else {
                let hour = ~~this.startTime.slice(0, 2)
                let minu = ~~this.startTime.slice(3)
                if (hour > 23 || minu > 59) {
                    this.startTimeValid = false
                    valid = false
                }
            }

            return valid
        },
        async create() {
            this.submitable = false
            if (this.validation()) {     
                let payload = {
                    eventTitle: this.eventTitle,
                    date: this.date,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    limit: this.limit,
                    reserved: this.reserved,
                }
                const res = await $fetch(this.$config.public.api + '/create', {
                    method: 'POST',
                    body: payload,
                    headers: {
                        authorization: this.auth.token
                    }
                })

                if (res.success) {
                    navigateTo(`/event/${res.id}/dashboard`)
                }
                else {
                    this.alertStore.alert(res.error, res.friendly)
                    this.submitable = true
                }
            }
        },
        async edit() {
            this.submitable = false
            if (this.validation()) {     
                let payload = {
                    eventTitle: this.eventTitle,
                    date: this.date,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    limit: this.limit,
                    reserved: this.reserved,
                }
                const res = await $fetch(this.$config.public.api + `/event/${this.$route.params.eid}/edit`, {
                    method: 'POST',
                    body: payload,
                    headers: {
                        authorization: this.auth.token
                    }
                })

                if (res.success) {
                    navigateTo(`/event/${this.$route.params.eid}/dashboard`)
                }
                else {
                    this.alertStore.alert(res.error, res.friendly)
                    this.submitable = true
                }
            }
        },
        handler() {
            if (this.creating) {
                this.create()
            }
            else {
                this.edit()
            }
        }        
    }
}
</script>

<template>
<div class="content">
    <div v-if="creating">
        <img src="@/assets/calendar-plus.svg" class="header-icon"/>
        <h1>Create Event</h1>
    </div>
    <div v-else>
        <img src="@/assets/calendar-edit.svg" class="header-icon"/>
        <h1>Edit Event</h1>
    </div>
    <form @submit.prevent="handler" autocomplete="off">
        <TextField label="Event Title" placeholder="Amazing Matchup in a Great Sport" inputmode="default" :valid="eventTitleValid" v-model="eventTitle"></TextField>
        <DateField label="Date" :valid="dateValid" v-model="date"></DateField>
        <div class="double">
            <TimeField label="Start Time" :valid="startTimeValid" v-model="startTime"></TimeField>
            <TimeField label="End Time" :valid="endTimeValid" v-model="endTime"></TimeField>
        </div>
        <div class="double">
            <TextField label="Limit" placeholder="" inputmode="decimal" :valid="limitValid" v-model="limit"></TextField>
            <TextField label="Reserved" placeholder="" inputmode="decimal" :valid="reservedValid" v-model="reserved"></TextField>
        </div>
        <br>
        <StandardButton v-if="creating" type="submit" :disabled="!submitable">Create</StandardButton>
        <StandardButton v-else type="submit" :disabled="!submitable">Edit</StandardButton>
    </form>
</div>
</template>

<style scoped>
.content {
    text-align: center;
    max-width: 560px;
    margin: auto;
}

.double {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    gap: 15px;
}
</style>