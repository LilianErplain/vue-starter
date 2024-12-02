import {provideApolloClient, useMutation, useQuery} from "@vue/apollo-composable";
import {apolloClient} from "@/composables/apollo";
import gql from "graphql-tag";
import {ref} from "vue";

export async function getOneUser (id) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    return await res.json()
}

export async function authenticateOneUser () {
    return provideApolloClient(apolloClient)(() => useMutation(gql`
        mutation Login($email: String!, $password: String!, $device: String!, $twoFactorCode: String) {
            Login(email: $email, password: $password, device: $device, twoFactorCode: $twoFactorCode)
        }
    `, {
        variables: {
            email: 'dev@erplain.app',
            password: 'pwd',
            device: 'web',
            twoFactorCode: null,
        }
    }))
}

export async function getCurrentUser () {
    return provideApolloClient(apolloClient)(() => useQuery(gql`
        query CurrentUserProfile {
            CurrentUserProfile {
                id
                user {
                    id
                    email
                }
                company {
                    id
                    label
                }
            }
        }
    `));
}
