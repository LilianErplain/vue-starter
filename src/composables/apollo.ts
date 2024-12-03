import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client/core'

interface HttpHeaders {
    Authorization?: string
    "Content-Type"?: string
}

// Build HTTP headers
function getHeaders() {
    const headers: HttpHeaders = {};
    const token = localStorage.getItem("access-token");
    if (token && token.length > 0) headers["Authorization"] = `Bearer ${token}`
    headers["Content-Type"] = "application/json";
    return headers;
}

// HTTP connection to the API
const httpLink = createHttpLink({
    uri: 'https://localhost:51413/graphql', // You should use an absolute URL here
    fetch: (uri: RequestInfo, options: RequestInit) => {
        options.headers = getHeaders();
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
