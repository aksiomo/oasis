import { Outlet, createRootRoute } from '@tanstack/react-router'

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css'

const devtoolsConfig = {
  position: 'bottom-right',
} as const

const devtoolsPlugins = [
  {
    name: 'TanStack Router',
    render: <TanStackRouterDevtoolsPanel />,
  },
]

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackDevtools config={devtoolsConfig} plugins={devtoolsPlugins} />
    </>
  )
}
