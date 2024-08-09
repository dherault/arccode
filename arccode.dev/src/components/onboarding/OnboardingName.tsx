import { collection, getDocs, query, where } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { type FormEvent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { db } from '~firebase'

import useThrottledEffect from '~hooks/common/useThrottledEffect'
import useUser from '~hooks/user/useUser'

import { Button } from '~components/ui/Button'
import { Input } from '~components/ui/Input'

function OnboardingName() {
  const { user, updateUser } = useUser()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name ?? '')
  const [valid, setValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const q = useMemo(() => query(collection(db, 'users'), where('name', '==', name.trim())), [name])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if (loading) return

    const finalName = name.trim()

    if (!finalName) return

    setLoading(true)

    const docs = await getDocs(q)

    if (!docs.empty) return

    await updateUser({
      name: finalName,
    })

    setLoading(false)
    navigate('/install-extension')
  }, [
    loading,
    q,
    name,
    updateUser,
    navigate,
  ])

  const handleCheckName = useCallback(async () => {
    const finalName = name.trim()

    if (!finalName) {
      setValid(true)

      return
    }

    const docs = await getDocs(q)

    setValid(docs.empty)
  }, [
    name,
    q,
  ])

  useThrottledEffect(() => {
    handleCheckName()
  }, 250, [
    handleCheckName,
  ])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <motion.div
        initial={{ opacity: 0, top: 0 }}
        animate={['enter', 'exit']}
        variants={{
          enter: {
            opacity: 1,
            transition: {
              duration: 0.5,
            },
          },
          exit: {
            top: '-100%',
            transition: {
              delay: 7.5,
            },
          },
        }}
        className="relative h-full shrink-0 flex flex-col items-center justify-center"
      >
        <img
          src="/images/onboarding/boat.png"
          alt="Boat at sea"
          className="absolute inset-0 h-full object-cover z-0"
        />
        <div className="flex flex-col items-center space-y-4 text-4xl text-white font-black [text-shadow:0px_0px_8px_black] z-10">
          <motion.div
            initial={{ opacity: 0, top: -4 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="relative"
          >
            On the tides of a sea far away
          </motion.div>
          <motion.div
            initial={{ opacity: 0, top: -4 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="relative"
          >
            a hero returns from war.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, top: -4 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5, delay: 3 }}
            className="relative"
          >
            Casting the sword away
          </motion.div>
          <motion.div
            initial={{ opacity: 0, top: -4 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5, delay: 4 }}
            className="relative"
          >
            the hero sets out to become a developer.
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ top: 0 }}
        animate={{ top: '-100%' }}
        transition={{ delay: 7.5 }}
        className="relative h-full shrink-0 flex items-center justify-center gap-16"
      >
        <img
          src="/images/onboarding/laurel-left.png"
          alt="Laurel left"
          className="h-44"
          style={{
            filter: 'invert(69%) sepia(74%) saturate(454%) hue-rotate(354deg) brightness(107%) contrast(105%)',
          }}
        />
        <form onSubmit={handleSubmit}>
          <div className="text-4xl font-black">
            This hero's name is:
          </div>
          <Input
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Pick your pseudo!"
            className="mt-6 mx-auto h-11 w-full text-center"
          />
          {valid && (
            <div className="mt-1 h-5" />
          )}
          {!valid && (
            <div className="mt-1 text-sm text-red-500 text-center">
              Name already taken
            </div>
          )}
          <div className="mt-2 flex justify-center">
            <Button
              size="lg"
              disabled={!valid || !name.trim()}
              loading={loading}
              type="submit"
            >
              Continue
            </Button>
          </div>
        </form>
        <img
          src="/images/onboarding/laurel-right.png"
          alt="Laurel right"
          className="h-44"
          style={{
            filter: 'invert(69%) sepia(74%) saturate(454%) hue-rotate(354deg) brightness(107%) contrast(105%)',
          }}
        />
      </motion.div>
    </div>
  )
}

export default OnboardingName
