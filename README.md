<div align="center">

# NotShort

An open-source URL shortener with a simple dashboard, auth, and basic analytics — built with Astro + Supabase and deployed on Vercel.

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/bytetrix/NotShort)

</div>

## Quick start (TL;DR)

1) Create a Supabase project → copy Project URL and anon key.

2) Add a `.env` file (or set in Vercel):

```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
PUBLIC_SITE_URL=https://your-domain.tld  # for production
# PUBLIC_SITE_URL=http://localhost:4321  # for local dev
```

3) In Supabase Dashboard → Authentication → URL Configuration:
- Site URL: your production URL (e.g. https://your-domain.tld)
- Redirect URLs: add both
	- https://your-domain.tld/auth/callback
	- http://localhost:4321/auth/callback

4) In Supabase → SQL Editor: run the SQL from `supabase-setup.sql`.

5) Deploy Edge Functions (requires Docker running locally):

```
supabase link --project-ref <your_project_ref>
supabase functions deploy get-user-count --project-ref <your_project_ref>
supabase functions deploy update-user-count-metric --project-ref <your_project_ref>
```

6) Optional but recommended: set service role secret for functions (admin list users):

```
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key> --project-ref <your_project_ref>
```

7) Install and run locally:

```
pnpm install
pnpm dev
```

Visit http://localhost:4321

---

## What is this?

NotShort is a tiny, batteries-included URL shortener:

- Short links with slugs (public or user-owned)
- Supabase Auth (Email/OAuth) and RLS-secured data
- Basic analytics (click events), user count metric via Edge Function
- Astro UI with UnoCSS, easy Vercel deploy

## Tech stack

- Framework: [Astro]
- Styling: [UnoCSS]
- Icons: [astro-icon]
- Auth/DB/Functions: [Supabase]
- Hosting/Adapter: Vercel (`@astrojs/vercel`)

## Project structure

Key folders/files:

- `src/pages` — routes (Astro pages, dashboard, API, auth callback)
- `src/lib` — Supabase client, helpers
- `supabase/functions` — Edge Functions
- `supabase-setup.sql` — database schema, RLS policies, metrics table
- `astro.config.mjs` — Astro config (vercel adapter, site)

## Setup (detailed)

### 1) Environment variables

Create `.env` in the repo root (or set these in Vercel):

```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
PUBLIC_SITE_URL=https://your-domain.tld
# PUBLIC_SITE_URL=http://localhost:4321

# Optional
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GITHUB_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # only if you want GitHub stats hydrated server-side
```

Note: Do NOT put your Supabase service role key in `.env`. Keep it as a Supabase function secret:

```
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key> --project-ref <your_project_ref>
```

### 2) Supabase configuration

1. Create a Supabase project.
2. Copy Project URL and anon key → put into `.env` above.
3. Authentication → URL Configuration:
	 - Site URL: your prod domain (e.g., https://your-domain.tld)
	 - Redirect URLs: add both prod and local callback paths:
		 - https://your-domain.tld/auth/callback
		 - http://localhost:4321/auth/callback
4. SQL Editor → run the contents of `supabase-setup.sql`.

### 3) Edge Functions

Ensure Docker Desktop is running locally, then:

```
supabase link --project-ref <your_project_ref>
supabase functions deploy get-user-count --project-ref <your_project_ref>
supabase functions deploy update-user-count-metric --project-ref <your_project_ref>
```

Optionally add a schedule in the Supabase Dashboard for `update-user-count-metric` (e.g., every 10 minutes) to refresh the cached `app_metrics.total_user_count`.

### 4) Local dev

```
pnpm install
pnpm dev
```

Visit http://localhost:4321

### 5) Deploy to Vercel

1. Import the repo in Vercel.
2. Set the same env vars in Vercel Project → Settings → Environment Variables:
	 - `PUBLIC_SUPABASE_URL`
	 - `PUBLIC_SUPABASE_ANON_KEY`
	 - `PUBLIC_SITE_URL`
	 - optional: `GA_MEASUREMENT_ID`, `GITHUB_TOKEN`
3. Trigger a deploy.

Note: `astro.config.mjs` contains `site` (currently set to a placeholder). Update it to your real domain when ready.

## Commands

```
pnpm dev       # start dev server
pnpm build     # build
pnpm preview   # run the built app locally
```

## Troubleshooting

- Redirect after login goes to `localhost` on production
	- Ensure `PUBLIC_SITE_URL` is set to your prod domain both locally (for testing) and on Vercel.
	- Supabase → Authentication → URL Configuration is set with your prod Site URL and the `/auth/callback` entries for both prod and localhost.

- `get-user-count` 404 or errors
	- Make sure Docker is running and you’ve deployed the function(s).
	- Confirm you’re calling: `https://<project-ref>.supabase.co/functions/v1/get-user-count`
	- If your project has users but response is `{ count: 0 }`, set the function secret `SUPABASE_SERVICE_ROLE_KEY` and redeploy. The function already bypasses zero-valued cache to force a fresh admin fetch.

## License

This project is licensed under the terms of the MIT License. See `LICENSE`.
