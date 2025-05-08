import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../lib/supabaseClient';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = createSupabaseServerClient(cookies);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Auth callback error:', error);
      return redirect('/login?error=auth_callback_error');
    }
  } else {
    console.error('Auth callback: No code provided.');
    return redirect('/login?error=no_auth_code');
  }
  
  // Redirect to dashboard after successful authentication
  return redirect('/dashboard');
};