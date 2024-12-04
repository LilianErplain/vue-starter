import { computed, nextTick } from 'vue'
import {
    createRouter,
    createWebHistory,
    type LocationQueryRaw,
    type LocationQueryValueRaw,
    useRoute,
    useRouter,
} from 'vue-router'
import {routes} from "vue-router/auto-routes";

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach(useLayoutMiddleware)
router.beforeEach(useAuthenticationMiddleware)

// exported to ensure the same value is used across the app
export let pendingQuery: null | undefined | LocationQueryRaw

/**
 * Handle one query parameter from the route's path
 *
 * @param name
 * @param format
 * @param deleteIf
 */
export function useRouteQuery<
    T extends LocationQueryValueRaw | LocationQueryValueRaw[] = string,
>(
    name: string,
    {
        // consider them as strings by default
        // @ts-ignore: the default format only works for a string
        format = (v: LocationQueryValueRaw | LocationQueryValueRaw[]): T => v || '',
        // delete them from the query if they are falsy by default
        deleteIf = (v: T | undefined | null) => !v,
    } = {},
) {
    const $route = useRoute()
    const $router = useRouter()

    return computed({
        get: () => format($route.query[name]),
        set(value: T) {
            const newQuery = pendingQuery || { ...$route.query } // Create a copy of route query
            newQuery[name] = value // Update query parameter value

            if (deleteIf(value)) delete newQuery[name] // If there is no value, the query parameter is deleted

            if (!pendingQuery) {
                pendingQuery = newQuery
                nextTick().then(() => {
                    $router.push({ query: pendingQuery! }) // Reload page with new query parameter
                    pendingQuery = null
                })
            }
        },
    })
}

/**
 * This middleware is used to dynamically update the Layouts system.
 *
 * As soon as the route changes, it tries to pull the layout that we want to display from the laptop. Then it loads the
 * layout component, and assigns the loaded component to the meta in the layout Component variable. And layoutComponent
 * is used in the basic layout AppLayout.vue, there is a dynamic update of the layout component
 *
 * If the layout we want to display is not found, loads the default layout App Layout Default.vue
 *
 * @param route
 */
export async function useLayoutMiddleware(route) {
    try {
        let layout = route.meta.layout ?? 'default'
        let layoutComponent = await import(`@/layouts/${layout}.vue`)
        route.meta.layoutComponent = layoutComponent.default
    } catch (e) {
        console.error('ERROR => occurred in processing of layouts: ', e)
        console.log('INFO  => Mounted default layout AppLayoutDefault')
        let layout = 'default'
        let layoutComponent = await import(`@/layouts/${layout}.vue`)
        route.meta.layoutComponent = layoutComponent.default
    }
    return true
}

/**
 * Check if the user is authenticated. If not, then the user is redirected to the login page.
 *
 * @param route
 */
export async function useAuthenticationMiddleware(route) {
    const requiresAuth = route?.meta?.requiresAuth
    const accessToken = localStorage.getItem('access-token')

    if (requiresAuth && !accessToken && route.name !== 'login') {
        return { name: 'login' }
    }
    return true
}
