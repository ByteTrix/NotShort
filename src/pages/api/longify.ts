import type { APIRoute } from 'astro';
import { createSupabaseServerClient } from '../../lib/supabaseClient';
import { nanoid } from 'nanoid';

// Function to generate a random string of a specific length
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate an unnecessarily long slug (the parody part)
function generateLongSlug(): string {
  const segments = [];
  // Generate 3-5 word-like segments
  const segmentCount = Math.floor(Math.random() * 3) + 3; // 3-5 segments
  
  for (let i = 0; i < segmentCount; i++) {
    const segmentLength = Math.floor(Math.random() * 8) + 4; // 4-12 characters per segment
    segments.push(generateRandomString(segmentLength));
  }
  
  return segments.join('-');
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient(cookies);
  try {
    // Parse the incoming JSON request
    const { url, title, isPublic = true } = await request.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({
          error: 'URL is required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return new Response(
        JSON.stringify({
          error: 'Invalid URL format'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Generate a long slug for our parody service
    const slug = generateLongSlug();
    
    // Check if user is authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error getting session in /api/longify:', sessionError);
      return new Response(JSON.stringify({ error: 'Authentication error while trying to get session.' }), { status: 500 });
    }
    
    // Prepare the link data
    const linkData: any = { // Use 'any' for now or define a proper type
      slug,
      original: url,
      created_at: new Date().toISOString(),
      title: title || null,
      is_public: isPublic
    };
    
    // Add user_id if the user is authenticated
    if (session?.user) {
      linkData.user_id = session.user.id;
    }
    
    // Store the URL mapping in Supabase
    const { data, error } = await supabase
      .from('links')
      .insert([linkData])
      .select();
    
    if (error) {
      console.error('Error storing URL in /api/longify:', error);
      return new Response(
        JSON.stringify({
          error: 'Failed to create long URL'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Generate the long URL
    const longUrl = `${import.meta.env.SITE || 'https://kavinthangavel.com'}/${slug}`;
    
    // Return the longified URL
    return new Response(
      JSON.stringify({
        original: url,
        long: longUrl,
        slug,
        id: data?.[0]?.id
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (err) {
    console.error('Error processing request:', err);
    return new Response(
      JSON.stringify({
        error: 'Internal server error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};