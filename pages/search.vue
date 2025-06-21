<script setup lang="ts">
const config = useRuntimeConfig()
const toast = useToast()

const keyword = ref('')
const results = ref<Movie[]>([])
const isLoading = ref(false)

watch(keyword, async (newKeyword) => {
  if (!newKeyword) {
    results.value = []
    return
  }

  isLoading.value = true

  await $fetch<ApiResponse<Pagination<Movie[]>>>(`/movies`, {
    baseURL: config.public.apiBase,
    query: {
      title: newKeyword
    },
  }).then((data) => {
    results.value = data?.data?.content
  }).catch((error) => {
    toast.add({title: 'Terjadi kesalahan!', description: error?.data?.message, color: 'error'})
  }).finally(() => {
    isLoading.value = false
  })
})
</script>

<template>
  <div class="p-4">
    <UInput
        autofocus
        size="xl"
        placeholder="Cari film..."
        class="w-full"
        v-model="keyword"
    />
  </div>

  <div class="p-4">
    <div class="text-center" v-if="isLoading">Memuat...</div>
    <div class="text-center" v-else-if="results.length === 0 && keyword">Tidak ditemukan.</div>
    <ul class="flex flex-col gap-4 divide-y divide-default" v-else>
      <li v-for="(movie, index) in results" :key="index">
        <NuxtLink :to="`/movies/${movie.id}`" class="flex px-4 gap-4 pb-4">
          <NuxtImg class="rounded-md" height="100" width="50" :src="movie?.image"/>
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
        </NuxtLink>
      </li>
    </ul>
  </div>

  <BottomNavigation/>
</template>