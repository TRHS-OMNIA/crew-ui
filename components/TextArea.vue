<script>
export default {
    // props: ["label", "placeholder", "inputmode", "valid", "modelValue"],
    props: {
        label: String,
        placeholder: String,
        inputmode: String,
        valid: Boolean,
        modelValue: String,
        center: Boolean
    },
    emits: ['update:modelValue'],
    data() {
        return {
            focus: false
        }
    },
    computed: {
        isBlank() {
            let blank = this.modelValue.length == 0
            if (this.focus) {return false}
            return blank
        }
    }
}

</script>

<template>
    <div>
        <label>
            <div class="label" :class="{'blank': isBlank, 'invalid': !valid, 'center': center}">{{ label }}</div> 
            <textarea :class ="{'invalid': !valid, 'center': center}" :placeholder="placeholder" :inputmode="inputmode" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @focusin="focus = true" @focusout="focus = false"/>
        </label>
    </div>
</template>

<style scoped>
div{
    width: 100%;
    margin: 2px 0;
}

textarea {
    width: 100%;
    font-size: 20px;
    box-sizing: border-box;
    border: 2px solid black;
    padding: 8px;
    border-radius: 8px;
    font-family: 'Outfit';
    height: 85px;
    resize: none;
}

input.center {
    text-align: center;
}

input.invalid {
    border-color: var(--vibrant-red);
}

input:focus::placeholder {
    font-weight: 300;
    opacity: 1;
}

input::placeholder {
    opacity: 0;
    transition: opacity 0.6s;
}

div.label {
    text-align: left;
    font-weight: 600;
    font-size: 15px;
    padding-left: 8px;
    transform: scale(1) translateY(0);
    transform-origin: center left;
    transition: transform 0.6s;
    width: fit-content;
    margin: auto;
    margin-left: 0;
    
}

div.label.invalid {
    color: var(--vibrant-red);
}

div.label.blank{
    transform: scale(1.33)translateY(25px);
}

div.label.center {
    text-align: center;
    margin-left: auto;
    padding-left: 0;
    transform-origin: center center;
}
</style>