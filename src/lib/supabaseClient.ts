import {
  createBrowserClient,
  createServerClient,
  type CookieOptions
} from '@supabase/ssr';
import type { AstroCookies } from 'astro';


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
export const createSupabaseServerClient = (astroCookies: AstroCookies) => {
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          const cookie = astroCookies.get(name);
          return cookie?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          astroCookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          // For Astro, astroCookies.delete is the standard method
          astroCookies.delete(name, options);
        }
      },
    }
  );
};