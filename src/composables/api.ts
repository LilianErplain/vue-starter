import {provideApolloClient, useMutation, useQuery} from "@vue/apollo-composable";
import {apolloClient} from "@/composables/apollo";
import gql from "graphql-tag";
import {ref} from "vue";
import {GET_CURRENT_USER, GET_PRODUCTS, LOGIN} from "@/composables/graphql";

export async function getOneUser (id: string|number) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    return await res.json()
}

export function authenticateOneUser () {
    return provideApolloClient(apolloClient)(() => useMutation(LOGIN, {
        variables: {
            email: 'dev@erplain.app',
            password: 'pwd',
            device: 'web',
            twoFactorCode: null,
        }
    }))
}

export function getCurrentUser () {
    return provideApolloClient(apolloClient)(() => useQuery(GET_CURRENT_USER));
}

export function getProducts (page: number = 1) {
    return provideApolloClient(apolloClient)(() => useQuery(GET_PRODUCTS, () => ({
        page
    })));
}
