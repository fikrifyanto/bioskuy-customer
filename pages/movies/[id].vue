<script setup lang="ts">
useHead({
  title: 'Detail Film - Bioskuy!',
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const movieId = route.params.id

const {data: movieData} = await useFetch<ApiResponse<Movie>>(
    `${config.public.apiBase}/movies/${movieId}`
)

const movie = computed(() => movieData.value?.data)

const {data: theatersData} = await useFetch<ApiResponse<Theater[]>>(
    `${config.public.apiBase}/theaters/movie/${movieId}`
)

const theaters = computed(() => theatersData.value?.data)
</script>

<template>
  <div class="grid grid-cols-3 items-center text-slate-200 py-4 px-4 ring ring-default">
    <div @click="router.back()">
      <UButton icon="i-heroicons-arrow-left" size="xl"/>
    </div>
    <h1 class="text-center text-xl font-semibold">{{ movie?.title }}</h1>
    <div></div>
  </div>

  <div class="flex px-4 gap-4 mt-8">
    <NuxtImg class="rounded-md" height="150" width="100" :src="movie?.image"/>
    <div class="text-sm text-white">
      <div class="font-semibold text-base">{{ movie?.title }}</div>
      <div>Genre: {{ movie?.genre }}</div>
      <div>Durasi: {{ movie?.duration }} menit</div>
      <div class="flex items-center">
        Rating:
        <div class="flex items-center gap-1">
          <Icon class="text-yellow-500" size="20" name="i-heroicons-solid-star"/>
          <h1 class="text-white text-center">{{ movie?.rating }}</h1>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-4 px-4 mt-8">
    <UCard class="text-white" v-for="theater in theaters" :key="theater.id">
      <template #header>
        <h2 class="font-semibold">{{ theater.name }}</h2>
        <p class="text-sm text-muted">{{ theater.address }}</p>
      </template>

      <div class="flex flex-wrap gap-2">
        <template v-for="schedule in theater.schedules">
          <UButton :to="`/seats/${schedule.id}`" variant="soft" class="flex items-center gap-2">
            {{ $dayjs(schedule.startTime).format('DD MMMM YYYY') }}
            <UButton variant="outline">{{ $dayjs(schedule.startTime).format('HH:mm') }}</UButton>
          </UButton>
        </template>
      </div>
    </UCard>
  </div>
</template>

<style scoped>

</style>