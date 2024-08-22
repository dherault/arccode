import type { HTMLAttributes } from 'react'
import _ from 'clsx'

import languages from '~data/languages'

type Props = HTMLAttributes<HTMLImageElement> & {
  language: keyof typeof languages;
}

function LanguageImage({ language, className = '', ...props }: Props) {
  const languageData = languages[language]

  if (!languageData) return null

  return (
    <img
      src={`/images/languages/${languageData.image}`}
      alt={languageData.name}
      draggable={false}
      {...props}
      className={_('select-none', className)}
    />
  )
}

export default LanguageImage
