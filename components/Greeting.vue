<script>
import { useAuthStore } from '~~/store/auth';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useAuthStore, ["nickname", "first_name"]),
        greeting() {
            return 'Hey'
        }
    },
    data() {
        return {
            dn: ''
        }
    },
    methods: {
        displayName() {
            if (this.nickname != null) {return this.nickname}
            return this.first_name
        },
    },
    mounted() {
        this.dn = this.displayName()
    }
}
</script>

<template>
    <div>
        <div class="greeting">{{ greeting }},</div>
        <div class="name">{{ dn }}</div>
    </div>
</template>

<style scoped>
.greeting {
    font-size: 24px;
    font-weight: 900;
}

.name {
    font-size: 40px;
    margin-top: -10px;
}


</style>