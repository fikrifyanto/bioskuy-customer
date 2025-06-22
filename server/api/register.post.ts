import {z} from 'zod'

const config = useRuntimeConfig()

const bodySchema = z.object({
    name: z.string().min(4),
    email: z.string().email('Email tidak sesuai'),
    password: z.string().min(8, 'Minimal 8 karakter')
})

export default defineEventHandler(async (event) => {
    const {name, email, password} = await readValidatedBody(event, bodySchema.parse)

    try {
        const loginResponse = await $fetch<ApiResponse<LoginResponse>>(`${config.public.apiBase}/users`, {
            method: 'POST',
            body: {name, email, password}
        })

        const {token, tokenType, customer} = loginResponse.data

        await setUserSession(event, {
            user: customer,
            accessToken: `${tokenType} ${token}`,
        })
    } catch (error: any) {
        if (error.data?.message && typeof error.response.status === 'number') {
            throw createError({statusCode: error.response.status, message: error.data.message})
        }

        throw createError({statusCode: 500, message: 'Terjadi kesalahan!'})
    }
})