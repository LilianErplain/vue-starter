<script setup lang="ts">
import {authenticateOneUser} from "@/composables/api";
import {useRouter} from "vue-router";

const router = useRouter()

const {
  mutate, // Function to trigger the mutation manually
  loading // A boolean indicating if the mutation is completed
} = authenticateOneUser()

async function login () {
  localStorage.setItem("access-token", '')
  const response = await mutate() // Trigger mutation
  localStorage.setItem("access-token", response?.data?.Login) // Retrieve token and store it in local storage
  await router.push('/graphql') // Redirect user to home page once logged in
}
</script>

<template>
  <h1>{{ $t('login') }}</h1>
  <h2>loading => {{ loading }}</h2>
  <button @click="login">
    Login
  </button>
</template>
