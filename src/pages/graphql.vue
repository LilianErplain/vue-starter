<script lang="ts">
import {defineBasicLoader} from 'unplugin-vue-router/data-loaders/basic'
import {getCurrentUser, getProducts} from "@/composables/api";

export const useProductsData = defineBasicLoader('/graphql', (to) => {
  const { result, loading } = getProducts(Number(to.query.page))
  return {
    result: result.value,
    loading: loading.value,
  }
})
</script>

<script setup lang="ts">
import {useRouteQuery} from "@/composables/router";
import {getCurrentUser} from "@/composables/api";
import {computed} from "vue";

const currentPage = useRouteQuery<number>('page', {
  format: (v) => {
    const n = Number(v)
    return Number.isFinite(n) && n > 0 ? n : 1
  },
})
function previous() {
  currentPage.value--
}
function next() {
  currentPage.value++
}

// const {
//   result, // the data returned by the loader
//   loading, // a boolean indicating if the loader is fetching data
// } = getProducts(currentPage.value)

const {
  data
} = useProductsData()
</script>

<template>
  <h1>GraphQL</h1>
  <h2>loading => {{ data?.loading }}</h2>
  <button @click="previous">Previous</button>
  <button @click="next">Next</button>
  <table v-if="!data?.loading">
    <thead>
      <th>
        <td>Label</td>
        <td>SKU</td>
      </th>
    </thead>
    <tbody>
      <tr
        v-for="product in data.result?.Products.data"
        :key="product.id"
      >
        <td>{{ product.label }}</td>
        <td>{{ product.sku }}</td>
      </tr>
    </tbody>
  </table>
</template>
