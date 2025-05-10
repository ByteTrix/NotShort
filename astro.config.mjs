// @ts-check
import { defineConfig } from 'astro/config';
import Unocss from 'unocss/astro';
import icon from 'astro-icon';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://thekavin.com',
  output: "server",
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [Unocss({ injectReset: true, injectEntry: true }), icon()]
});