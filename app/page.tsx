import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EE] px-6">
      <div className="text-center">
        <p className="tracking-[0.35em] text-[#B89B7A]">
          DEINE LED FOTOBOX
        </p>

        <h1 className="mt-6 text-5xl md:text-7xl">
          Event Plattform
        </h1>

        <p className="mt-6 text-black/50">
          Demo Event öffnen
        </p>

        <Link
          href="/e/hochzeit-anika-marco"
          className="mt-10 inline-flex rounded-full bg-black px-8 py-4 text-white"
        >
          Event öffnen
        </Link>
      </div>
    </main>
  )
}