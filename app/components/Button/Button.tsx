import cx from 'classnames'
import type { Props } from './types'

function Button({ as = 'button', children, className, ...props }: Props) {
  const Component = as
  return (
    <Component
      className={cx(
        'transparent rounded py-4 px-6 font-bold text-blue-700 transition hover:bg-gray-100',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Button
