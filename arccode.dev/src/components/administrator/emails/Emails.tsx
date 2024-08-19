import { httpsCallable } from 'firebase/functions'
import { useCallback } from 'react'

import { functions } from '~firebase'

import { useToast } from '~hooks/ui/useToast'

import { Button } from '~components/ui/Button'

function Emails() {
  const { toast } = useToast()

  const handleSendRecap = useCallback(async () => {
    const sendRecapEmails = httpsCallable(functions, 'sendRecapEmailsRequest')

    try {
      await sendRecapEmails()
    }
    catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error sending emails',
        description: error.message,
      })
    }
  }, [
    toast,
  ])

  return (
    <div className="container">
      <Button onClick={handleSendRecap}>
        Send recap emails
      </Button>
    </div>
  )
}

export default Emails
