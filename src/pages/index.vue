<script lang="ts">
import {defineBasicLoader} from 'unplugin-vue-router/data-loaders/basic'
import {getOneUser} from "@/composables/api/main";

export const useUserData = defineBasicLoader('/', async (to) => {
  return await getOneUser(to.query.id)
})
</script>

<script setup lang="ts">
import {useRouteQuery} from "@/composables/router";
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  name: 'home',
  meta: {
    layout: 'default',
  },
});

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
  <hr>
  <p>{{ $d(new Date(), 'custom', $i18n.locale) }}</p>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
    </select>
  </div>
  <hr>
  {{ $route.meta.layout }}
  <p>{{ $n(10000, 'currency', $i18n.locale) }}</p>
  <p>{{ $n(10000, 'currency', $i18n.locale, { currency: 'EUR' }) }}</p>
  <p>{{ $n(10000, 'currency', $i18n.locale, { useGrouping: false, currency: 'KRW'  }) }}</p>
  <p>{{ $n(987654321, 'currency', $i18n.locale, { notation: 'compact', currency: 'CHF' }) }}</p>
  <p>{{ $n(0.99123, 'percent', $i18n.locale) }}</p>
  <p>{{ $n(0.99123, 'percent', $i18n.locale, { minimumFractionDigits: 2 }) }}</p>
  <p>{{ $n(12.11612345, 'decimal', $i18n.locale) }}</p>
  <p>{{ $n(12145281111, 'decimal', $i18n.locale, { minimumFractionDigits: 2 }) }}</p>
</template>
