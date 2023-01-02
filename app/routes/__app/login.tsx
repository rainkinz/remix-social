import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, useTransition } from '@remix-run/react'
import { Button } from '~/components/Button'
import { UserForm } from '~/components/UserForm'
import { authenticator, USER_LOGIN } from '~/services/auth.server'
import { getSession } from '~/services/session.server'

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate(USER_LOGIN, request, {
    successRedirect: '/',
    throwOnError: true,
    failureRedirect: '/login',
  })
}

type LoaderData = {
  error?: {
    formError: string[]
  }
}

export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })
  let session = await getSession(request.headers.get('cookie'))
  let error = session.get(authenticator.sessionErrorKey) as Error[] | Error
  console.log(error)
  if (error) {
    return json({
      error: {
        formError: [
          'Unable to login with those credentials, please try again!',
        ],
      },
    })
  } else {
    return {}
  }
}

export default function SignInPage() {
  const { error } = useLoaderData<LoaderData>()
  const transition = useTransition()
  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-8 text-xl text-slate-800">Sign in</h1>
      <UserForm error={error}>
        <Button type="submit" disabled={transition.state !== 'idle'}>
          {transition.state === 'submitting' || 'loading'
            ? 'Log in'
            : 'Logging in...'}
        </Button>
      </UserForm>
    </div>
  )
}
