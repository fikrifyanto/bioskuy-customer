<script setup lang="ts">
import * as z from 'zod'

useHead({
  title: 'Login - Bioskuy!',
})

const route = useRoute()
const toast = useToast()
const {fetch: refreshSession} = useUserSession()

const schema = z.object({
  email: z.string().email('Email tidak sesuai'),
  password: z.string().min(8, 'Minimal 8 karakter')
})

type Schema = z.output<typeof schema>

const credentials = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const redirect = computed(() => route.query.redirect as string | '/');

async function onSubmit() {
  $fetch(`/api/login`, {
    method: 'POST',
    body: credentials
  })
      .then(async () => {
        await refreshSession()
        toast.add({title: 'Sukses', description: 'Berhasil login!', color: 'primary'})
        await navigateTo(redirect.value)
      })
      .catch((error: any) => {
        if(error?.data?.message) {
          toast.add({title: 'Gagal', description: error?.data?.message, color: 'error'})
        } else {
          toast.add({title: 'Gagal', description: 'Terjadi kesalahan!', color: 'error'})
        }
      })
}
</script>

<template>
  <div class="flex flex-col justify-center h-screen gap-10 px-8">
    <NuxtImg class="mx-auto -mt-20" width="200" src="https://bioskuy.vercel.app/bioskuy!.png" alt="Bioskuy!"/>
    <UForm :schema="schema" :state="credentials" class="space-y-4" @submit="onSubmit">
      <UFormField size="lg" label="Email" name="email">
        <UInput class="w-full" v-model="credentials.email"/>
      </UFormField>

      <UFormField size="lg" label="Password" name="password">
        <UInput class="w-full" v-model="credentials.password" type="password"/>
      </UFormField>

      <UButton block size="xl" type="submit">
        Login
      </UButton>

      <p class="text-center text-sm mt-3">Belum punya akun? <NuxtLink class="text-primary font-semibold" to="/register">Buat Akun</NuxtLink></p>
    </UForm>
  </div>
</template>