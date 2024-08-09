import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { SUPPORT_EMAIL } from '~constants'

import { Button } from '~components/ui/Button'

function Support() {
  const navigate = useNavigate()

  return (
    <div className="pb-8 container">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Go back
      </Button>
      <div className="mt-2 pt-4 px-4 bg-white border rounded-xl text-center">
        <h1 className="text-3xl font-semibold">
          Support
        </h1>
        <div className="mt-4">
          If you need help, please contact David at
          {' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-blue hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </div>
        <div>
          You can also use WhatsApp for a quicker response:
        </div>
        <div className="mt-8">
          <img
            src="/images/dherault-whatsapp.png"
            alt="David Hérault WhatsApp"
            className="mx-auto h-[512px]"
          />
        </div>
      </div>
    </div>
  )
}

export default Support
