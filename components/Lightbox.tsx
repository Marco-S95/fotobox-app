'use client'

import { AnimatePresence, motion } from 'framer-motion'

export default function Lightbox({
  image,
  onClose,
  onDelete,
}: {
  image: string | null
  onClose: () => void
  onDelete: () => void
}) {
  if (!image) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-white/10 px-4 py-3 text-white backdrop-blur transition hover:bg-white/20"
        >
          ✕
        </button>

        {/* IMAGE */}
        <motion.img
          initial={{
            scale: 0.96,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.96,
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          src={image}
          alt=""
          className="max-h-[85vh] max-w-[90vw] rounded-[32px] object-contain shadow-2xl"
        />

        {/* ACTIONS */}
        <div className="absolute bottom-8 flex items-center gap-3">
          {/* DOWNLOAD */}
          <a
            href={image}
            download
            className="rounded-full bg-white px-6 py-4 text-sm shadow-xl transition hover:scale-105"
          >
            ⬇ Download
          </a>

          {/* DELETE */}
          <button
            onClick={onDelete}
            className="rounded-full bg-[#222] px-6 py-4 text-sm text-white shadow-xl transition hover:scale-105"
          >
            🗑 Löschen
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}