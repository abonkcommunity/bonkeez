// src/utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL is missing")
}
if (!supabaseKey) {
  throw new Error("VITE_SUPABASE_ANON_KEY is missing")
}

export const supabase = createClient(supabaseUrl, supabaseKey)
