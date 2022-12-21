import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'

// vite requires relative paths and explicit file extensions for dynamic imports
// see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations

export const load: Load = async function ({ data }) {
  // load the markdown file based on slug
  const post = data?.post

  if (post) {
    const component = await loadFromFile(post.slug, post.isIndexFile)

    return {
      post: data.post,
      component: component.default,
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

  return import(template + file)
}
