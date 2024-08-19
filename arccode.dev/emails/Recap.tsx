import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
} from '@react-email/components'
import { type KeywordRegistry, getKeywords } from 'arccode-core'

interface RecapProps {
  period: 'daily' | 'weekly';
  characterName: string;
  levelUps: number
  keywords: KeywordRegistry
  levelUpsKeywords: KeywordRegistry
}

export function Recap({
  period,
  characterName,
  levelUps,
  keywords,
  levelUpsKeywords,
}: RecapProps) {
  const allKeywords = getKeywords(keywords).sort((a, b) => b.count - a.count)

  return (
    <Html>
      <Head />
      <Preview>
        Your
        {' '}
        {period}
        {' '}
        recap. You leveled up
        {levelUps > 1 ? ` ${levelUps} times!` : '!'}
      </Preview>
      <Tailwind>
        <Body className="font-sans">
          <Container className="mx-auto py-4">
            <Link href="https://arccode.dev">
              <div className="flex items-center gap-2 text-blue-500">
                <svg
                  viewBox="0 0 354 542"
                  className="h-8"
                >
                  <path
                    fill="currentColor"
                    d="m156.2 539.9-3.18-.66-6.36-1.83-3.17-.99-6.25-2.43-3.1-1.29-5.99-2.97-8.53-5-.94-.62-1.99-1.42-1.02-.76-2.29-1.83-1.2-.99-2.77-2.43-.74-.65-1.59-1.44-.82-.75-1.78-1.65-.91-.85-1.99-1.88-1.03-.98-2.22-2.13-1.14-1.1-2.49-2.4-1.27-1.24-2.77-2.7-1.42-1.39-3.07-3.02-1.57-1.55-3.4-3.36-1.74-1.73-3.75-3.72-6.05-6.01-2.81-2.79-5.52-5.53-2.74-2.75-5.3-5.33-2.6-2.64-4.93-5.01-2.41-2.45-4.44-4.54-2.14-2.21-3.81-3.95-.91-.95-1.68-1.75-.82-.86-1.47-1.56-.71-.75-1.27-1.35-.6-.65-1.03-1.12-.48-.54-.78-.87-.87-1.03-.95-1.17-1.93-2.66-.97-1.38-1.93-3.01-1.93-3.09-3.65-6.77L9.23 408l-2.99-6.84-.68-1.68-1.18-3.22-1.41-4.54-.53-1.95-.86-4.23-.39-2.16-.59-4.57-.27-2.32-.32-4.77-.13-2.41-.07-4.86v-2.43l.21-4.82.13-2.4.46-4.66.27-2.29.73-4.37 1.39-6.1.35-1.27.88-2.72.47-1.39 1.09-2.9 1.14-2.93 2.71-6.04 1.41-2.99 3.04-5.66.76-1.36 1.53-2.53 2.27-3.44.16-.23.52-.66.29-.36.78-.9.42-.49 1.01-1.14.54-.6 1.24-1.36.64-.71 1.45-1.56.74-.81 1.64-1.75 1.69-1.8 3.88-4.08 2.02-2.12 4.45-4.63 2.29-2.37 4.91-5.04 2.49-2.56 5.24-5.33 8.1-8.17 39.82-40.02L33 147.51v-148l144 143.98L321-.49v148l-69.97 69.95 39.82 40.02 2.74 2.75 5.36 5.42 2.64 2.69 5.08 5.19 2.5 2.56 4.69 4.84 2.28 2.36 4.17 4.36 2.01 2.11 3.54 3.75.84.9 1.53 1.65.75.8 1.33 1.46.64.7 1.12 1.25.54.59.88 1.02.42.48.64.77.67.87 2.14 3.06 3.9 6.71 1.87 3.43 3.25 7.2 1.53 3.62 2.46 7.34 2.66 10.8.21 1.14.32 2.77.14 1.46.21 3.29.09 1.68.09 3.61.03 1.83-.02 3.74-.02 1.88-.13 3.7-.08 1.83-.24 3.47-.13 1.69-.34 3.06-.63 3.91-.81 3.93-2.41 7.85-1.33 3.91-3.35 7.65-1.78 3.78-4.18 7.19-7.08 10.01-.22.28-.64.74-.36.41-.9 1-.48.53-1.14 1.23-.6.65-1.37 1.45-.71.76-1.57 1.65-.82.86-1.76 1.84-1.82 1.88-4.13 4.26-2.14 2.2-4.69 4.79-2.41 2.44-5.12 5.18-2.61 2.63-5.42 5.44-8.34 8.32-2.78 2.76-5.12 5.07-2.49 2.47-4.56 4.49-2.22 2.19-4.06 3.96-1.97 1.92-3.61 3.48-1.75 1.68-3.21 3.03-1.56 1.47-2.86 2.62-1.39 1.27-2.56 2.27-1.25 1.09-2.31 1.94-1.14.94-2.12 1.67-1.04.8-1.98 1.44-1.95 1.39-3.69 2.25-1.84 1.06-3.79 1.87-6.23 2.74-2.36.99-4.86 1.7-2.45.8-5.01 1.34-2.53.63-5.11.97-2.57.44-5.18.6-2.59.26-5.19.22-2.59.07-5.15-.16-2.56-.12-5.07-.54-2.51-.32m52.63-140.09L250 364.49l-73-72.98-73 72.98 36.24 36.25 2.5 2.5 4.8 4.79 2.36 2.35 4.46 4.44 2.18 2.17 4.02 3.99 1.95 1.93 3.48 3.44 1.67 1.64 2.84 2.8.67.65 1.2 1.17.57.56 1 .97.48.46.79.76.37.36.58.54.26.24.34.31.24.19h.02l.22-.19.14-.12.46-.43.26-.24.69-.66.37-.35.9-.87.47-.46 1.1-1.07.58-.56 1.29-1.26 1.33-1.31 3.18-3.13 1.66-1.64 3.77-3.73 1.95-1.93 4.25-4.23 2.18-2.16 4.64-4.63 2.36-2.36Z"
                  />
                </svg>
                <div className="text-lg font-semibold">
                  Arccode
                </div>
              </div>
            </Link>
            <div className="mt-4 text-2xl font-semibold">
              {characterName}
              , you leveled up
              {levelUps > 1 ? ` ${levelUps} times!` : '!'}
            </div>
            <div className="mt-4">
              Here is a summary of your progress:
            </div>
            {allKeywords.map(keyword => (
              <div
                key={keyword.language + keyword.name}
                className="mt-4 py-2 px-4 border border-neutral-200 rounded flex items-center gap-4 font-mono"
                style={{ borderStyle: 'solid' }}
              >
                <Img
                  src={`/static/languages/${keyword.language}.png`}
                  alt={keyword.language}
                  width={16}
                />
                {keyword.name}
                {(levelUpsKeywords[keyword.language]?.[keyword.name] ?? 0) > 0 && (
                  <div className="text-blue-500 text-xs font-sans">
                    Level up!
                  </div>
                )}
                <div className="-ml-4 grow" />
                {keyword.count}
              </div>
            ))}
            <div className="text-center">
              <Link href="https://arccode.dev/~">
                <Button className="mt-4 py-2 px-4 bg-blue-500 text-white text-sm rounded cursor-pointer">
                  Open my loot box
                  {levelUps > 1 ? 'es' : ''}
                  !
                </Button>
              </Link>
            </div>
            <div className="mt-16 text-center text-xs text-neutral-500">
              Arccode is open source!
              {' '}
              <Link href="https://github.com/dherault/arccode">
                GitHub
              </Link>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

Recap.PreviewProps = {
  period: 'daily',
  characterName: 'Chancellor',
  levelUps: 2,
  keywords: {
    javascript: {
      const: 24,
      function: 16,
    },
    ruby: {
      def: 6,
      end: 3,
    },
  },
  levelUpsKeywords: {
    javascript: {
      function: 2,
    },
    ruby: {
      def: 1,
    },
  },
} as RecapProps

export default Recap
