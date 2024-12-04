<script setup lang="ts">
import {authenticateOneUser} from "@/composables/api/main";
import {useRouter} from "vue-router";
import {definePage} from "unplugin-vue-router/runtime";
import {onMounted} from "vue";

definePage({
  name: 'login',
  meta: {
    layout: 'default',
  },
});

const router = useRouter()

const {
  mutate, // Function to trigger the mutation manually
  loading // A boolean indicating if the mutation is completed
} = authenticateOneUser()

async function login () {
  const response = await mutate() // Trigger mutation
  localStorage.setItem("access-token", response?.data?.Login) // Retrieve token and store it in local storage
  await router.push('/graphql') // Redirect user to home page once logged in
}

onMounted(() => {
  localStorage.setItem("access-token", '')
})
</script>

<template>
  <h1>{{ $t('login') }}</h1>
  <h2>loading => {{ loading }}</h2>
  <button @click="login">
    Login
  </button>
</template>
