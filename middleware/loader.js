import { useLoaderStore } from "~~/store/loader";

export default defineNuxtRouteMiddleware(() => {
    const loader = useLoaderStore()
    loader.start()
})