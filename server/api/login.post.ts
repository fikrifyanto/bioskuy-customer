const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event)

    try {
        const loginResponse = await $fetch<ApiResponse<LoginResponse>>(`${config.public.apiBase}/users/login`, {
            method: 'POST',
            body: {email, password},
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const { token, tokenType, customer } = loginResponse.data

        await setUserSession(event, {
            user: customer,
            accessToken: `${tokenType} ${token}`,
        })
    } catch (error: any) {
        console.log('Login error:' + error)
        console.log('Login error credential:' + email + ' ' + password)
        if (error.response && typeof error.response.status === 'number') {
            if (error.response.status === 401) {
                throw createError({statusCode: 401, message: 'Username atau password salah.'})
            }

            throw createError({
                statusCode: error.response.status,
                message: error.response.statusText || 'Terjadi kesalahan!'
            })
        }
        throw createError({statusCode: 500, message: 'Terjadi kesalahan!'})
    }
})