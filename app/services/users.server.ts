import { db } from './db.server'

export const userSignup = async (email: string, password: string) => {
  return db.user.create({
    data: { email, hashedPassword: password },
    select: {
      email: true,
      createdAt: true,
      id: true,
      name: true,
      role: true,
      updatedAt: true,
    },
  })
}
