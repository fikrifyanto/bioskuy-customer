<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <UCard variant="subtle" class="fixed bottom-0 max-w-md max-h-24 mt-20 w-full rounded-b-none">
    <div
        class="grid grid-cols-3 items-center py-2">
      <NuxtLink
          to="/"
          :class="{'text-primary': route.path == '/', 'text-slate-200': route.path != '/'}"
          class="flex flex-col justify-center items-center text-xs text-center gap-0.5"
      >
        <Icon v-show="route.path == '/'" size="24" name="i-heroicons-solid-home"/>
        <Icon v-show="route.path != '/'" size="24" name="i-heroicons-home"/>
        Beranda
      </NuxtLink>
      <NuxtLink
          to="/search"
          :class="{'text-primary': route.path == '/search', 'text-slate-200': route.path != '/search'}"
          class="flex flex-col justify-center items-center text-xs text-center gap-0.5"
      >
        <Icon v-show="route.path == '/search'" size="24" name="i-heroicons-solid-magnifying-glass"/>
        <Icon v-show="route.path != '/search'" size="24" name="i-heroicons-magnifying-glass"/>
        Cari
      </NuxtLink>
      <NuxtLink
          to="/tickets"
          :class="{'text-primary': route.path == '/tickets', 'text-slate-200': route.path != '/tickets'}"
          class="flex flex-col justify-center items-center text-xs text-center gap-0.5"
      >
        <Icon v-show="route.path == '/tickets'" size="24" name="i-heroicons-solid-ticket"/>
        <Icon v-show="route.path != '/tickets'" size="24" name="i-heroicons-ticket"/>
        Tiket
      </NuxtLink>
    </div>
  </UCard>
</template>

<style scoped>

</style>