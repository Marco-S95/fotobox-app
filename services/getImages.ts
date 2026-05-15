import { supabase } from '../lib/supabase'

export async function getImages() {
  const { data, error } = await supabase.storage
    .from('event-images')
    .list('', {
      limit: 100,
      offset: 0,
    })

  if (error) {
    console.error(error)
    return []
  }

  const imageUrls = data.map((file) => {
    const {
      data: { publicUrl },
    } = supabase.storage
      .from('event-images')
      .getPublicUrl(file.name)

    return publicUrl
  })

  return imageUrls
}