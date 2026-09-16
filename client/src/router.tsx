import '@/lib/semi-adapter'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

function getBasepath() {
  if (import.meta.env.SSR) return undefined
  const url = import.meta.env.BASE_URL
  if (!url || url === '/') return undefined
  return url.replace(/\/$/, '')
}

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    basepath: getBasepath(),
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
