import { error } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'
import { PostLoaderFactory } from '$services/posts/post-fetcher-factory'

export const load: Load = async function load({ params }) {
  const { slug } = params

  // get post with metadata
  const postsDataProvider = PostLoaderFactory.get()

  const post = (await postsDataProvider.getOneBySlug(slug!)).unwrapOr(null)

  if (!post) {
    throw error(404, 'Post not found')
  }

  return {
    post
  }
}
