import {defineStore} from "pinia";

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
        }
    }
})