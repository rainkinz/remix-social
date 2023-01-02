import { Link } from '@remix-run/react'
import { SessionUser } from '~/services/auth.server'
import { Button } from '../Button'

function Nav({ user }: { user?: SessionUser }) {
  return (
    <nav className="mb-10 flex items-center justify-between">
      <Link to="/">
        <h1 className="text-2xl text-slate-800">Remix Social</h1>
      </Link>
      <ul className="flex">
        {user ? (
          <>
            <li className="flex">
              <p className="text-slate-600">{user.email}</p>
            </li>
          </>
        ) : (
          <>
            <li className="flex">
              <Button as={Link} to="/login" className="flex">
                Login
              </Button>
            </li>
            <li className="flex">
              <Button as={Link} to="/signup" className="flex">
                Create an Account
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Nav
