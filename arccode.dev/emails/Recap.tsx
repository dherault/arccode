import * as React from 'react'
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Tailwind,
} from '@react-email/components'
import { type KeywordRegistry, getKeywords } from 'arccode-core'

interface RecapProps {
  period: 'daily' | 'weekly';
  name: string;
  levelUpCount: number
  keywordRegistry: KeywordRegistry
  levelUpKeywordRegistry: KeywordRegistry
}

export function Recap({
  period,
  name,
  levelUpCount,
  keywordRegistry,
  levelUpKeywordRegistry,
}: RecapProps) {
  const allKeywords = getKeywords(keywordRegistry)
    .sort((a, b) => b.count - a.count)
    .filter((_, i) => i < 12)

  return (
    <Html>
      <Head />
      <Preview>
        Your
        {' '}
        {period}
        {' '}
        recap. You leveled up
        {levelUpCount > 1 ? ` ${levelUpCount} times!` : '!'}
      </Preview>
      <Tailwind>
        <Body className="font-sans">
          <Container className="mx-auto py-4">
            <Link href="https://arccode.dev">
              <Row>
                <Column className="w-10">
                  <Img
                    src="https://arccode.dev/images/logo-blue-square.png"
                    alt="Arccode logo"
                    width={32}
                  />
                </Column>
                <Column>
                  <div className="text-lg font-semibold text-blue-500">
                    Arccode
                  </div>
                </Column>
              </Row>
            </Link>
            <div className="mt-4 text-2xl font-semibold">
              {name}
              , you leveled up
              {levelUpCount > 1 ? ` ${levelUpCount} times!` : '!'}
            </div>
            <div className="mt-4">
              Here is a summary of your progress:
            </div>
            {allKeywords.map(keyword => (
              <div
                key={keyword.language + keyword.name}
                className="mt-4 py-2 px-4 border border-neutral-200 rounded font-mono"
                style={{ borderStyle: 'solid' }}
              >
                <Row>
                  <Column className="w-4">
                    <Img
                      src={`https://arccode.dev/images/languages/${keyword.language}.png`}
                      alt={keyword.language}
                      width={16}
                    />
                  </Column>
                  <Column className="w-0">
                    <div className="ml-4">
                      {keyword.name}
                    </div>
                  </Column>
                  <Column>
                    {(levelUpKeywordRegistry[keyword.language]?.[keyword.name] ?? 0) > 0 && (
                      <div className="ml-4 text-blue-500 text-xs font-sans">
                        Level up!
                      </div>
                    )}
                  </Column>
                  <Column className="text-right">
                    {keyword.count}
                  </Column>
                </Row>
              </div>
            ))}
            <div className="text-center">
              <Link href="https://arccode.dev/~">
                <Button className="mt-4 py-2 px-4 bg-blue-500 text-white text-sm rounded cursor-pointer">
                  Open my loot box
                  {levelUpCount > 1 ? 'es' : ''}
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
  name: 'Chancellor',
  levelUpCount: 2,
  keywordRegistry: {
    javascript: {
      const: 24,
      function: 16,
    },
    ruby: {
      def: 6,
      end: 3,
    },
  },
  levelUpKeywordRegistry: {
    javascript: {
      function: 2,
    },
    ruby: {
      def: 1,
    },
  },
} as RecapProps

export default Recap
