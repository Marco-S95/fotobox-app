'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  const [password, setPassword] =
    useState('')

  const handleDelete = () => {
    if (password === 'hochzeit123') {
      onConfirm()
      onClose()
      setPassword('')
    } else {
      alert('Falsches Passwort')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur"
        >
          <motion.div
            initial={{
              scale: 0.95,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.95,
              opacity: 0,
            }}
            className="w-full max-w-md rounded-[32px] bg-[#F7F3EE] p-8 shadow-2xl"
          >
            <h2 className="text-3xl">
              Bild löschen
            </h2>

            <p className="mt-3 text-black/50">
              Passwort eingeben
            </p>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="mt-6 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none"
              placeholder="Passwort"
            />

            <div className="mt-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-2xl border border-black/10 bg-white py-4"
              >
                Abbrechen
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 rounded-2xl bg-[#222] py-4 text-white"
              >
                Löschen
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}