'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000')

export default function AdminPage() {
  const [ranking, setRanking] = useState<any[]>([])

  useEffect(() => {
    socket.on('rankingUpdate', (data) => {
      setRanking(data)
    })

    return () => {
      socket.off('rankingUpdate')
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#F7F3EE] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-light text-center mb-12">
          Live Ranking 🏆
        </h1>

        <div className="space-y-4">
          {ranking.map((player, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 shadow-xl bg-white ${
                index === 0 ? 'border-4 border-yellow-400 scale-105' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-semibold">
                    #{index + 1} {player.name}
                  </div>

                  <div className="text-gray-500">
                    Tipp: {player.guess} Tage
                  </div>
                </div>

                <div className="text-3xl font-bold">
                  ±{player.diff}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}