import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://oogphwzqrysxignqsvmd.supabase.co"

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ3Bod3pxcnlzeGlnbnFzdm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3OTEyMzEsImV4cCI6MjA3MjM2NzIzMX0.n-DT4EP8H-63akqGbSR7JiwPknMRaDuk_mD5wR7NbOo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

