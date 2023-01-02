import { Outlet } from '@remix-run/react'
import { Nav } from '~/components/Nav'

export default function App() {
  return (
    <div className="mx-4 max-w-6xl md:mx-10">
      <Nav />
      <Outlet />
    </div>
  )
}
