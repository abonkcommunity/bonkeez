import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fallback for development/local testing only
const fallbackUrl = "https://oogphwzqrysxignqsvmd.supabase.co"
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ3Bod3pxcnlzeGlnbnFzdm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3OTEyMzEsImV4cCI6MjA3MjM2NzIzMX0.n-DT4EP8H-63akqGbSR7JiwPknMRaDuk_mD5wR7NbOo"

const finalUrl = supabaseUrl || fallbackUrl
const finalKey = supabaseAnonKey || fallbackKey

if (!finalUrl || !finalKey) {
  throw new Error('Missing Supabase configuration')
}

export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {},
  },
})