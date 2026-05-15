import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://zhuxkfbmxgtzvdszxrcp.supabase.co',
  'sb_publishable_G7WrtiQF-YiCfaUgv67THQ_I2yZWAVX'
)