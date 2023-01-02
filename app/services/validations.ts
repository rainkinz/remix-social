import { z } from 'zod'

export const CreatePost = z.object({
  title: z.string().min(5),
  body: z.string().min(5),
})

export const Signup = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})
