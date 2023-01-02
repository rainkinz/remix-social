import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { UserForm } from '~/components/UserForm'
import { userSignup } from '~/services/users.server'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const rawEmail = form.get('email')
  const rawPassword = form.get('password')

  const user = await userSignup(rawEmail, rawPassword)

  return redirect('/login')
}
export default function SignUpPage() {
  return (
    <div>
      <h1 className="mb-8 text-xl text-slate-800">Sign Up</h1>
      <UserForm />
    </div>
  )
}
