// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  transformerCompileClass
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(), // Revert to original
    presetWebFonts({ // Optional: if web fonts are desired
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
theme: {
    extend: {
      typography: {
        // Define custom typography styles
        DEFAULT: {
          css: {
            // Base styles if needed
          },
        },
        // Target dark mode specifically for prose elements
        invert: {
          css: {
            '--un-prose-headings': 'white', // Force headings to white in dark mode
            // You can add other dark mode overrides here if necessary
            // e.g., '--un-prose-invert-body': '#your-dark-body-color',
          },
        },
      },
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    // Preserve existing transformer, conditionally applied
    ...(import.meta.env.DEV ? [] : [transformerCompileClass()]),
  ],
  // Preserve existing shortcuts
  shortcuts: [{
    wrapper: 'w-100% max-w-[100vw] md:max-w-[calc(100vw-100px)] xl:max-w-[1120px] mx-auto',
    title: 'text-7 lg:text-10 leading-[1.2] dark:c-gray-100',
    'project-title': 'text-7 lg:text-8 leading-[1.1]',
    subtitle: 'text-6 c-gray-700 leading-[1.2] dark:c-gray-300',
    'subtitle-small': 'text-4 c-gray-700 leading-[1.3] dark:c-gray-300',
    small: 'text-xs c-gray-700 font-mono leading-[1.2] dark:c-gray-300',
    'project-list': 'grid grid-cols-[1fr_150px] md:grid-cols-[1fr_min-content_150px] lg:grid-cols-[1fr_min-content_min-content_150px] grid-auto-rows-[200px] items-stretch',
    'section--index': 'inline-grid border-b-1 md:border-l-1 md:border-r-0 border-r-1 border-gray-200 c-gray-700 dark:c-gray-300 dark:border-gray-800 w-10 h-10 text-center place-content-center absolute top-0 left-0 md:translate-x-[-100%]',
    'section--source': 'c-gray-700 dark:c-gray-300 text-xs font-mono absolute top-[1rem] right-[1rem]',
    'investor--label': 'small pt-10 block pl-12.5 pb-3'
  }],
  // Preserve existing variants
  variants: [
    (matcher) => {
      if (!matcher.startsWith('dark-inside:')) {
        return matcher;
      } else {
        return {
          matcher: matcher.slice(12),
          selector: (s) => `.dark-inside ${s}`
        }
      }
    }
  ],
  // Example safelist, adjust as needed by the template
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
});