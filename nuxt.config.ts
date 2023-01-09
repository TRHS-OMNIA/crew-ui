// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            api: 'https://api.crew.omnia.trhs.link',
            googleClientId: '10884935719-fohtscfvv4cu14cmsp4g1o8j7atgsjs4.apps.googleusercontent.com'
        }
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],
    ssr: false
})
