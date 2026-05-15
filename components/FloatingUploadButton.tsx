'use client'

import { useEffect, useState } from 'react'

type Props = {
  onClick: () => void
}

export default function FloatingUploadButton({
  onClick,
}: Props) {
  const [visible, setVisible] =
    useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom =
        window.innerHeight +
        window.scrollY

      const pageHeight =
        document.body.offsetHeight

      if (scrollBottom > pageHeight - 220) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }

    window.addEventListener(
      'scroll',
      handleScroll
    )

    handleScroll()

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      )
  }, [])

  return (
    <button
      onClick={onClick}
      className={`
      fixed
      bottom-6
      right-6
      md:hidden

        rounded-full
        bg-black
        px-6
        py-4
        text-white
        shadow-2xl

        transition-all
        duration-300

        hover:scale-105

        ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0 pointer-events-none'
        }
      `}
    >
      Bilder hochladen
    </button>
  )
}