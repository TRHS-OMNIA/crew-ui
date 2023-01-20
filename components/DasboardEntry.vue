<script>
export default {
    props: {
        entry: {
            default: {
                check_in: null,
                check_out: null,
                class: "",
                eid: "",
                first_name: "",
                grade: 0,
                id: "",
                last_name: "",
                nickname: null,
                period: 0,
                position: null,
                private_note: null,
                uid: "",
                user_note: null
            }
        },
        authToken: String,
        index: Number
    },
    emits: ['edited'],
    data() {
        return {
            e: {
                check_in: null,
                check_out: null,
                class: "",
                eid: "",
                first_name: "",
                grade: 0,
                id: "",
                last_name: "",
                nickname: null,
                period: 0,
                position: null,
                private_note: null,
                uid: "",
                user_note: null
            },
            displayName: '',
            buttonPending: false,
            editing: false,
            vis: true
        }
    },
    mounted() {
        this.e = this.entry
        if (this.e.nickname) {
            this.displayName = `${this.e.nickname} ${this.e.last_name}`
        }
        else {
            this.displayName = `${this.e.first_name} ${this.e.last_name}`
        }
    },
    watch: {
        e: {
            handler(n, o) {
                this.e = n
                if (this.e.nickname) {
                    this.displayName = `${this.e.nickname} ${this.e.last_name}`
                }
                else {
                    this.displayName = `${this.e.first_name} ${this.e.last_name}`
                }
            },
            deep: true
        }
    },
    computed: {
        courseName() {
            if (this.e.class == 'media') { return 'Media Concepts'}
            if (this.e.class == 'sports') { return 'Sports Broadcasting'}
            if (this.e.class == 'broadcast1') { return 'Broadcast Journalism I'}
            if (this.e.class == 'broadcast2') { return 'Broadcast Journalism II'}
            if (this.e.class == 'admin') { return 'Admin'}
            return null
        },
        checkinButton() {
            if (this.e.check_in == null) {
                return 'Check In'
            }
            if (this.e.check_out == null) {
                return 'Check Out'
            }
            return 'Checked Out'
        },
        checkinButtonDisabled() {
            if (this.e.check_in != null && this.e.check_out != null) {return true}
            return this.buttonPending
        },
        checkinout() {
            if (this.e.check_in == null) {
                return ''
            }
            if (this.e.check_out == null) {
                return prettyTime(this.e.check_in)
            }
            return `${prettyTime(this.e.check_in)} - ${prettyTime(this.e.check_out)}`
        }
    },
    methods: {
        async ButtonHandler() {
            if (this.e.check_in == null) {
                this.buttonPending = true
                const i = await this.CheckIn()
                this.buttonPending = false
                return
            }
            if (this.e.check_out == null) {
                this.buttonPending = true
                const o = await this.CheckOut()
                this.buttonPending = false
                return
            }
            
        },
        async CheckIn() {
            const res = await $fetch(this.$config.public.api + '/event/' + this.e.eid + '/user/' + this.e.uid + '/checkin', {
                method: 'GET',
                headers: {
                    authorization: this.authToken
                }
            })
            if (res.success) {
                this.e.check_in = res.check_in
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        },
        async CheckOut() {
            const res = await $fetch(this.$config.public.api + '/event/' + this.e.eid + '/user/' + this.e.uid + '/checkout', {
                method: 'GET',
                headers: {
                    authorization: this.authToken
                }
            })
            if (res.success) {
                this.e.check_out = res.check_out
            }
            else {
                this.alertStore.alert(res.error, res.friendly)
            }
        },
        edited(edits) {
            this.e.check_in = edits.check_in
            this.e.check_out = edits.check_out
            this.e.position = edits.position
            this.e.private_note = edits.private_note
            this.editing = false
            this.$emit('edited', this.index, this.e)
        },
        removed() {
            this.editing = false
            this.vis = false
        }
    }
}
</script>

<template>
    <div class="entry" v-if="vis">
        
        <div class="name">{{ displayName }}</div>
        <div class="tags">
            <div class="tag" v-show="courseName != null" :class="[e.class]"><span v-if="e.class != 'admin'">{{ e.period }} -</span> {{ courseName }}</div>
            <div class="tag" v-show="e.grade >= 9">{{ e.grade }}th Grade</div>
        </div>
        <div class="line-item">
            <span class="emphasis">Role: </span>
            <span v-if="e.position">{{ e.position }}</span>
            <span v-else class="blank">Not yet assigned</span>
        </div>
        <div class="line-item">
            <span class="emphasis">Private Note: </span>
            <span v-if="e.private_note">{{ e.private_note }}</span>
            <span v-else class="blank">Nothing yet</span>
        </div>
        <div class="line-item">
            <span class="emphasis">Checked In/Out: </span>
            <span v-if="e.check_in">{{ checkinout }}</span>
            <span v-else class="blank">Not checked in</span>
        </div>
        <div class="action-row">
            <StandardButton :disabled="checkinButtonDisabled" @clacked="ButtonHandler" :green="checkinButton == 'Check Out'">{{ checkinButton }}</StandardButton>
            <IconButton @clacked="editing = true"><img src="@/assets/edit-pencil.svg" /></IconButton>
        </div>

        <DashboardEntryEdit :entry="e" :auth-token="authToken" :display-name="displayName" v-if="editing" @done="editing = false" @edited="edited" @removed="removed"></DashboardEntryEdit>

    </div>
</template>

<style scoped>

.entry {
    margin: 32px 0;
}
.action-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 5px;
    align-items: center;
}
.line-item {
    font-size: 17px;
}

span.emphasis {
    font-weight: 600;
}

span.blank {
    font-style: italic;
    color: var(--dark-grey);
}
.name {
    font-size: 24px;
    font-weight: 600;
}

.tag {
    border: 1px solid;
    border-radius: 10px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 500;
}

.tag.media {
    background-color: var(--vibrant-green);
    border-color: var(--vibrant-green);
}
.tag.sports {
    background-color: var(--vibrant-orange);
    border-color: var(--vibrant-orange);
}
.tag.broadcast1 {
    background-color: var(--vibrant-pink);
    border-color: var(--vibrant-pink);
}
.tag.broadcast2 {
    background-color: var(--vibrant-blue);
    border-color: var(--vibrant-blue);
    color: white;
}
.tag.admin {
    background-color: var(--vibrant-red);
    border-color: var(--vibrant-red);
    color: white;
}

.tags {
    display: flex;
    gap: 5px;
}
</style>