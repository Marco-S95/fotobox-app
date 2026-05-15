'use client'

import {
  createContext,
  useContext,
  useState,
} from 'react'

import { uploadImage } from '../services/uploadImage'

type ContextType = {
  uploadedImagesByEvent: Record<
    string,
    string[]
  >

  addImages: (
    eventSlug: string,
    files: File[]
  ) => Promise<void>

  removeImage: (
    eventSlug: string,
    image: string
  ) => void
}

const EventContext =
  createContext<ContextType | null>(
    null
  )

export function EventProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [
    uploadedImagesByEvent,
    setUploadedImagesByEvent,
  ] = useState<
    Record<string, string[]>
  >({})

  const addImages = async (
    eventSlug: string,
    files: File[]
  ) => {
    const uploadedUrls: string[] = []

    for (const file of files) {
      const imageUrl =
        await uploadImage(file)

      if (imageUrl) {
        uploadedUrls.push(imageUrl)
      }
    }

    setUploadedImagesByEvent(
      (prev) => ({
        ...prev,
        [eventSlug]: [
          ...(prev[eventSlug] || []),
          ...uploadedUrls,
        ],
      })
    )
  }

  const removeImage = (
    eventSlug: string,
    image: string
  ) => {
    setUploadedImagesByEvent(
      (prev) => ({
        ...prev,
        [eventSlug]: (
          prev[eventSlug] || []
        ).filter(
          (img) => img !== image
        ),
      })
    )
  }

  return (
    <EventContext.Provider
      value={{
        uploadedImagesByEvent,
        addImages,
        removeImage,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export function useEvent() {
  const context =
    useContext(EventContext)

  if (!context) {
    throw new Error(
      'useEvent muss innerhalb des EventProviders verwendet werden'
    )
  }

  return context
}