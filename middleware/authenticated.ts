export default defineNuxtRouteMiddleware((to) => {
    const { loggedIn } = useUserSession()

    if (!loggedIn.value) {
        return navigateTo(`/login?redirect=${to.fullPath}`);
    }
})