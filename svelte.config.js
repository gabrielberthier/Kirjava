import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  preprocess: [
    preprocess({
      postcss: true,
      scss: true
    }),
    mdsvex(mdsvexConfig)
  ],

  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib',
      $components: 'src/lib/components',
      $domain: 'src/domain',
      $services: 'src/services',
      $models: 'src/domain/models',
      $actions: 'src/lib/actions',
    },
    // remove this if you don't want prerendering
    prerender: {
      entries: ['*', '/sitemap.xml', '/rss.xml']
    }
  }
}

export default config
