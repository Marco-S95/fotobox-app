import { supabase } from '../lib/supabase'

export async function deleteImage(path: string) {
  const { error } = await supabase.storage
    .from('event-images')
    .remove([path])

  if (error) {
    console.error(error)
  }
}