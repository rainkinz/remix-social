import type { LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { Nav } from '~/components/Nav'
import { authenticator } from '~/services/auth.server'
import type { SessionUser } from '~/services/auth.server'

type LoaderData = {
  user: SessionUser
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  return { user }
}

export default function App() {
  const { user } = useLoaderData<LoaderData>()
  return (
    <div className="flex flex-col items-center md:mx-10">
      <Nav user={user} />
      <Outlet />
    </div>
  )
}
