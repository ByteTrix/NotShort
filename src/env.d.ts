/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly GA_MEASUREMENT_ID: string;
  readonly SITE: string;
  readonly GITHUB_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import type { User } from '@supabase/supabase-js';

declare global {
  namespace App {
    interface Locals {
      user: User | null;
    }
  }
}