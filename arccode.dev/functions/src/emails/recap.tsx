import * as React from 'react'
import { Resend } from 'resend'

import RecapEmail from '../../../emails/Recap'

const resend = new Resend(process.env.RESEND_API_KEY ?? '_null_')

type Arguments = React.ComponentProps<typeof RecapEmail> & {
  email: string
}

async function sendRecapEmail({
  email,
  name,
  levelUpCount,
  keywordRegistry,
  levelUpKeywordRegistry,
  period = 'daily',
}: Arguments) {
  await resend.emails.send({
    from: 'David from Arccode <hi@arccode.dev>',
    to: email,
    subject: 'Level up!',
    react: (
      <RecapEmail
        name={name}
        levelUpCount={levelUpCount}
        keywordRegistry={keywordRegistry}
        levelUpKeywordRegistry={levelUpKeywordRegistry}
        period={period}
      />
    ),
  })
}

export default sendRecapEmail
