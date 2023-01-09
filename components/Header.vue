<template>
    <div class="header">
        <img src="@/assets/white-logo.png" @click="navigateTo('/')"/>
        <div>Crew Calendar</div>
        <div>
            <slot />
        </div>
    </div>
    <div class="spacer"></div>
</template>

<style scoped>
.header {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 15px;
    text-align: left;
    background-color: var(--black);
    color: var(--white);
    font-size: 20px;
    font-weight: 500;
    padding: 15px;
    z-index: 101;
}

.header > img {
    height: 30px;
    /* padding: 15px; */
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
}

.spacer {
    margin-bottom: 70px;
}

</style>