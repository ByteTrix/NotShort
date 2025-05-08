import type { Session } from '@supabase/supabase-js';
import type { AstroGlobal } from 'astro';
import { createSupabaseServerClient } from './supabaseClient';

/**
 * Authentication middleware for protected pages
 * This should be used at the top of your Astro component frontmatter
 */
export async function requireAuth(Astro: AstroGlobal) {
  console.log(`[authMiddleware] requireAuth function CALLED for path: ${Astro.url.pathname}`);
  const supabase = createSupabaseServerClient(Astro.cookies);
  console.log(`[authMiddleware] Supabase client CREATED for path: ${Astro.url.pathname}. Attempting to get session...`);
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('[authMiddleware] Error getting session:', error.message, error);
    return Astro.redirect(`/login?error=session_error&details=${encodeURIComponent(error.message)}`);
  }
  
  const session = data.session;
  
  if (!session) {
    console.log(`[authMiddleware] No session found for ${Astro.url.pathname}. Redirecting to login.`);
    // Avoid redirect loop if somehow requireAuth is called on /login itself, though it shouldn't be.
    if (Astro.url.pathname.startsWith('/login')) {
        console.warn('[authMiddleware] Attempted to redirect to login from login page. Returning null session instead.');
        return { session: null }; // This might need specific handling in the page if it occurs.
    }
    return Astro.redirect('/login?redirect=' + encodeURIComponent(Astro.url.pathname));
  }
  
  console.log(`[authMiddleware] Session found for ${Astro.url.pathname}. User ID:`, session.user.id);
  return { session };
}