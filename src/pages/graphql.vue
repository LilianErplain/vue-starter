<script lang="ts">
import {defineBasicLoader} from 'unplugin-vue-router/data-loaders/basic'
import {apolloClient} from "@/composables/apollo";
import {GET_PRODUCTS} from "@/composables/graphql";

export const useProductsData = defineBasicLoader('/graphql', async (to) => {
  const response = await apolloClient.query({
    query: GET_PRODUCTS,
    variables: {
      page: to.query.page ? Number(to.query.page) : 1
    }
  })
  return response?.data?.Products
})
</script>

<script setup lang="ts">
import {useRouteQuery} from "@/composables/router";

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
  data: products,
  isLoading
} = useProductsData()
</script>

<template>
  <h1>GraphQL</h1>
  <button @click="previous">Previous</button>
  <button @click="next">Next</button>
  <h2 v-if="isLoading">Loading...</h2>
  <table v-else>
    <thead>
      <tr>
        <th>ID</th>
        <th>Label</th>
        <th>SKU</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products.data"
        :key="product.id"
      >
        <td>{{ product.id }}</td>
        <td>{{ product.label }}</td>
        <td>{{ product.variants.paginatorInfo.total > 1 ? `${product.variants.paginatorInfo.total} variants` : product.variants.data[0].sku }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f1f1f1;
}
</style>
