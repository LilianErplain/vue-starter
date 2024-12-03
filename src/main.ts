import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp, provide, h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { DataLoaderPlugin } from "unplugin-vue-router/runtime";
import { routes } from 'vue-router/auto-routes'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from "@/composables/apollo";
import App from './App.vue'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app
  .use(createPinia())
  .use(router)
  .use(DataLoaderPlugin, { router })
  .mount('#app')
