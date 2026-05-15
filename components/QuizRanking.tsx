'use client'

import { useEffect, useState } from 'react'

import { socket } from '../lib/socket'

interface RankingItem {
  name: string
  guess: number
  difference: number
}

export default function QuizRanking() {
  const [ranking, setRanking] =
    useState<RankingItem[]>([])

  useEffect(() => {
    socket.on(
      'ranking-update',
      (data) => {
        setRanking(data)
      }
    )

    return () => {
      socket.off('ranking-update')
    }
  }, [])

  return (
    <div className="mt-10 rounded-[32px] bg-white p-8 shadow-xl">
      <h2 className="text-4xl">
        Live Ranking 🏆
      </h2>

      <div className="mt-8 space-y-4">
        {ranking.map((item, index) => (
          <div
            key={item.name}
            className={`flex items-center justify-between rounded-[24px] p-5 ${
              index === 0
                ? 'bg-black text-white'
                : 'bg-[#F7F3EE]'
            }`}
          >
            <div>
              <p className="text-xl font-semibold">
                #{index + 1} {item.name}
              </p>

              <p className="text-sm opacity-70">
                {item.guess} Tage
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">
                {item.difference}
              </p>

              <p className="text-sm opacity-70">
                daneben
              </p>
            </div>
}