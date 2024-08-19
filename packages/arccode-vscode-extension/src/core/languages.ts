import {
  c,
  cpp,
  csharp,
  go,
  java,
  javascript,
  php,
  python,
  ruby,
  typescript,
} from 'language-keywords'

export const languageToKeywords: Record<string, readonly string[]> = {
  c,
  cpp,
  csharp,
  go,
  java,
  javascript,
  javascriptreact: javascript,
  php,
  python,
  ruby,
  typescript,
  typescriptreact: typescript,
}

export const supportedLanguageIds = Object.keys(languageToKeywords)
