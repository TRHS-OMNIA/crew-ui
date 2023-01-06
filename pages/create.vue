<script>
import { useAlertStore } from '~~/store/alert';
import { useAuthStore } from '~~/store/auth';
import { mapState } from 'pinia';
export default {
    setup() {
        const auth = useAuthStore()
        const alertStore = useAlertStore()
        return {
            auth: auth,
            alertStore: alertStore
        }
    },
    mounted() {
        if (!this.isAdmin) {
            this.alertStore.alert('Admins Only', "You don't have permission to create a new crew event.")
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
            eventTitle: '',
            date: '',
            startTime: '',
            endTime: '',
            limit: '10',
            reserved: '4',
        }
    }
}
</script>

<template>
<div class="content">
    <img src="@/assets/calendar-plus.svg" class="header-icon"/>
    <h1>Create Event</h1>
    <form>
        <TextField label="Event Title" placeholder="Amazing Matchup in a Great Sport" inputmode="default" :valid="true" v-model="eventTitle"></TextField>
        <DateField label="Date" :valid="true" v-model="date"></DateField>
        <div class="double">
            <TimeField label="Start Time" :valid="true" v-model="startTime"></TimeField>
            <TimeField label="End Time" :valid="true" v-model="endTime"></TimeField>
        </div>
        <div class="double">
            <TextField label="Limit" placeholder="" inputmode="decimal" :valid="true" v-model="limit"></TextField>
            <TextField label="Reserved" placeholder="" inputmode="decimal" :valid="true" v-model="reserved"></TextField>
        </div>
        <br>
        <StandardButton type="submit">Create</StandardButton>
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