import type { IPostResponse } from '$domain/models/post'
import { PUBLIC_USE_LOCAL } from '$env/static/public'
import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'
import { loadFromFile } from '$services/filesystem/file-importer'

export const load: Load = async function ({ data }) {
  // load the markdown file based on slug
  const post: IPostResponse = data?.post

  if (post) {
    const { slug } = post
    let component
    if (slug && PUBLIC_USE_LOCAL) {
      const loaded = await loadFromFile(slug, post.isIndexFile)
      component = loaded?.default
    }

    return {
      post,
      component,
      layout: {
        fullWidth: true
      }
    }
  }

  throw error(404, 'Post not found')
}
