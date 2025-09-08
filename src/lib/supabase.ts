import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// Check if we have real Supabase credentials
export const hasSupabaseConfig = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project') &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('your-anon-key')

export const supabase = hasSupabaseConfig 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Mock auth for demo mode
export const mockAuth = {
  getSession: () => Promise.resolve({ data: { session: null }, error: null }),
  onAuthStateChange: (callback: any) => ({
    data: { subscription: { unsubscribe: () => {} } }
  }),
  signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Demo mode - configure Supabase to enable authentication' } }),
  signUp: () => Promise.resolve({ data: null, error: { message: 'Demo mode - configure Supabase to enable authentication' } }),
  signOut: () => Promise.resolve({ error: null })
}