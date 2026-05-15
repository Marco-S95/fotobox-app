'use client'

import { useState } from 'react'

interface UploadModalProps {
  onClose: () => void
  onUpload: (files: File[]) => Promise<void>
}

export default function UploadModal({
  onClose,
  onUpload,
}: UploadModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
      <div className="relative w-full max-w-2xl rounded-[40px] bg-[#F7F3EE] p-10 shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-8 top-6 text-3xl text-black transition hover:scale-110"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="mb-10 text-center font-serif text-6xl text-black">
          Bilder hochladen
        </h2>

        {/* Upload Area */}
        <label className="mb-8 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[32px] border border-dashed border-gray-300 bg-white/60 p-10 text-center transition hover:bg-white">
          
          <div className="mb-4 text-6xl">📸</div>

          <p className="mb-2 text-2xl font-medium text-black">
            Bilder auswählen
          </p>

          <p className="text-gray-500">
            Drag & Drop oder klicken
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                setSelectedFiles(Array.from(e.target.files))
              }
            }}
          />
        </label>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mb-6 text-center text-black">
            {selectedFiles.length} Bild(er) ausgewählt
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={async () => {
            if (selectedFiles.length === 0) return

            setLoading(true)

            await onUpload(selectedFiles)

            setLoading(false)
          }}
          className="w-full rounded-full bg-black px-8 py-5 text-xl text-white shadow-xl transition hover:scale-[1.02]"
        >
          {loading
            ? 'Upload läuft...'
            : 'Bilder hochladen 📸'}
        </button>
      </div>
    </div>
  )
}