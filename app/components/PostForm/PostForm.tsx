import type { ComponentPropsWithoutRef } from 'react'
import type { Props } from './types'

function PostForm({
  error = {},
  method = 'post',
  fields = { title: '', body: '' },
  ...props
}: Props & ComponentPropsWithoutRef<'form'>) {
  return (
    <form className="flex flex-col gap-4 " method={method} {...props}>
      <div className="mb-4 flex flex-col">
        <label htmlFor="title" className="mb-2 text-gray-600">
          Title
        </label>
        <input
          className="p-4"
          name="title"
          placeholder="Title of your post"
          defaultValue={fields?.title}
        />
        {error?.fieldErrors?.title && (
          <p className="text-red-500">{error.fieldErrors.title}</p>
        )}
      </div>
      <div className="mb-8 flex flex-col">
        <label htmlFor="body" className="mb-2 text-gray-600">
          Body
        </label>
        <textarea
          defaultValue={fields?.body}
          className="p-4"
          name="body"
          placeholder="Write something amazing"
        />
        {error?.fieldErrors?.body && (
          <p className="text-red-500">{error.fieldErrors.body}</p>
        )}
      </div>
      {error.formError && <p className="text-red-500">{error.formError}</p>}
      <button
        type="submit"
        className="transparent rounded py-4 px-6 font-bold text-blue-700 transition hover:bg-gray-100"
      >
        Create Post
      </button>
    </form>
  )
}

export default PostForm
