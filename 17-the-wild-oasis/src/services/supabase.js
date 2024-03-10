import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://mzpgkbsnyoatxbcqqxeo.supabase.co'

// Only use this instead of process.env.KEY if it's the anon (public) key AND row-level-security (rls) is on
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16cGdrYnNueW9hdHhiY3FxeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MzAyNzgsImV4cCI6MjAyNTUwNjI3OH0.-_qnCOxdFCGywGFtB5JrrNxl8TGNNJqVaz_A6XTkqqU'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
