import type { ActionFunction } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { Button } from '~/components/Button'
import { useActionData, useTransition } from '@remix-run/react'
import { UserForm } from '~/components/UserForm'
import { userSignup, checkUserExists } from '~/services/users.server'
import { Signup } from '~/services/validations'

export function badRequest<TActionData>(data: TActionData, status = 400) {
  return json<TActionData>(data, { status })
}

type ActionData = {
  error?: {
    formError?: string[]
    fieldErrors?: {
      email?: string[]
      password?: string[]
    }
  }
  fields?: {
    email: string
    password: string
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const rawEmail = form.get('email')
  const rawPassword = form.get('password')

  if (typeof rawEmail !== 'string' || typeof rawPassword !== 'string') {
    return badRequest<ActionData>({
      error: { formError: [`Form not submitted correctly.`] },
    })
  }

  const fields = { email: rawEmail, password: rawPassword }

  const result = Signup.safeParse({
    email: rawEmail,
    password: rawPassword,
  })

  if (!result.success) {
    const error = result.error.flatten()
    return badRequest<ActionData>({ fields, error })
  }

  const userExists = await checkUserExists(result.data.email)

  if (userExists) {
    return badRequest<ActionData>({
      fields,
      error: { formError: [`User with ${rawEmail} already exists`] },
    })
  }

  const user = await userSignup(rawEmail, rawPassword)
  if (user) {
    return redirect('/login')
  } else {
    return badRequest<ActionData>({
      fields,
      error: { formError: [`Something went wrong, please contact support.`] },
    })
  }
}

export default function SignUpPage() {
  const { error, fields } = useActionData<ActionData>() ?? {}
  const transition = useTransition()

  return (
    <div>
      <h1 className="mb-8 text-xl text-slate-800">Sign Up</h1>
      <UserForm error={error} fields={fields}>
        <Button type="submit" disabled={transition.state !== 'idle'}>
          {transition.state === 'idle' ? 'Login' : 'Logging in....'}
        </Button>
      </UserForm>
    </div>
  )
}
