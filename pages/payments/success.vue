<script setup lang="ts">
const route = useRoute()

const orderId = route.query.order_d as string

const count = ref(6)

function timer() {
  if (count.value > 0) {
    count.value--
    setTimeout(timer, 1000)
  } else {
    navigateTo(`/tickets/${orderId}`)
  }
}

onMounted(() => timer())
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <Icon size="64" class="text-success" name="i-heroicons-solid-check-circle"/>
    <h1 class="font-semibold text-2xl text-white">Pembayaran Berhasil!</h1>
    <p>Tiket anda akan segera tersedia.</p>
    <p v-if="count > 0" class="mt-4 text-sm">Dialihkan otomatis dalam {{ count }} detik...</p>
    <UButton :to="`/tickets/${orderId}`" v-else class="mt-4">Lihat Tiket</UButton>
  </div>
</template>

<style scoped>

</style>