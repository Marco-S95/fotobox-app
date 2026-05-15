import { supabase } from '../lib/supabase'

export async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from('event-images')
    .upload(fileName, file)

  if (error) {
    console.error(error)
    alert(error.message)
    return null
  }

  const { data } = supabase.storage
    .from('event-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}