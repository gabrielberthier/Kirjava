import { PostsLoader } from '$lib/data/posts'
import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'

export const load: Load = async function load({ params }) {
  const { slug } = params

  // get post with metadata
  const postLoader = new PostsLoader(false)

  const post = await postLoader.getOneBySlug(slug!)

  if (!post) {
    throw error(404, 'Post not found')
  }

  return {
    post
  }
}
