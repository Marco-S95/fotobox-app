import { supabase } from '../lib/supabase'

export async function deleteAllImages() {
  const { data, error } =
    await supabase.storage
      .from('event-images')
      .list('', {
        limit: 1000,
      })

  if (error) {
    console.error(error)
    return
  }

  if (!data || data.length === 0) {
    return
  }

  const filePaths = data.map(
    (file) => file.name
  )

  const { error: removeError } =
    await supabase.storage
      .from('event-images')
      .remove(filePaths)

  if (removeError) {
    console.error(removeError)
  }
}