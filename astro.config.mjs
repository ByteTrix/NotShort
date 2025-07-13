// @ts-check
import { defineConfig } from 'astro/config';
import Unocss from 'unocss/astro';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://lg.thekavin.com', // User should update this later with their actual production domain
  output: "server",
  adapter: vercel({}),
  integrations: [Unocss({ injectReset: true, injectEntry: true }), icon()]
});