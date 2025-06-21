<script setup lang="ts">
import BottomNavigation from "~/components/BottomNavigation.vue";

const config = useRuntimeConfig()

const banners = [
  'https://media.21cineplex.com/webcontent/gallery/pictures/174332714933197_925x527.jpg',
  'https://media.21cineplex.com/webcontent/gallery/pictures/174332714933197_925x527.jpg',
  'https://media.21cineplex.com/webcontent/gallery/pictures/174332714933197_925x527.jpg',
  'https://media.21cineplex.com/webcontent/gallery/pictures/174332714933197_925x527.jpg',
  'https://media.21cineplex.com/webcontent/gallery/pictures/174332714933197_925x527.jpg',
  'https://media.21cineplex.com/webcontent/gallery/pictures/174332714933197_925x527.jpg'
]

const {data} = await useFetch<ApiResponse<Pagination<Movie[]>>>(
    `${config.public.apiBase}/movies`
)

const movies = computed(() => data.value?.data?.content)
</script>

<template>
  <div class="flex items-center justify-between text-slate-200 my-4 px-4">
    <NuxtImg width="120" src="https://bioskuy.vercel.app/bioskuy!.png" alt="Bioskuy!"/>
    <UAvatar src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jameson" size="lg" alt="Fikri"/>
  </div>
  <div class="mb-11">
    <UCarousel
        v-slot="{ item }"
        class-names
        dots
        loop
        align="center"
        :items="banners"
        :ui="{
          item: 'basis-[70%] transition-opacity [&:not(.is-snapped)]:opacity-10'
        }"
        class="mx-auto"
    >
      <NuxtImg :src="item" width="320" height="320" class="rounded-lg"/>
    </UCarousel>
  </div>

  <div class="mb-36">
    <UCarousel
        v-slot="{ item }"
        class-names
        dots
        loop
        align="center"
        :items="movies"
        :ui="{
          item: 'basis-[70%] transition-opacity [&:not(.is-snapped)]:opacity-10'
        }"
        class="mx-auto"
    >
      <NuxtImg :src="item.image" width="320" height="320" class="rounded-lg"/>
      <div class="flex items-center justify-center gap-2">
        <Icon class="text-yellow-500" size="24" name="i-heroicons-solid-star"/>
        <h1 class="text-white text-center my-3">{{ item.title }}</h1>
      </div>
      <NuxtLink :to="`/movies/${item.id}`">
        <UButton icon="i-heroicons-ticket" size="xl" :block="true">Pesan</UButton>
      </NuxtLink>
    </UCarousel>
  </div>

  <BottomNavigation/>
</template>