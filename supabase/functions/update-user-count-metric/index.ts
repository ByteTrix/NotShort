// @ts-nocheck - Ignore all TypeScript errors in this file
/* eslint-disable */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts'; // Though not strictly needed for a scheduled function not called via HTTP

console.log("Scheduled Edge Function 'update-user-count-metric' called");

// This function is intended to be triggered by a cron schedule, not HTTP.
// However, Deno.serve is the standard way to write Supabase Edge Functions.
// If invoked via HTTP, it will run, but the primary trigger is the schedule.
Deno.serve(async (_req) => { // _req can be ignored as it's cron-triggered
  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Get the total user count
    const { data: { users }, error: listUsersError } = await supabaseAdmin.auth.admin.listUsers({});

    if (listUsersError) {
      console.error('Error listing users with admin client:', listUsersError);
      throw listUsersError;
    }
    
    const totalUserCount = users.length;
    console.log(`Fetched total user count: ${totalUserCount}`);

    // 2. Update the app_metrics table
    const { error: updateError } = await supabaseAdmin
      .from('app_metrics')
      .update({ 
        metric_value: totalUserCount,
        last_updated_at: new Date().toISOString() 
      })
      .eq('metric_name', 'total_user_count');

    if (updateError) {
      console.error('Error updating app_metrics table:', updateError);
      throw updateError;
    }

    console.log(`Successfully updated 'total_user_count' to ${totalUserCount} in app_metrics.`);

    return new Response(
      JSON.stringify({ success: true, message: `User count updated to ${totalUserCount}` }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, // Standard response
        status: 200,
      },
    );
  } catch (err) {
    console.error('Error in update-user-count-metric Edge Function:', err);
    return new Response(
      JSON.stringify({ success: false, error: (err as Error).message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});