import { hashPassword } from './auth-utils.server'
import { db } from './db.server'

export const userSignup = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password)
  return db.user.create({
    data: { email, hashedPassword },
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

export const checkUserExists = async (email: string) => {
  const count = await db.user.count({
    where: { email },
  })

  return count > 0
}
