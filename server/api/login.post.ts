const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event)

    console.log('Login:' + email + ' ' + password)
    const loginResponse = await $fetch<ApiResponse<LoginResponse>>(`${config.public.apiBase}/users/login`, {
        method: 'POST',
        body: {email, password},
        headers: {
            'Content-Type': 'application/json',
        }
    })

    await setUserSession(event, {
        user: loginResponse.data?.customer,
        accessToken: `${loginResponse.data?.tokenType} ${loginResponse.data?.token}`,
    })
})