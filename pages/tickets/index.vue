<script setup lang="ts">
const config = useRuntimeConfig()
const {session} = useUserSession()

const {data} = await useFetch<ApiResponse<Pagination<Booking[]>>>(
    `/bookings`,
    {
      baseURL: config.public.apiBase,
      headers: {
        Authorization: session.value?.accessToken
      }
    }
)

const bookings = computed(() => data.value?.data)
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <UCard v-for="booking in bookings">
      <div class="flex gap-4">
        <NuxtImg class="rounded-md" height="100" width="50" :src="booking?.schedule?.movie?.image"/>
        <div class="text-sm text-white">
          <div class="font-semibold text-base">{{ booking?.schedule?.movie?.title }}</div>
          <div class="text-xs text-dimmed"><Icon name="i-heroicons-solid-map-pin"/> {{ booking?.schedule?.theater?.name }}</div>
          <div class="text-xs text-dimmed"><Icon name="i-heroicons-solid-ticket"/> Ticket ({{ booking?.bookingSeats?.length }})</div>
          <div class="text-xs text-dimmed">{{ $dayjs(booking?.schedule?.startTime).format('dddd, D MMMM YYYY HH:mm') }}</div>
        </div>
      </div>
    </UCard>
  </div>

  <BottomNavigation/>
</template>

<style scoped>

</style>