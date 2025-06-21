<script setup lang="ts">

</script>

<template>
  <UCard variant="subtle" class="fixed bottom-0 max-w-md max-h-24 mt-20 w-full rounded-b-none">
    <div
        class="grid grid-cols-3 items-center py-2">
      <button class="flex flex-col justify-center items-center text-primary text-xs text-center gap-0.5">
        <Icon size="24" name="i-heroicons-solid-home"/>
        Beranda
      </button>
      <button class="flex flex-col justify-center items-center text-slate-200 text-xs text-center gap-0.5">
        <Icon size="24" name="i-heroicons-solid-magnifying-glass"/>
        Cari
      </button>
      <button class="flex flex-col justify-center items-center text-slate-200 text-xs text-center gap-0.5">
        <Icon size="24" name="i-heroicons-ticket"/>
        Tiket
      </button>
    </div>
  </UCard>
</template>

<style scoped>

</style>