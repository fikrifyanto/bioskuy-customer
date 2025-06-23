<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})

useHead({
  title: 'Pilih Kursi - Bioskuy!',
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const booking = useBooking()

const scheduleId = computed(() => route.params.id)

const {data: seatData} = await useFetch<ApiResponse<Seat[]>>(
    `${config.public.apiBase}/seats/schedule/${scheduleId.value}`
)

const seats = computed(() => seatData.value?.data || [])

const halfSeats = computed(() => Math.floor(seats.value.length / 2))

const leftSeats = computed(() => seats.value.slice(0, halfSeats.value))
const rightSeats = computed(() => seats.value.slice(halfSeats.value))

function toggleSeat(seatId: number) {
  if (booking.seatIds.includes(seatId)) {
    booking.seatIds = booking.seatIds.filter(id => id !== seatId)
    return
  }
  booking.seatIds.push(seatId)
}

function isSeatActive(seatId: number) {
  return booking.seatIds.includes(seatId)
}

onMounted(() => {
  booking.seatIds = []
  booking.scheduleId = scheduleId.value as string
})
</script>

<template>
  <div class="grid grid-cols-3 items-center text-slate-200 py-4 px-4 ring ring-default">
    <div @click="router.back()">
      <UButton icon="i-heroicons-arrow-left" size="xl"/>
    </div>
    <h1 class="text-center text-xl font-semibold">Pilih Kursi</h1>
    <div></div>
  </div>

  <div class="flex flex-col gap-4 px-4 mt-8">
    <UCard class="h-20 flex items-center justify-center">
      <div class="text-center text-primary">Layar</div>
    </UCard>
    <UCard>
      <div class="grid grid-cols-2 overflow-scroll gap-80">
        <div class="w-[calc(48px*6)] text-sm text-center grid grid-cols-6 gap-2">
          <template v-for="seat in leftSeats" :key="seat.id">
            <UButton
                :active="isSeatActive(seat.id)"
                @click="toggleSeat(seat.id)"
                active-variant="solid"
                :variant="seat.status == 'RESERVED' ? 'soft' : 'outline'"
                :color="seat.status == 'RESERVED' ? 'warning' : 'primary'"
                class="size-10"
                :disabled="seat.status == 'RESERVED'"
            >
              {{ seat.seatNumber }}
            </UButton>
          </template>
        </div>
        <div class="w-[calc(48px*6)] text-sm text-center grid grid-cols-6 gap-2">
          <template v-for="seat in rightSeats" :key="seat.id">
            <UButton
                :active="isSeatActive(seat.id)"
                @click="toggleSeat(seat.id)"
                active-variant="solid"
                :variant="seat.status == 'RESERVED' ? 'solid' : 'outline'"
                class="size-10"
                :disabled="seat.status == 'RESERVED'"
            >
              {{ seat.seatNumber }}
            </UButton>
          </template>
        </div>
      </div>
    </UCard>
  </div>

  <UCard variant="subtle" class="fixed bottom-0 max-w-md max-h-24 w-full rounded-b-none">
    <UButton
        :disabled="!booking.scheduleId || !booking.seatIds"
        :loading="booking.loading"
        @click="booking.createBooking()" size="xl" block
    >
      Bayar
    </UButton>
  </UCard>
</template>

<style scoped>

</style>