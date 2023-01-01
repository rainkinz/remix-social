import cx from 'classnames'
import type { Props } from './types'

function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={cx(
        'transparent rounded py-4 px-6 font-bold text-blue-700 transition hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
