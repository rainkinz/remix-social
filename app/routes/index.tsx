import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useActionData, useLoaderData } from '@remix-run/react'
import { getPosts, createPost } from '~/services/posts.server'
import type { Post } from '~/services/posts.server'
import { Post as PostComponent } from '~/components/Post'
import { PostForm } from '~/components/PostForm'

type LoaderData = {
  posts: Post[]
}

type ActionData = {
  error: {
    formError: string[]
    fieldErrors: {
      title: string[]
      body: string
    }
  }
  fields: {
    title: string
    body: string
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const rawTitle = form.get('title') || ''
  const rawBody = form.get('body') || ''

  const post = await createPost({ title: rawTitle, body: rawBody })

  return redirect('/')
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = { posts: await getPosts() }
  return json(data)
}

export default function Index() {
  const { posts } = useLoaderData<LoaderData>()
  const data = useActionData<ActionData>()

  return (
    <div className="flex flex-col items-center">
      <h1>Welcome to Remix</h1>
      <PostForm method="post" action="/?index" {...data} />
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <PostComponent header={post.title}>{post.body}</PostComponent>
          </li>
        ))}
      </ul>
    </div>
  )
}
