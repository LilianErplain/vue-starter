import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client/core'
import {removeTypenameFromVariables} from "@apollo/client/link/remove-typename";

function getHeaders() {
    const headers: { Authorization?: string; "Content-Type"?: string } = {};
    const token = localStorage.getItem("access-token");
    console.log(token)
    if (token && token.length > 0) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    headers["Content-Type"] = "application/json";
    return headers;
}

// const removeTypenameLink = removeTypenameFromVariables();
// const link = from([removeTypenameLink, httpLink]);

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'https://localhost:51413/graphql',
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
