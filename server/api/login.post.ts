import {z} from 'zod'

const config = useRuntimeConfig()

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
    const {email, password} = await readValidatedBody(event, bodySchema.parse)

    try {
        const loginResponse = await $fetch<ApiResponse<LoginResponse>>(`${config.public.apiBase}/users/login`, {
            method: 'POST',
            body: {email, password}
        })

        const { token, tokenType, customer } = loginResponse.data

        await setUserSession(event, {
            user: customer,
            accessToken: `${tokenType} ${token}`,
        })
    } catch (error: any) {
        console.log(error)
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