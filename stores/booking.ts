import {defineStore} from "pinia";

const config = useRuntimeConfig()
const toast = useToast()
const {session} = useUserSession()

export const useBooking = defineStore('booking', {
    state: () => {
        return {
            loading: false,
            scheduleId: null as string | null,
            seatIds: [] as number[],
        }
    },
    actions: {
        createBooking() {
            this.loading = true

            $fetch(`${config.public.apiBase}/bookings`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${session.value?.accessToken}`
                },
                method: 'POST',
                body: {
                    scheduleId: this.scheduleId,
                    seatIds: this.seatIds
                }
            }).then(async (response: any) => {
                this.scheduleId = null
                this.seatIds = []

                await navigateTo(response?.data?.payment?.redirectUrl, { external: true })

                toast.add({title: 'Success', description: 'Berhasil membuat transaksi!', color: 'primary'})
            }).catch((error: any) => {
                if (error?.data?.message) {
                    toast.add({title: 'Gagal', description: error?.data?.message, color: 'error'})
                } else {
                    toast.add({title: 'Gagal', description: 'Terjadi kesalahan!', color: 'error'})
                }
            }).finally(() => {
                this.loading = false
            })
        }
    },
    persist: true
})