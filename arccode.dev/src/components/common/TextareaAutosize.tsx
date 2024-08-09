import Textarea, { type TextareaAutosizeProps as TextareaProps } from 'react-textarea-autosize'
import _ from 'clsx'

type TextareaAutosizeProps = TextareaProps & {
  error?: boolean
}

function TextareaAutosize({ className, error = false, ...props }: TextareaAutosizeProps) {
  return (
    <Textarea
      {...props}
      className={_(
        `flex
        min-h-10
        w-full
        rounded-md
        border
        bg-white
        px-3
        py-2
        text-sm
        ring-offset-white
        file:border-0
        file:bg-transparent
        file:text-sm
        file:font-medium
        placeholder:text-neutral-500
        focus-visible:outline-none
        focus-visible:border-blue
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        dark:border-neutral-800
        dark:bg-neutral-950
        dark:ring-offset-neutral-950
        dark:placeholder:text-neutral-400
        dark:focus-visible:border-blue-300`,
        error && 'focus-visible:ring-red-500',
        className
      )}
    />
  )
}

export default TextareaAutosize
