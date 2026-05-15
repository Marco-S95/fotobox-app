'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import UploadModal from '@/components/UploadModal'
import { getImages } from '@/services/getImages'
import { uploadImage } from '@/services/uploadImage'
import { deleteImage } from '@/services/deleteImage'
import { deleteAllImages } from '@/services/deleteAllImages'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

interface GalleryPageProps {
  params: {
    eventSlug: string
  }
}

export default function GalleryPage({
  params,
}: GalleryPageProps) {
  const [images, setImages] = useState<string[]>([])
  const [showUpload, setShowUpload] =
    useState(false)

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null)

  const [selectionMode, setSelectionMode] =
    useState(false)

  const [selectedImages, setSelectedImages] =
    useState<string[]>([])

  const [adminMode, setAdminMode] =
    useState(false)

  const [showPasswordModal, setShowPasswordModal] =
    useState(false)

  const [password, setPassword] = useState('')

  useEffect(() => {
    async function loadImages() {
      const urls = await getImages()
      setImages(urls)
    }

    loadImages()
  }, [])

  function toggleImageSelection(image: string) {
    if (selectedImages.includes(image)) {
      setSelectedImages(
        selectedImages.filter(
          (img) => img !== image
        )
      )
    } else {
      setSelectedImages([
        ...selectedImages,
        image,
      ])
    }
  }

  async function downloadSelectedImages() {
    const zip = new JSZip()

    for (
      let i = 0;
      i < selectedImages.length;
      i++
    ) {
      const imageUrl = selectedImages[i]

      const response = await fetch(imageUrl)

      const blob = await response.blob()

      zip.file(`bild-${i + 1}.jpg`, blob)
    }

    const content = await zip.generateAsync({
      type: 'blob',
    })

    saveAs(content, 'hochzeitsbilder.zip')
  }

  async function handleDeleteImage() {
    if (!selectedImage) return

    const fileName = selectedImage
      .split('/event-images/')[1]
      ?.split('?')[0]

    if (!fileName) return

    await deleteImage(fileName)

    setImages(
      images.filter(
        (img) => img !== selectedImage
      )
    )

    setSelectedImage(null)
  }

  async function handleDeleteAllImages() {
  const confirmed = confirm(
    'Wirklich alle Bilder löschen?'
  )

  if (!confirmed) return

  await deleteAllImages()

  const urls = await getImages()

  setImages(urls)

  setSelectedImages([])
  setSelectedImage(null)
}

  function handleAdminLogin() {
    if (password === 'Anika&Marco2026') {
      setAdminMode(true)
      setShowPasswordModal(false)
      setPassword('')
    } else {
      alert('Falsches Passwort')
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F3EE] px-6 py-24">
      <div
        onDoubleClick={() =>
          setShowPasswordModal(true)
        }
      >
        <Header eventSlug={params.eventSlug} />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="mb-8 text-7xl font-light tracking-tight">
            Galerie
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() =>
                setShowUpload(true)
              }
              className="rounded-full bg-black px-10 py-5 text-white shadow-xl transition hover:scale-105"
            >
              Bilder hochladen
            </button>

            <button
              onClick={() => {
                if (selectionMode) {
                  setSelectedImages([])
                }

                setSelectionMode(!selectionMode)
              }}
              className="rounded-full border border-black px-8 py-5 transition hover:bg-black hover:text-white"
            >
              {selectionMode
                ? 'Auswahl beenden'
                : 'Bilder auswählen'}
            </button>

            {selectionMode &&
              selectedImages.length > 0 && (
                <button
                  onClick={
                    downloadSelectedImages
                  }
                  className="rounded-full bg-black px-8 py-5 text-white transition hover:scale-105"
                >
                  Download (
                  {selectedImages.length})
                </button>
              )}
          </div>
        </div>

        <div className="columns-2 gap-4 md:columns-3 xl:columns-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`mb-4 cursor-pointer overflow-hidden rounded-[2rem] border-4 transition ${
                selectedImages.includes(
                  image
                )
                  ? 'border-black'
                  : 'border-transparent'
              }`}
              onClick={() => {
                if (selectionMode) {
                  toggleImageSelection(image)
                } else {
                  setSelectedImage(image)
                }
              }}
            >
              <img
                src={image}
                alt=""
                className="w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">
          <button
            onClick={() =>
              setSelectedImage(null)
            }
            className="absolute right-6 top-6 text-5xl text-white"
          >
            ×
          </button>

          <div className="flex flex-col items-center gap-6">
            <div className="max-h-[80vh] max-w-[90vw] overflow-hidden rounded-[2rem]">
              <img
                src={selectedImage}
                alt=""
                className="max-h-[80vh] max-w-[90vw] object-contain"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
  <button
    onClick={async () => {
      if (!selectedImage) return

      const response = await fetch(
        selectedImage
      )

      const blob = await response.blob()

      const url =
        window.URL.createObjectURL(blob)

      const a =
        document.createElement('a')

      a.href = url
      a.download = 'hochzeitsbild.jpg'

      document.body.appendChild(a)
      a.click()
      a.remove()

      window.URL.revokeObjectURL(url)
    }}
    className="rounded-full bg-white px-8 py-4 text-black transition hover:scale-105"
  >
    Bild herunterladen
  </button>

  {adminMode && (
    <>
      <button
        onClick={handleDeleteImage}
        className="rounded-full bg-red-600 px-8 py-4 text-white transition hover:scale-105"
      >
        Bild löschen
      </button>

      <button
        onClick={handleDeleteAllImages}
        className="rounded-full bg-red-900 px-8 py-4 text-white transition hover:scale-105"
      >
        Alle Bilder löschen
      </button>
    </>
  )}
</div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {showUpload && (
        <UploadModal
          onClose={() =>
            setShowUpload(false)
          }
          onUpload={async (files) => {
            for (const file of files) {
              await uploadImage(file)
            }

            const urls =
              await getImages()

            setImages(urls)

            setShowUpload(false)
          }}
        />
      )}

      {/* ADMIN LOGIN */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-10">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-light">
                Admin Login
              </h2>

              <button
                onClick={() =>
                  setShowPasswordModal(
                    false
                  )
                }
                className="text-3xl"
              >
                ×
              </button>
            </div>

            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-4 outline-none"
            />

            <button
              onClick={handleAdminLogin}
              className="mt-6 w-full rounded-full bg-black py-4 text-white transition hover:scale-105"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </main>
  )
}