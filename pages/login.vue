<script>
import { useAuthStore } from '~~/store/auth';
import { mapState } from 'pinia';
export default {
    setup() {
        const auth = useAuthStore()
        return {
            auth
        }
    },
    computed: {
        ...mapState(useAuthStore, ["isLoggedIn", "exp"])
    },
    watch: {
        isLoggedIn(newState, old) {
            if (newState) {
                navigateTo({path: '/'})
            }
        },
        exp(newState, old) {
            navigateTo({path: '/'})
        }
    }
}
</script>

<template>
    <div class="container">
        <div>
            <img src="@/assets/user.svg" class="section-header"/>
        </div>
        <Auth></Auth>
    </div>
    
</template>

<style scoped>
.container {
    width: 100%;
    max-width: 340px;
    margin: auto;
    /* border: 2px solid black; */
    border-radius: 15px;
    text-align: center;
    padding: 25px 0;
    font-weight: 800;
    font-size: 36px;
    margin-top: 35vh;
}

</style>