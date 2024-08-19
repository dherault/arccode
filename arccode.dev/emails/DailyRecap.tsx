import * as React from 'react'
import {
  Body,
  Head,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components'

interface DailyRecapProps {
  characterName?: string;
}

export function DailyRecap({
  characterName,
}: DailyRecapProps) {

  return (
    <Html>
      <Head />
      <Preview>
        Your daily recap
      </Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          {characterName}
        </Body>
      </Tailwind>
    </Html>
  )
}

DailyRecap.PreviewProps = {
  characterName: 'Chancellor',
} as DailyRecapProps

export default DailyRecap
