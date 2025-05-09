/**
 * Any sort of sitewide constants should be kept here following the same
 * naming convention of all caps snakecase
 * 
 * e.g.
 * 
 * export const YEAR_ESTABLISHED = 2020
 */

export const SITE_NAME = 'Not Short';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
