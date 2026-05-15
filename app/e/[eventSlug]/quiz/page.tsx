'use client'

import { useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000')

export default function QuizPage() {
  const [name, setName] = useState('')
  const [days, setDays] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submitGuess = () => {
    if (!name || !days) return

    socket.emit('submitGuess', {
      name,
      guess: Number(days),
    })

    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#F7F3EE] flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-[40px] bg-white p-10 shadow-2xl">
        <h1 className="text-5xl font-light text-center mb-4">
          Hochzeitsquiz 💍
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Wie lange sind wir heute schon ein Paar?
        </p>

        {!submitted ? (
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Dein Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-lg outline-none"
            />

            <div>
              <input
                type="range"
                min="0"
                max="3000"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full"
              />

              <div className="text-center mt-4 text-2xl font-semibold">
                {days || 0} Tage ❤️
              </div>
            </div>

            <button
              onClick={submitGuess}
              className="w-full rounded-full bg-black py-4 text-white text-lg"
            >
              Antwort absenden
            </button>
          </div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-3xl mb-4">
              Danke ❤️
            </h2>

            <p className="text-gray-500">
              Deine Antwort wurde gespeichert.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}