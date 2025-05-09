// @ts-check
import { defineConfig } from 'astro/config';
import Unocss from 'unocss/astro';
import icon from 'astro-icon';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://kavinthangavel.com',
  output: "server",
  adapter: node({
    mode: 'standalone' // 'middleware' if you're using a framework like Express
  }),
  integrations: [Unocss({ injectReset: true, injectEntry: true }), icon()]
});