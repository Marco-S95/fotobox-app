'use client'

import {
  useEffect,
  useState,
} from 'react'

type Props = {
  eventSlug: string
  password: string
  children: React.ReactNode
}

export default function PasswordGate({
  eventSlug,
  password,
  children,
}: Props) {
  const [input, setInput] =
    useState('')

  const [unlocked, setUnlocked] =
    useState(false)

  useEffect(() => {
    const access =
      localStorage.getItem(
        `event-access-${eventSlug}`
      )

    if (access === 'true') {
      setUnlocked(true)
    }
  }, [eventSlug])

  const handleUnlock = () => {
    if (input === password) {
      localStorage.setItem(
        `event-access-${eventSlug}`,
        'true'
      )

      setUnlocked(true)
    }
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EE] px-6">
      <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-xl">
        <h1 className="text-4xl">
          Passwort erforderlich
        </h1>

        <input
          type="password"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Passwort"
          className="mt-6 w-full rounded-2xl border border-black/10 px-5 py-4"
        />

        <button
          onClick={handleUnlock}
          className="mt-6 w-full rounded-full bg-black px-6 py-4 text-white"
        >
          Event öffnen
        </button>
      </div>
    </main>
  )
}