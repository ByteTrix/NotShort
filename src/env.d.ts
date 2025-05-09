/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly GA_MEASUREMENT_ID: string;
  readonly SITE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}