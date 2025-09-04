import { createClient } from "@supabase/supabase-js"

// ✅ Make sure these env vars are defined in your .env file
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://oogphwzqrysxignqsvmd.supabase.co"

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ3Bod3pxcnlzeGlnbnFzdm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3OTEyMzEsImV4cCI6MjA3MjM2NzIzMX0.n-DT4EP8H-63akqGbSR7JiwPknMRaDuk_mD5wR7NbOo"

// 🚀 Create a Supabase client with safe defaults
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    headers: {}, // ensures h.global.headers is never undefined
  },
})
