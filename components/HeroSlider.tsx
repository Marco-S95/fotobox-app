'use client'

import { useEffect, useState } from 'react'

type Props = {
  uploadedImages?: string[]
}

const demoImages = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1600',
]

export default function HeroSlider({
  uploadedImages = [],
}: Props) {
  const images =
    uploadedImages.length > 0
      ? uploadedImages
      : demoImages

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === images.length - 1
          ? 0
          : prev + 1
      )
    }, 3500)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <>
    {/* MOBILE */}
<div className="relative mx-auto mt-14 flex h-[520px] w-full items-center justify-center overflow-hidden md:hidden">
  {images.map((image, i) => {
    const position =
      (i - index + images.length) %
      images.length

    let style = ''

    if (position === 0) {
      style =
        'translate-x-0 opacity-100 scale-100 z-20'
    } else if (position === 1) {
      style =
        'translate-x-[120%] opacity-0 scale-95 z-10'
    } else {
      style =
        '-translate-x-[120%] opacity-0 scale-95 z-0'
    }

    return (
      <div
        key={i}
        className={`absolute transition-all duration-1000 ease-in-out ${style}`}
      >
        <div className="overflow-hidden rounded-[40px] shadow-2xl">
          <img
            src={image}
            alt=""
            className="h-[480px] w-[300px] object-cover"
          />
        </div>
      </div>
    )
  })}
</div>

      {/* DESKTOP */}
      <div className="relative mx-auto mt-20 hidden h-[560px] w-full max-w-7xl items-center justify-center overflow-hidden md:flex">
        {images.map((image, i) => {
          const position =
            (i - index + images.length) %
            images.length

          let style = ''

          if (position === 0) {
            style =
              'translate-x-0 scale-100 opacity-100 z-30'
          } else if (position === 1) {
            style =
              'translate-x-[260px] scale-90 opacity-40 z-20'
          } else if (
            position ===
            images.length - 1
          ) {
            style =
              '-translate-x-[260px] scale-90 opacity-40 z-20'
          } else {
            style =
              'opacity-0 scale-75 z-0'
          }

          return (
            <div
              key={i}
              className={`absolute transition-all duration-700 ease-in-out ${style}`}
            >
              <div
                className={`
                  overflow-hidden rounded-[40px]
                  ${
                    position === 0
                      ? 'h-[520px] w-[320px]'
                      : 'h-[420px] w-[220px]'
                  }
                `}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}