<script>
export default {
    props: {
        month: String,
        day: String,
        inverted: {
            type: Boolean,
            default: false
        },
        red: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isInverted() {
            return this.inverted
        }
    }
}
</script>

<template>
    <div class="caldate" :class="{red: red}">
        <div class="month" :class="{red: red}">{{ month }}</div>
        <div class="day">{{ day }}</div>
    </div>
</template>

<style scoped>
.caldate {
    border: 2px solid var(--vibrant-blue);
    width: 80px;
    aspect-ratio: 1 / 1;
    text-align: center;
    box-sizing: border-box;
    font-weight: 600;
    margin: auto;
    background-color: white;
}

.month {
    background-color: var(--vibrant-blue);
    color: white;
    font-size: 18px;
    padding: 2px 0;
    text-transform: uppercase;
}

.day {
    font-size: 38px;
    color: black;
}

.month.red {
    background-color: var(--vibrant-red);
}

.caldate.red {
    border-color: var(--vibrant-red);
}
</style>