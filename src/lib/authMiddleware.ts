import type { Session } from '@supabase/supabase-js';
import type { AstroGlobal } from 'astro';
import { createSupabaseServerClient } from './supabaseClient';

/**
 * Authentication middleware for protected pages
 * This should be used at the top of your Astro component frontmatter
 */
export async function requireAuth(Astro: AstroGlobal) {
  console.log(`[authMiddleware] requireAuth function CALLED for path: ${Astro.url.pathname}`);
  const supabase = createSupabaseServerClient(Astro.cookies);  console.log(`[authMiddleware] Supabase client CREATED for path: ${Astro.url.pathname}. Authenticating user...`);
  
  // Verify user authentication with getUser() which validates with the auth server
  // This is the more secure approach as recommended by Supabase
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error('[authMiddleware] Error authenticating user:', userError.message, userError);
    return Astro.redirect(`/login?error=auth_error&details=${encodeURIComponent(userError.message)}`);
  }
  
  // If no user is found, redirect to login
  if (!userData.user) {
    console.log(`[authMiddleware] No authenticated user found for ${Astro.url.pathname}. Redirecting to login.`);
    // Avoid redirect loop if somehow requireAuth is called on /login itself, though it shouldn't be.
    if (Astro.url.pathname.startsWith('/login')) {
      console.warn('[authMiddleware] Attempted to redirect to login from login page. Throwing error instead.');  
      throw new Error('Attempted to redirect to login from login page.');  
    }
    return Astro.redirect('/login?redirect=' + encodeURIComponent(Astro.url.pathname));
  }
    // We still need to get the session for session-related data and tokens
  // but we've already authenticated the user with getUser above
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('[authMiddleware] Error getting session:', error.message, error);
    return Astro.redirect(`/login?error=session_error&details=${encodeURIComponent(error.message)}`);
  }
  
  const session = data.session;
  
  // This should rarely happen since we've already verified the user exists
  if (!session) {
    console.log(`[authMiddleware] User verified but no session found for ${Astro.url.pathname}. Redirecting to login.`);
    return Astro.redirect('/login?redirect=' + encodeURIComponent(Astro.url.pathname));
  }

  // Create a "clean" user object from the authenticated userData,
  // rather than passing the possibly insecure session.user
  const authenticatedUser = {
    id: userData.user.id,
    email: userData.user.email,
    app_metadata: userData.user.app_metadata,
    user_metadata: userData.user.user_metadata,
    // Add any other fields you need, but source them from userData.user
    aud: userData.user.aud, // Add aud property
    created_at: userData.user.created_at, // Add created_at property
  };
  
  console.log(`[authMiddleware] Authentication successful for ${Astro.url.pathname}. User ID:`, userData.user.id);
  return { session, user: authenticatedUser };
}