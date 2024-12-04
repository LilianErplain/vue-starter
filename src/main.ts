import './assets/main.css'
import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { DataLoaderPlugin } from "unplugin-vue-router/runtime";
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from "@/composables/apollo";
import App from './App.vue'
import {i18n} from "@/composables/i18n";
import {router} from "@/composables/router";

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app
    .use(createPinia())
    .use(router)
    .use(i18n)
    .use(DataLoaderPlugin, { router })
    .mount('#app')
