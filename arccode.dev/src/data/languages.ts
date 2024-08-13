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

type Langugage = {
  id: string
  name: string
  image: string
  keywords: readonly string[]
}

const languages: Record<string, Langugage> = {
  c: {
    id: 'c',
    name: 'C',
    image: 'c.png',
    keywords: c,
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    image: 'cpp.png',
    keywords: cpp,
  },
  csharp: {
    id: 'csharp',
    name: 'C#',
    image: 'csharp.png',
    keywords: csharp,
  },
  go: {
    id: 'go',
    name: 'Go',
    image: 'go.png',
    keywords: go,
  },
  java: {
    id: 'java',
    name: 'Java',
    image: 'java.png',
    keywords: java,
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    image: 'javascript.png',
    keywords: javascript,
  },
  php: {
    id: 'php',
    name: 'PHP',
    image: 'php.png',
    keywords: php,
  },
  python: {
    id: 'python',
    name: 'Python',
    image: 'python.png',
    keywords: python,
  },
  ruby: {
    id: 'ruby',
    name: 'Ruby',
    image: 'ruby.png',
    keywords: ruby,
  },
  typescript: {
    id: 'typeScript',
    name: 'TypeScript',
    image: 'typescript.png',
    keywords: typescript,
  },
} as const

export default languages
