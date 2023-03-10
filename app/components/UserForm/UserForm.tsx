import { Form } from '@remix-run/react'
import { Button } from '../Button'
import type { Props } from './types'

function UserForm({
  children,
  error,
  fields,
  method = 'post',
  ...props
}: Props) {
  return (
    <Form method="post" className="flex flex-col gap-4" {...props}>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="mb-2 text-slate-600">
          Email
        </label>
        <input
          defaultValue={fields?.email}
          type="email"
          name="email"
          className="p-4"
          autoComplete="user-name"
          required
        />
        {error?.fieldErrors?.email && (
          <p className="text-red-500">{error?.fieldErrors?.email}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="mb-2 text-slate-600">
          Password
        </label>
        <input
          defaultValue={fields?.password}
          type="password"
          name="password"
          className="p-4"
          autoComplete="current-password"
          required
        />
        {error?.fieldErrors?.password && (
          <p className="text-red-500">{error?.fieldErrors?.password}</p>
        )}
      </div>
      {children}
      {error?.formError && <p className="text-red-500">{error?.formError}</p>}
    </Form>
  )
}

export default UserForm
