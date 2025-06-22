<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const {session} = useUserSession()

const bookingId = route.params.id

const {data: tickets} = await useFetch<ApiResponse<Ticket[]>>(
    `/tickets/booking/${bookingId}`,
    {
      baseURL: config.public.apiBase,
      headers: {
        'Authorization': session.value?.accessToken as string
      }
    }
)

const {data: booking} = await useFetch<ApiResponse<Booking>>(
    `/bookings/${bookingId}`,
    {
      baseURL: config.public.apiBase,
      headers: {
        'Authorization': session.value?.accessToken as string
      }
    }
)
</script>

<template>
  <div class="grid grid-cols-3 items-center text-slate-200 py-4 px-4 ring ring-default">
    <div @click="router.back()">
      <UButton icon="i-heroicons-arrow-left" size="xl"/>
    </div>
    <h1 class="text-center text-xl font-semibold">Tiket</h1>
    <div></div>
  </div>

  <div class="flex flex-col gap-4 p-4">
    <template v-for="ticket in tickets?.data">
      <div class="relative bg-white w-full flex flex-col rounded-xl overflow-hidden">
        <div class="grid grid-cols-3 items-center">
          <div class="bg-primary col-span-2 p-4">
            <div class="text-white font-semibold">{{ booking?.data?.schedule?.theater?.name }}</div>
          </div>
          <div class="bg-primary p-4">
            <div class="text-white text-center font-semibold">TICKET</div>
          </div>
          <div class="flex flex-col gap-1 p-4 bg-white h-full col-span-2">
            <div class="text-black font-semibold uppercase">{{ booking?.data?.schedule?.movie?.title }}</div>
            <div class="text-xs">MOVIE</div>
            <div class="flex items-center gap-4">
              <div class="flex flex-col">
                <div class="text-black font-semibold">{{ $dayjs(booking?.data?.schedule?.startTime).format('D MMMM YYYY') }}</div>
                <div class="text-xs">DATE</div>
              </div>
              <div class="flex flex-col">
                <div class="text-black font-semibold">{{ $dayjs(booking?.data?.schedule?.startTime).format('HH:mm') }}</div>
                <div class="text-xs">TIME</div>
              </div>
            </div>
            <div class="text-xs mt-4">{{ ticket?.ticketNumber }}</div>
          </div>
          <div class="flex flex-col items-center justify-center p-4 bg-white h-full">
            <div class="text-black text-2xl font-semibold">{{ ticket?.seat?.seatNumber }}</div>
            <div class="text-base">SEAT</div>
            <NuxtImg class="mt-4" width="120" src="https://www.computalabel.com/Images/C128.png"/>
          </div>
        </div>
        <div class="bg-default size-6 rounded-full absolute left-2/3 top-0 -mt-2"></div>
        <hr class="border-default" style="
          position: absolute;
          top: 0;
          left: calc(2/3 * 100% + 12px);
          right: 0;
          transform: translateX(-50%);
          border: none;
          border-left: 4px dashed;
          border-color: var(--ui-color-neutral-900);
          height: 100%;
          width: 0;
        "/>
        <div class="bg-default size-6 rounded-full absolute left-2/3 bottom-0 -mb-2"></div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.-mb-2 {
  margin-bottom: -12px;
}

.-mt-2 {
  margin-top: -12px;
}

.bg-white {
  background-color: #FFFFFF;
}

.text-black {
  color: #000000;
}
</style>