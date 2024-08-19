import { type HTMLAttributes } from 'react'
import _ from 'clsx'

function Divider({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={_('flex items-center justify-center', className)}
      {...props}
    >
      <div className="w-10 border-b border-gray-300 dark:border-gray-700" />
      <div className="mx-2 font-light text-sm text-gray-500 dark:text-gray-400">
        {children}
      </div>
      <div className="w-10 border-b border-gray-300 dark:border-gray-700" />
    </div>
  )
}

export default Divider
