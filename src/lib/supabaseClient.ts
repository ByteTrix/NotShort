import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';
import type { AstroCookies } from 'astro';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your .env file and ensure they are prefixed with PUBLIC_ for client-side access in Astro.");
  throw new Error("Supabase URL or Anon Key is missing.");
}

// Client-side client (for use in <script> tags and client-side JS)
// This client will use cookies to store the session, making it available to the server.
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Server-side client (for Astro frontmatter and API routes)
export const createSupabaseServerClient = (cookies: AstroCookies): SupabaseClient => {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(key: string) {
        return cookies.get(key)?.value;
      },
      set(key: string, value: string, options: CookieOptions) {
        cookies.set(key, value, options);
      },
      remove(key: string, options: CookieOptions) {
        cookies.delete(key, options);
      },
    },
  });
};