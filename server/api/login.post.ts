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

    const {token, tokenType, customer} = loginResponse.data

    await setUserSession(event, {
        user: customer,
        accessToken: `${tokenType} ${token}`,
    })
})