// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            api: 'https://crew-api.omnia.productions/',
            googleClientId: '10884935719-fohtscfvv4cu14cmsp4g1o8j7atgsjs4.apps.googleusercontent.com',
            roles: ['Camera Operator', 'Producer', 'Director', 'Technical Director', 'Replay', 'Graphics', 'Shader', 'Audio', 'Announcer', 'Production Assistant', 'Shoulder Camera', 'Marketing']
        }
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],
    ssr: false
})

// export default defineNuxtConfig({
//     runtimeConfig: {
//         public: {
//             api: 'http://localhost:5000',
//             googleClientId: '10884935719-dt2ql5h8rr3nqfgsqg5tjpi35ktl2uvh.apps.googleusercontent.com',
//             roles: ['Camera Operator', 'Producer', 'Director', 'Technical Director', 'Replay', 'Graphics', 'Shader', 'Audio', 'Announcer', 'Production Assistant', 'Shoulder Camera']
//         }
//     },
//     modules: [
//         '@pinia/nuxt',
//         '@pinia-plugin-persistedstate/nuxt',
//     ],
//     ssr: false
// })