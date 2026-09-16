import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/_base/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(home)/_base/dashboard"!</div>
}
