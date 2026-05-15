'use client'

import { useEffect, useState } from 'react'

import Header from '../../../components/Header'
import HeroSlider from '../../../components/HeroSlider'
import UploadModal from '../../../components/UploadModal'

import { getImages } from '../../../services/getImages'
import { uploadImage } from '../../../services/uploadImage'

export default function EventPage({
  params,
}: {
  params: {
    eventSlug: string
  }
}) {
  const [images, setImages] =
    useState<string[] | null>(null)

  const [uploadOpen, setUploadOpen] =
    useState(false)

  useEffect(() => {
    async function loadImages() {
      const urls = await getImages()
      setImages(urls)
    }

    loadImages()
  }, [])

  const handleUpload = async (
    files: File[]
  ) => {
    for (const file of files) {
      await uploadImage(file)
    }

    const urls = await getImages()
    setImages(urls)

    setUploadOpen(false)
  }

  return (
    <>
      <Header
        eventSlug={params.eventSlug}
      />

      <main className="min-h-screen bg-[#F7F3EE] px-6 py-32">
        <div className="text-center">
          <p className="tracking-[0.35em] text-[#B89B7A]">
            HOCHZEIT
          </p>

          <h1 className="mt-6 text-6xl md:text-8xl">
            Anika & Marco
          </h1>

          <p className="mt-6 text-black/50">
            16. Mai 2026
          </p>
        </div>

        {images && (
          <HeroSlider
            uploadedImages={images}
          />
        )}

        <div className="mt-14 flex justify-center">
          <button
            onClick={() =>
              setUploadOpen(true)
            }
            className="rounded-full bg-black px-8 py-5 text-white shadow-xl transition hover:scale-105"
          >
            Bilder hochladen
          </button>
        </div>
      </main>

      {uploadOpen && (
        <UploadModal
          onClose={() =>
            setUploadOpen(false)
          }
          onUpload={handleUpload}
        />
      )}
    </>
  )
}