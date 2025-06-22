<script setup lang="ts">
import * as z from "zod";

const route = useRoute()
const router = useRouter()
const toast = useToast()
const config = useRuntimeConfig()
const {session, fetch: refreshSession} = useUserSession()

const schema = z.object({
  name: z.string().min(4),
  email: z.string().email('Email tidak sesuai'),
  password: z.string().min(8, 'Minimal 8 karakter')
})

type Schema = z.output<typeof schema>

const credentials = reactive<Partial<Schema>>({
  name: session.value?.user?.name,
  email: session.value?.user?.email,
  password: undefined
})

const redirect = computed(() => route.query.redirect as string | '/');

async function onSubmit() {
  $fetch(`/users/me`, {
    baseURL: config.public.apiBase,
    method: 'PUT',
    body: credentials,
    headers: {
      'Authorization': session.value?.accessToken as string
    }
  })
      .then(async () => {
        await login()
      })
      .catch((error: any) => {
        if(error?.data?.message) {
          toast.add({title: 'Gagal', description: error?.data?.message, color: 'error'})
        } else {
          toast.add({title: 'Gagal', description: 'Terjadi kesalahan!', color: 'error'})
        }
      })
}

async function login() {
  $fetch(`/api/login`, {
    method: 'POST',
    body: credentials
  })
      .then(async () => {
        await refreshSession()
        toast.add({title: 'Sukses', description: 'Berhasil mengupdate profil!', color: 'primary'})
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
  <div class="grid grid-cols-3 items-center text-slate-200 py-4 px-4 ring ring-default">
    <div @click="router.back()">
      <UButton icon="i-heroicons-arrow-left" size="xl"/>
    </div>
    <h1 class="text-center text-xl font-semibold">Profile</h1>
    <div></div>
  </div>

  <div class="p-4">
    <UForm :schema="schema" :state="credentials" class="space-y-4" @submit="onSubmit">
      <UFormField size="lg" label="Nama" name="name">
        <UInput class="w-full" v-model="credentials.name"/>
      </UFormField>

      <UFormField size="lg" label="Email" name="email">
        <UInput class="w-full" v-model="credentials.email"/>
      </UFormField>

      <UFormField size="lg" label="Password" name="password">
        <UInput class="w-full" v-model="credentials.password" type="password"/>
      </UFormField>

      <UButton block size="xl" type="submit">
        Update Profile
      </UButton>
    </UForm>
  </div>
</template>

<style scoped>

</style>