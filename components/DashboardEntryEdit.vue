<script>
import { useAlertStore } from '~~/store/alert'

export default {
    setup() {
        const alertStore = useAlertStore()
        return {
            alertStore
        }
    },
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
        displayName: String,
    },
    emits: ['done', 'edited'],
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
                position: '',
                private_note: '',
                uid: "",
                user_note: null
            },
            buttonPending: false,
            roles: ['Camera Operator', 'Producer', 'Director', 'Technical Director', 'Replay', 'Graphics', 'Shader', 'Audio', 'Announcer', 'Production Assistant', 'Shoulder Camera'],
            c_in: '',
            c_out: '',
            i_valid: true,
            o_valid: true,
            s_disabled: false
        }
    },
    mounted() {
        this.e = Object.assign({}, this.entry)
        if (this.e.position == null) {
            this.e.position = ''
        }
        if (this.e.private_note == null) {
            this.e.private_note = ''
        }
        if (this.e.check_in != null) {
            this.c_in = prettyMilitaryTime(this.e.check_in)
        }
        if (this.e.check_out != null) {
            this.c_out = prettyMilitaryTime(this.e.check_out)
        }
    },
    methods: {
        quickRole(newRole) {
            if (this.e.position != '') {
                this.e.position += `/${newRole}`
                return
            }
            this.e.position += newRole
        },
        validate() {
            let valid = true
            if (this.c_in.length < 5 && this.c_in.length > 0) {
                this.i_valid = false
                valid = false
            }
            else {
                let hour = ~~this.c_in.slice(0, 2)
                let minu = ~~this.c_in.slice(3)
                if (hour > 23 || minu > 59) {
                    this.i_valid = false
                    valid = false
                }
            }

            if (this.c_out.length < 5 && this.c_out.length > 0) {
                this.o_valid = false
                valid = false
            }
            else {
                let hour = ~~this.c_out.slice(0, 2)
                let minu = ~~this.c_out.slice(3)
                if (hour > 23 || minu > 59) {
                    this.o_valid = false
                    valid = false
                }
            }
            return valid
        },
        async updateEntry() {
            if (this.validate()) {
                this.s_disabled = true
                let payload = {
                    check_in: this.c_in,
                    check_out: this.c_out,
                    private_note: this.e.private_note,
                    role: this.e.position
                }

                if (this.c_in == '') {
                    payload.check_in = null
                }

                if (this.c_out == '') {
                    payload.check_out = null
                }

                if (this.e.private_note == '') {
                    payload.private_note = null
                }

                if (this.e.position == '') {
                    payload.position = null
                }

                

                const res = await $fetch(this.$config.public.api + '/event/' + this.e.eid + '/user/' + this.e.uid, {
                    method: 'POST',
                    body: payload,
                    headers: {
                        authorization: this.authToken
                    }
                })
                if (res.success) {
                    this.$emit('edited', res.edits)
                }
                else {
                    this.$emit('done')
                    this.alertStore.alert(res.error, res.friendly)
                }
            }
        }
    },
    watch: {
        c_in(n, o) {
            this.i_valid = true
        },
        c_out(n, o) {
            this.o_valid = true
        }
    }
}
</script>

<template>
    <div>
        <div class="modal">
            <div class="frontline">
                <div>{{ displayName }}</div>
            </div>
            <form autocomplete="off" @submit.prevent="updateEntry">
                <TextField label="Role" inputmode="default" v-model="e.position" :valid="true"></TextField>
                <div class="quickRoles">
                    <span class="emphasis">Quick Add Roles:</span>
                    <QuickRoles v-for="role in roles" :role="role" @quickRole="quickRole"></QuickRoles>
                </div>
                <TextArea label="Private Note" inputmode="default" v-model="e.private_note" :valid="true"></TextArea>
                <div class="double">
                    <TimeField label="Check In" v-model="c_in" :valid="i_valid"></TimeField>
                    <TimeField label="Check Out" v-model="c_out" :valid="o_valid"></TimeField>
                </div><br>
                <StandardButton type="submit" :disabled="s_disabled">Update</StandardButton>
            </form>
        </div>
        <div class="blackout" @click.self="$emit('done')">
        </div>
    </div>
    
</template>

<style scoped>
.blackout {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(1, 1, 1, 0.5);
    z-index: 101;
}

.modal {
    background-color: white;
    padding: 15px;
    border-radius: 15px;
    width: calc(100% - 30px);
    max-width: 540px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 102;
    box-sizing: border-box;
    max-height: calc(100% - 30px);
    overflow: auto;
}

/* .head-spacer {
    height: 55px;
    width: 100%;
} */

.double {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}

.frontline {
    font-size: 20px;
    font-weight: 600;
    border-bottom: 2px solid black;
}

span.emphasis {
    font-weight: 600;
}

.quickRoles {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    gap: 4px;
}
</style>