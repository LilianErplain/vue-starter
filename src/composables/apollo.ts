import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client/core'
import * as process from "node:process";

// Build HTTP headers
function useHttpHeaders() {
    const headers: HeadersInit = {};
    const accessToken = localStorage.getItem("access-token");
    if (accessToken && accessToken.length > 0) headers["Authorization"] = `Bearer ${accessToken}`
    headers["Content-Type"] = "application/json";
    return headers;
}

// HTTP connection to the API
const httpLink = createHttpLink({
    uri: import.meta.env.VITE_BACK_END_URL, // You should use an absolute URL here
    fetch: (uri: RequestInfo, options: RequestInit) => {
        options.headers = useHttpHeaders();
        return fetch(uri, options);
    }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        addTypename: false
    }),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore'
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    }
})
