export type EventType = {
  id: string
  slug: string
  title: string
  date: string
  coverImage: string
  password?: string
}

export type ImageType = {
  id: string
  imageUrl: string
  uploadedAt: string
  uploadedBy?: string
}