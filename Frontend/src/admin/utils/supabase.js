// Supabase Configuration
// Reads URL and anon (publishable) key from Vite environment variables.
// Values are injected at build time; never hardcode credentials here.
// The service_role / secret key must NEVER be placed in frontend code.
//
// Required environment variables (see .env.example):
//   VITE_SUPABASE_URL
//   VITE_SUPABASE_ANON_KEY
//
// If these are not set, supabase is null and the app falls back to
// demonstration data. No backend connection is claimed or implied.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey &&
  !supabaseUrl.includes('your-project-ref') &&
  !supabaseAnonKey.includes('your-anon-public-key'))

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = () => isConfigured

export default { supabase, isSupabaseConfigured }
