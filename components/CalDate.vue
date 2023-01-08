<script>
export default {
    props: ['month', 'day']
}
</script>

<template>
    <div class="caldate">
        <div class="month">{{ month }}</div>
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
}
</style>