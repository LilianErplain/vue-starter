import { defineStore } from 'pinia';
import {computed, ref} from "vue";

export const useDefaultStore = defineStore('default', () => {
    const token = ref('')
    const bearerToken = computed(() => token?.value?.length > 0 ? `Bearer ${token.value}` : '')
    function setToken(value: string) {
        token.value = value
    }

    return {
        token,
        bearerToken,
        setToken
    }
})
