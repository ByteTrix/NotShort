// @ts-check
import { defineConfig } from 'astro/config';
import Unocss from 'unocss/astro';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://thekavin.com', // User should update this later with their actual production domain
  output: "server",
  adapter: vercel({}),
  integrations: [Unocss({ injectReset: true, injectEntry: true }), icon()]
});