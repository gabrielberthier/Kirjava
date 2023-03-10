import type { IPostResponse } from '$domain/models/post'
import { env } from '$env/dynamic/public'
import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'

// vite requires relative paths and explicit file extensions for dynamic imports
// see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations

export const load: Load = async function ({ data }) {
  // load the markdown file based on slug
  const post: IPostResponse = data?.post

  if (post) {
    let component
    if (post.slug && env.PUBLIC_USE_LOCAL) {
      component = await loadFromFile('', post.isIndexFile)
    }

    return {
      post,
      component: component?.default,
      layout: {
        fullWidth: true
      }
    }
  }

  throw error(404, 'Post not found')
}

async function loadFromFile(slug: string, isIndex: boolean = false) {
  const template = `../../../../posts/${slug}`
  const file = isIndex ? `/index.md` : `.md`
  /* @vite-ignore */
  return import(template + file)
}
