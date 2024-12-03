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
import ProductsTable from "@/components/ProductsTable.vue";

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
  <ProductsTable
    v-else
    :products="products.data"
  />
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
