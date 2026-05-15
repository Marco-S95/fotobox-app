'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  eventSlug: string
}

export default function Header({
  eventSlug,
}: HeaderProps) {
  const pathname = usePathname()

  const isGallery = pathname.includes('/gallery')

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-6 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="text-sm tracking-[0.4em] text-[#C8A97E] font-medium">
          DEINE LED FOTOBOX
        </div>

        <nav>
          {isGallery ? (
            <Link
              href={`/e/${eventSlug}`}
              className="text-black text-sm transition hover:opacity-60"
            >
              Event
            </Link>
          ) : (
            <Link
              href={`/e/${eventSlug}/gallery`}
              className="text-black text-sm transition hover:opacity-60"
            >
              Galerie
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}