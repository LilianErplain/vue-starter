# 🦄 Vue Starter 🦄

- [Vue 3](https://vuejs.org/)
- [VueUse](https://vueuse.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)

## Project Setup

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Routing

VueRouter is configured through the [Unplugin Vue Router](https://uvr.esm.is/) package.

Just add your pages in the `src/pages` folder, and they will be automatically imported and added to the router.

## Loading data in one page

This app is using the [DataLoaderPlugin](https://uvr.esm.is/data-loaders/) plugin from `Unplugin Vue Router`. It allows 
to fetch data in a page. The data loader automatically runs when the route changes or when route parameters are updated.

```vue
<script lang="ts">
// ./src/pages/users/[id]/index.vue
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'
import { getUserById } from '../api'

// We use `defineBasicLoader` to generate a new composable named `useUserData`
export const useUserData = defineBasicLoader('/users/[id]', async (route) => {
  return getUserById(route.params.id)
})
</script>

<script setup lang="ts">
// Now we can use the `useUserData` in the component's `setup` part
const {
  data: user, // the data returned by the loader
  isLoading, // a boolean indicating if the loader is fetching data
  error, // an error object if the loader failed
  reload, // a function to refetch the data without navigating
} = useUserData()
</script>

<template>
  <main>
    <p v-if="isLoading">Loading...</p>
    <template v-else-if="error">
      <p>{{ error.message }}</p>
      <button @click="reload()">Retry</button>
    </template>
    <template v-else>
      <p>{{ user }}</p>
    </template>
  </main>
</template>
```

## GraphQL

The app is using the [Vue Apollo](https://apollo.vuejs.org/) package to handle GraphQL queries. The apollo client 
provides functions (aka `composables`) to trigger queries and mutations.

### ➡️ Queries

```js
// @/composables/api.ts
import {provideApolloClient, useQuery} from "@vue/apollo-composable";
import {apolloClient} from "@/composables/apollo";
import {GET_CURRENT_USER} from "@/composables/graphql";
// ...
export function getCurrentUser () {
    return provideApolloClient(apolloClient)(() => useQuery(GET_CURRENT_USER));
}
// ...
```

```vue
<script setup lang="ts">
// @/pages/user.vue
import {getCurrentUser} from "@/composables/api";

const {
result: user, // the result returned by the query
loading, // a boolean indicating if data are loading
} = getCurrentUser()
</script>

<template>
  <main>
    <p v-if="loading">Loading...</p>
    <p v-else>{{ user }}</p>
  </main>
</template>
```

### ➡️ Mutations

```js
// @/composables/api.ts
import {provideApolloClient, useMutation} from "@vue/apollo-composable";
import {apolloClient} from "@/composables/apollo";
import {LOGIN} from "@/composables/graphql";
// ...
export function authenticateOneUser () {
    return provideApolloClient(apolloClient)(() => useMutation(LOGIN, {
        variables: {
            email: 'anakin.skywalker@example.com',
            password: 'I_L0V3_P4DM3',
        }
    }))
}
// ...
```

```vue
<script setup lang="ts">
// @/pages/login.vue
import {authenticateOneUser} from "@/composables/api";
import {ref} from "vue";
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
  <main>
    <h1>Login</h1>
    <!-- ... -->
    <button @click="login">
      Login
    </button>
    <!-- ... -->
  </main>
</template>
```

### ➡️ Queries with data loaders

Sometimes, we have to fetch data when the route changes (e.g. product list with pagination). We can use the apollo
client inside a basic data loader to retrieve data on page load.

```vue
<script lang="ts">
  // @/pages/products.vue
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

  // The `useRouteQuery` composable allow us to access query parameters from the current route
  // The first argument of the composable is the name of the parameter we want to retrieve
  // The second one is an object containing options. Here we have a function to format our parameter
  // and convert it from string to number
  const currentPage = useRouteQuery<number>('page', {
    format: (v) => {
      const n = Number(v)
      return Number.isFinite(n) && n > 0 ? n : 1
    },
  })
  
  // We can update the current page. the basic data loader will run again to fetch new products.
  function previous() {
    currentPage.value--
  }
  function next() {
    currentPage.value++
  }

  const {
    data: products,
    isLoading
  } = useProductsData()
</script>

<template>
  <main>
    <p v-if="isLoading">Loading...</p>
    <table v-else>
      <!-- display products here -->
    </table>
  </main>
</template>
```
