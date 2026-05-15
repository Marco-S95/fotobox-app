'use client'

import { useState } from 'react'

import { socket } from '../lib/socket'

export default function QuizForm() {
  const [name, setName] = useState('')

  const [guess, setGuess] = useState('')

  const [submitted, setSubmitted] =
    useState(false)

  const handleSubmit = () => {
    if (!name || !guess) return

    socket.emit('submit-answer', {
      name,
      guess: Number(guess),
    })

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-[32px] bg-white p-10 text-center shadow-xl">
        <h2 className="text-4xl">
          Danke ❤️
        </h2>

        <p className="mt-4 text-lg text-gray-600">
          Deine Antwort wurde gespeichert.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-[32px] bg-white p-8 shadow-2xl">
      <h1 className="text-5xl leading-tight">
        Wie lange sind wir heute schon ein Paar? ❤️
      </h1>

      <p className="mt-4 text-lg text-gray-500">
        Schätze die Anzahl der Tage.
      </p>

      <div className="mt-10 space-y-6">
        <input
          type="text"
          placeholder="Dein Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded-full border border-gray-200 bg-[#F7F3EE] px-6 py-5 text-lg outline-none"
}