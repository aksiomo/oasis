import ASide from '#/components/ASide'
import Header from '#/components/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(home)/_base')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#F0F6FD] grid grid-cols-[var(--aside-width)_1fr] grid-rows-[var(--header-height)_1fr]">
      <aside className="row-span-full border-r border-[var(--line)]">
        <ASide />
      </aside>
      <header className="border-b border-[var(--line)]">
        <Header currentRouteName="工作台" />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
