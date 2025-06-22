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
      <div class="bg-white w-full flex items-stretch rounded-lg overflow-hidden">
        <div class="flex flex-col w-full h-full">
          <div class="bg-primary p-4">
            <div class="text-white font-semibold">{{ booking?.data?.schedule?.theater?.name }}</div>
          </div>
          <div class="flex flex-col gap-1 p-4 bg-white h-full">
            <div class="text-black font-semibold">{{ booking?.data?.schedule?.movie?.title }}</div>
            <div class="text-xs">MOVIE</div>
            <div class="text-black font-semibold">FIKRI FRI YANTO</div>
            <div class="text-xs">NAME</div>
            <div class="flex items-center gap-4">
              <div class="flex flex-col">
                <div class="text-black font-semibold">25 Juni 25</div>
                <div class="text-xs">DATE</div>
              </div>
              <div class="flex flex-col">
                <div class="text-black font-semibold">08:00</div>
                <div class="text-xs">TIME</div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="bg-default size-6 rounded-full absolute top-0 -mt-2"></div>
          <hr class="border-default" style="
          position: absolute;
          top: 0;
          left: 12px;
          right: 0;
          transform: translateX(-50%);
          border: none;
          border-left: 4px dashed;
          border-color: var(--ui-color-neutral-900);
          height: 100%;
          width: 0;
        "/>
          <div class="bg-default size-6 rounded-full absolute bottom-0 -mb-2"></div>
        </div>
        <div class="flex flex-col w-[90%] h-full">
          <div class="bg-primary p-4">
            <div class="text-white text-center font-semibold">TICKET</div>
          </div>
          <div class="flex flex-col items-center justify-center mt-4 p-4 bg-white h-full">
            <div class="text-black text-2xl font-semibold">{{ ticket?.seat?.seatNumber }}</div>
            <div class="text-base">SEAT</div>
            <NuxtImg class="mt-4" width="120" src="https://www.computalabel.com/Images/C128.png"/>
          </div>
        </div>
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