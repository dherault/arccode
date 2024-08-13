import {
  c,
  cplusplus,
  csharp,
  go,
  java,
  javascript,
  php,
  python,
  ruby,
  typescript,
} from 'language-keywords'

type Langugage = {
  name: string
  keywords: readonly string[]
}

const languages: Record<string, Langugage> = {
  c: {
    name: 'C',
    keywords: c,
  },
  cplusplus: {
    name: 'C++',
    keywords: cplusplus,
  },
  csharp: {
    name: 'C#',
    keywords: csharp,
  },
  go: {
    name: 'Go',
    keywords: go,
  },
  java: {
    name: 'Java',
    keywords: java,
  },
  javascript: {
    name: 'JavaScript',
    keywords: javascript,
  },
  php: {
    name: 'PHP',
    keywords: php,
  },
  python: {
    name: 'Python',
    keywords: python,
  },
  ruby: {
    name: 'Ruby',
    keywords: ruby,
  },
  typescript: {
    name: 'typeScript',
    keywords: typescript,
  },
} as const

export default languages
