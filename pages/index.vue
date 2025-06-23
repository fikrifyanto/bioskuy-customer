<script setup lang="ts">
import BottomNavigation from "~/components/BottomNavigation.vue";
import type {DropdownMenuItem} from '@nuxt/ui'

useHead({
  title: 'Beranda - Bioskuy!',
})

const config = useRuntimeConfig()
const {loggedIn, clear} = useUserSession();

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

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profile',
    icon: 'i-lucide-user',
    to: '/profile',
  },
  {
    label: 'Logout',
    icon: 'i-heroicons-arrow-left-start-on-rectangle',
    onSelect: () => {
      logout();
    },
  }
])

function logout() {
  clear();
  navigateTo('/login');
}
</script>

<template>
  <div class="flex items-center justify-between text-slate-200 my-4 px-4">
    <NuxtImg width="120" src="https://bioskuy.vercel.app/bioskuy!.png" alt="Bioskuy!"/>
    <div>
      <NuxtLink v-if="!loggedIn" to="/login" class="text-primary font-semibold">Login</NuxtLink>
      <UDropdownMenu
          v-else
          :items="items"
          :content="{
            align: 'end',
            side: 'bottom',
            sideOffset: 8
           }"
          :ui="{
            content: 'w-48'
          }"
      >
        <UAvatar src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jameson" size="lg" alt="Fikri"/>
      </UDropdownMenu>
    </div>
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
        <div class="flex items-center text-white">
          <Icon class="text-yellow-500" size="24" name="i-heroicons-solid-star"/>
          {{ item.rating }}
        </div>
        |
        <h1 class="text-white text-center font-semibold my-3">{{ item.title }}</h1>
      </div>
      <NuxtLink :to="`/movies/${item.id}`">
        <UButton icon="i-heroicons-ticket" size="xl" :block="true">Pesan</UButton>
      </NuxtLink>
    </UCarousel>
  </div>

  <BottomNavigation/>
</template>