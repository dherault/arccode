import { httpsCallable } from 'firebase/functions'
import { useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'

import { functions } from '~firebase'

import { useToast } from '~hooks/ui/useToast'

import { Button } from '~components/ui/Button'
import Spinner from '~components/common/Spinner'

const sendRecapEmails = httpsCallable<unknown, void>(functions, 'sendRecapEmailsRequest')

function Emails() {
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)

  const handleSendRecap = useCallback(async () => {
    if (loading) return

    setLoading(true)

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

    setLoading(false)
  }, [
    loading,
    toast,
  ])

  return (
    <>
      <Helmet>
        <title>
          Administrator | Arccode
        </title>
      </Helmet>
      <div className="container">
        <div className="flex items-center gap-2">
          <Button onClick={handleSendRecap}>
            Send recap emails
          </Button>
          {loading && (
            <Spinner className="w-4" />
          )}
        </div>
      </div>
    </>
  )
}

export default Emails
