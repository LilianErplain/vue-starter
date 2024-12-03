<script setup lang="ts">
import {authenticateOneUser} from "@/composables/api";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const loading = ref(false)

async function login () {
  localStorage.setItem("access-token", '')
  const { mutate: logUserIn, loading: loggingIn } = await authenticateOneUser()
  const response = await logUserIn()
  loading.value = loggingIn.value
  localStorage.setItem("access-token", response?.data?.Login)
  await router.push('/graphql')
}
</script>

<template>
  <h1>Login</h1>
  <h2>loading => {{ loading }}</h2>
  <button @click="login">
    Login
  </button>
</template>
