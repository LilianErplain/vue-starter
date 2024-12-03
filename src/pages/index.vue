<script lang="ts">
import {defineBasicLoader} from 'unplugin-vue-router/data-loaders/basic'
import {getOneUser} from "@/composables/api";

export const useUserData = defineBasicLoader('/', async (to) => {
  return await getOneUser(to.query.id)
})
</script>

<script setup lang="ts">
import {useRouteQuery} from "@/composables/router";

const currentId = useRouteQuery<number>('id', {
  format: (v) => {
    const n = Number(v)
    return Number.isFinite(n) && n > 0 ? n : 1
  },
})
function previous() {
  currentId.value--
}
function next() {
  currentId.value++
}

const {
  data: user, // the data returned by the loader
  isLoading, // a boolean indicating if the loader is fetching data
  error, // an error object if the loader failed
  reload, // a function to refetch the data without navigating
} = useUserData()
</script>

<template>
  <h1>Happy Coding</h1>
  <h2>user => {{ user }}</h2>
  <h2>isLoading => {{ isLoading }}</h2>
  <h2>error => {{ error }}</h2>
  <button @click="previous">Previous</button>
  <button @click="next">Next</button>
  <RouterLink to="/login">Go to login page</RouterLink>
</template>
