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
        displayName: String,
    },
    emits: ['done'],
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
            roles: ['Camera Operator', 'Producer', 'Director', 'Technical Director', 'Replay', 'Graphics', 'Shader', 'Audio', 'Production Assistant'],
            c_in: '',
            c_out: '',
            i_valid: true,
            o_valid: true
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

            }
        }
    },
    watch: {
        c_in(n, o) {
            this.i_valid = true
        },
        c_out(n, o) {
            this.o_valid = false
        }
    }
}
</script>

<template>
    <div class="blackout" @click.self="$emit('done')">
        <div class="modal">
            <div class="frontline">
                <div>{{ displayName }}</div>
            </div>
            <form autocomplete="off">
                <TextField label="Role" inputmode="default" v-model="e.position" :valid="true"></TextField>
                <div class="quickRoles">
                    <span class="emphasis">Quick Add Roles:</span>
                    <QuickRoles v-for="role in roles" :role="role" @quickRole="quickRole"></QuickRoles>
                </div>
                <TextArea label="Private Note" inputmode="default" v-model="e.private_note" :valid="true"></TextArea>
                <div class="double">
                    <TimeField label="Check In" v-model="c_in"></TimeField>
                    <TimeField label="Check Out" v-model="c_out"></TimeField>
                </div><br>
                <StandardButton type="submit">Update</StandardButton>
            </form>
        </div>
    </div>
</template>

<style scoped>
.blackout {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    display: flex;
    background-color: rgba(1, 1, 1, 0.5);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.modal {
    background-color: white;
    padding: 15px;
    border-radius: 15px;
    width: 100%;
    max-width: 540px;
    margin: 15px;
}

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