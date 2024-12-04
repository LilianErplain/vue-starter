import './assets/main.css'
import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from "vue-i18n";
import { createRouter, createWebHistory } from 'vue-router'
import { DataLoaderPlugin } from "unplugin-vue-router/runtime";
import { routes } from 'vue-router/auto-routes'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from "@/composables/apollo";
import App from './App.vue'
import en from '@/configs/i18n/en.js'
import fr from '@/configs/i18n/fr.js'
import {numberFormats} from '@/configs/i18n/number.js'
import {datetimeFormats} from '@/configs/i18n/datetime.js'
import {useDefaultLocale} from "@/configs/i18n/i18n";

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

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: useDefaultLocale(),
  datetimeFormats,
  numberFormats,
  messages: {
    en,
    fr
  }
})

app
    .use(createPinia())
    .use(router)
    .use(i18n)
    .use(DataLoaderPlugin, { router })
    .mount('#app')
