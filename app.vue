<template>
  <NuxtLoadingIndicator color="#BB2827" />

  <NuxtLayout>
    <UApp :toaster="{ position: 'bottom-center' }">
      <div class="max-w-md mx-auto">
        <NuxtPage/>
      </div>
    </UApp>
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>