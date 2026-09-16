import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/_base/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      当前页面仍在开发中…
    </div>
  ) 
}
