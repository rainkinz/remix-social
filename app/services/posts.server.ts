import type { Post } from '@prisma/client'
import { db } from '~/services/db.server'
export type { Post }

export const getPosts = () =>
  db.post.findMany({
    include: {
      author: {
        select: { email: true, id: true },
      },
    },
  })

export const createPost = ({ title, body }: Pick<Post, 'title' | 'body'>) => {
  return db.post.create({
    data: {
      authorId: 'dc2f0672-cce7-4a2d-a80b-464b8089f3ad',
      title,
      body,
    },
  })
}
