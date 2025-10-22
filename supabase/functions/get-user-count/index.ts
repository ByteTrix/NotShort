// @ts-nocheck - Ignore all TypeScript errors in this file
/* eslint-disable */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

console.log("Edge Function 'get-user-count' called");

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Try to get the cached count from app_metrics table
    const { data: metricData, error: metricError } = await supabaseAdmin
      .from('app_metrics')
      .select('metric_value, last_updated_at')
      .eq('metric_name', 'total_user_count')
      .single();

    if (metricError && metricError.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching from app_metrics:', metricError);
    }

    // If cached data exists and is recent (less than 5 minutes old), return it
    // BUT if the cached value is 0, prefer to fetch fresh to avoid showing 0 when there's at least 1 real user
    let cachedCount: number | null | undefined = metricData?.metric_value as number | null | undefined;
    if (metricData && metricData.last_updated_at) {
      const cacheAge = Date.now() - new Date(metricData.last_updated_at).getTime();
      const FIVE_MINUTES = 5 * 60 * 1000;
      const shouldUseCache = cacheAge < FIVE_MINUTES && typeof cachedCount === 'number' && cachedCount > 0;
      if (shouldUseCache) {
        console.log(`Returning cached user count: ${cachedCount}`);
        return new Response(
          JSON.stringify({ count: cachedCount }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          },
        );
      }
    }

    // Otherwise, fetch fresh count
    console.log('Fetching fresh user count from auth.users...');
    const { data: { users }, error: listUsersError } = await supabaseAdmin.auth.admin.listUsers({});

    if (listUsersError) {
      console.error('Error listing users:', listUsersError);
      throw listUsersError;
    }
    
    const totalUserCount = users.length;
    console.log(`Fetched total user count: ${totalUserCount}`);

    // Update the cache (upsert)
    const { error: upsertError } = await supabaseAdmin
      .from('app_metrics')
      .upsert({
        metric_name: 'total_user_count',
        metric_value: totalUserCount,
        last_updated_at: new Date().toISOString()
      }, {
        onConflict: 'metric_name'
      });

    if (upsertError) {
      console.error('Error updating app_metrics cache:', upsertError);
      // Don't fail the request, just log the error
    }

    return new Response(
      JSON.stringify({ count: totalUserCount }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (err) {
    console.error('Error in get-user-count Edge Function:', err);
    // Fallback to a safe default of 0 to avoid breaking the frontend, but signal error via header
    return new Response(
      JSON.stringify({ count: 0 }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Error': (err as Error).message ?? 'unknown' },
        status: 200,
      },
    );
  }
});
