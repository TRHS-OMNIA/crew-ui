<script>
import TextField from '@/components/TextField.vue';

export default {
    props: ["label", "modelValue"],
    emits: ["update:modelValue"],
    components: { TextField },
    data() {
        return {
            v: '',
            valid: true
        }
    },
    watch: {
        v: {
            handler(newValue) {
                let rawNumbers = newValue.replace(/[^0-9]/g, '')
                let parsed = rawNumbers
                if (rawNumbers.length > 8) {
                    parsed = rawNumbers.slice(0, 8)
                    rawNumbers = parsed
                }
                if (rawNumbers.length > 4) {
                    parsed = `${rawNumbers.slice(0, 2)}/${rawNumbers.slice(2, 4)}/${rawNumbers.slice(4)}`
                }
                else if (rawNumbers.length > 2) {
                    parsed = `${rawNumbers.slice(0, 2)}/${rawNumbers.slice(2)}`
                }
                this.$emit('update:modelValue', parsed)
                this.v = parsed
            },
            immediate: true,
            flush: 'post'
        },
        modelValue(newValue, old) {
            this.v = this.modelValue
        }
    }
}
</script>

<template>
    <div>
        <TextField :label="label" placeholder="MM/DD/YYYY" inputmode="decimal" :valid="valid" v-model="v" center></TextField>
    </div>
</template>