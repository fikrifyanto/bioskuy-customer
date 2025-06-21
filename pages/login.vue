<script setup lang="ts">
import * as z from 'zod'

const route = useRoute()
const toast = useToast()
const {fetch: refreshSession} = useUserSession()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
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
        toast.add({title: 'Success', description: 'The form has been submitted.', color: 'primary'})
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
    <NuxtImg class="mx-auto -mt-40" width="200" src="https://bioskuy.vercel.app/bioskuy!.png" alt="Bioskuy!"/>
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
    </UForm>
  </div>
</template>