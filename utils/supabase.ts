import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const createSupabaseClerkClient = (getToken: () => Promise<string>): SupabaseClient => {
  return createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          'X-Client-Info': 'clerk-expo',
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
      accessToken: getToken,
    }
  )
}
