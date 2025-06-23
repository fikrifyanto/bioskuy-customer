<script setup lang="ts">
useHead({
  title: 'Tiket - Bioskuy!',
})

const config = useRuntimeConfig()
const {session} = useUserSession()

const {data} = await useFetch<ApiResponse<Booking[]>>(
    `/bookings`,
    {
      baseURL: config.public.apiBase,
      headers: {
        'Authorization': session.value?.accessToken as string
      }
    }
)

const bookings = computed(() => data.value?.data)
</script>

<template>
  <div class="grid grid-cols-3 items-center text-slate-200 py-4 px-4 ring ring-default">
    <div></div>
    <h1 class="text-center text-xl font-semibold">Tiket</h1>
    <div></div>
  </div>

  <template v-if="bookings?.length">
    <div class="flex flex-col gap-4 p-4">
      <UCard v-for="booking in bookings">
        <NuxtLink :to="`/tickets/${booking.id}`" class="flex gap-4">
          <NuxtImg class="rounded-md" height="100" width="50" :src="booking?.schedule?.movie?.image"/>
          <div class="text-sm text-white">
            <div class="font-semibold text-base">{{ booking?.schedule?.movie?.title }}</div>
            <div class="text-xs text-dimmed">
              <Icon name="i-heroicons-solid-map-pin"/>
              {{ booking?.schedule?.theater?.name }}
            </div>
            <div class="text-xs text-dimmed">
              <Icon name="i-heroicons-solid-ticket"/>
              Ticket ({{ booking?.bookingSeats?.length }})
            </div>
            <div class="text-xs text-dimmed">{{
                $dayjs(booking?.schedule?.startTime).format('dddd, D MMMM YYYY HH:mm')
              }}
            </div>
          </div>
        </NuxtLink>
      </UCard>
    </div>
  </template>
  <template v-else>
    <div class="h-screen flex items-center justify-center text-center inset-0">
      Belum ada ticket.
    </div>
  </template>

  <BottomNavigation/>
</template>

<style scoped>

</style>