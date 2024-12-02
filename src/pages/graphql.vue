<script lang="ts">
import {defineBasicLoader} from 'unplugin-vue-router/data-loaders/basic'
import {authenticateOneUser} from "@/composables/api";

export const useLogin = defineBasicLoader('/graphql', async (to) => {
  localStorage.setItem("access-token", '')
  const { mutate } = await authenticateOneUser()
  const response = await mutate()
  const token = response?.data?.Login
  localStorage.setItem("access-token", token)
  return token
})
</script>

<script setup lang="ts">
import {authenticateOneUser, getCurrentUser} from "@/composables/api";
import {ref} from "vue";

const {
  data: token,
} = useLogin()

const user = ref()
const loading = ref(false)

async function login () {
  const currentUserResponse = await getCurrentUser()
  loading.value = currentUserResponse.loading
  user.value = currentUserResponse.result
}
</script>

<template>
  <h1>GraphQL</h1>
  <h2>token => {{ token }}</h2>
  <button @click="login">
    Get current user
  </button>
  <h2>user => {{ user }}</h2>
  <h2>loading => {{ loading }}</h2>
</template>
