import type { Props } from './types'

function Post({ header, authorName, children }: Props) {
  return (
    <div className="flex flex-col rounded border p-6">
      <h2 className="text-3xl font-bold text-gray-900">{header}</h2>
      <p className="italic text-gray-700">{authorName}</p>
      <p className="mt-4 text-lg text-gray-900">{children}</p>
    </div>
  )
}

export default Post
